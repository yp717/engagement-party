import { randomBytes } from "crypto";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import * as schema from "../src/db/schema";
import InvitationEmail from "../src/emails/invitation";

const { households, guests } = schema;

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const BASE_URL =
  process.env.SITE_URL ||
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.yannisandalara.com";

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i >= 0 ? args[i + 1] : undefined;
  };

  return {
    firstName: get("--first"),
    lastName: get("--last"),
    email: get("--email"),
    invitedBy: get("--invited-by"),
    role: get("--role"),
    inviteStatus: get("--invite-status") ?? "Yes",
    sendInvite: args.includes("--send-invite"),
  };
}

async function main() {
  const {
    firstName,
    lastName,
    email,
    invitedBy,
    role,
    inviteStatus,
    sendInvite,
  } = parseArgs();

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !invitedBy?.trim() ||
    !role?.trim()
  ) {
    throw new Error(
      "Usage: npx tsx scripts/add-guest.ts --first Anna --last Hruba --email x@y.com --invited-by Groom --role Friend [--invite-status Yes] [--send-invite]"
    );
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (sendInvite && !process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is required when using --send-invite");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db.query.households.findFirst({
    where: eq(households.email, normalizedEmail),
    with: { guests: true },
  });

  if (existing) {
    throw new Error(
      `Household already exists for ${normalizedEmail} (${existing.guests.map((g) => `${g.firstName} ${g.lastName}`).join(", ")})`
    );
  }

  const token = randomBytes(16).toString("hex");

  const [household] = await db
    .insert(households)
    .values({
      email: normalizedEmail,
      uniqueToken: token,
      inviteStatus,
    })
    .returning();

  const [guest] = await db
    .insert(guests)
    .values({
      householdId: household.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      invitedBy: invitedBy.trim(),
      role: role.trim(),
    })
    .returning();

  console.log(`Added ${guest.firstName} ${guest.lastName} (${normalizedEmail})`);
  console.log(`Household ID: ${household.id}`);
  console.log(`RSVP link: ${BASE_URL}/rsvp?token=${token}`);

  if (!sendInvite) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const rsvpUrl = `${BASE_URL}/rsvp?token=${token}`;
  const coupleImageUrl = `${BASE_URL}/photos/black-and-white-post-engagement.jpeg`;

  await resend.emails.send({
    from: "Yannis & Alara <noreply@updates.yannisandalara.com>",
    to: normalizedEmail,
    subject: "You're Invited to Yannis & Alara's Engagement Party",
    react: InvitationEmail({
      guestNames: [guest.firstName],
      rsvpUrl,
      coupleImageUrl,
    }),
  });

  await db
    .update(households)
    .set({ inviteSentAt: new Date() })
    .where(eq(households.id, household.id));

  console.log(`Invitation sent to ${normalizedEmail}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
