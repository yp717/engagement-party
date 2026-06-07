import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, isNotNull } from "drizzle-orm";
import { Resend } from "resend";
import * as schema from "../src/db/schema";
import EventDetailsUpdateEmail, {
  EVENT_DETAILS_UPDATE_SUBJECT,
} from "../src/emails/event-details-update";

const { households } = schema;

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const BASE_URL =
  process.env.SITE_URL ||
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://www.yannisandalara.com";

const dryRun = process.argv.includes("--dry-run");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }

  if (!dryRun && !process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is required (use --dry-run to preview only)"
    );
  }

  const resend = dryRun ? null : new Resend(process.env.RESEND_API_KEY);

  const householdsToSend = await db.query.households.findMany({
    where: and(isNotNull(households.email), isNotNull(households.inviteSentAt)),
    with: { guests: true },
  });

  const detailsUrl = `${BASE_URL}/#details`;

  console.log(
    dryRun
      ? `[dry-run] Would send to ${householdsToSend.length} households:\n`
      : `Sending to ${householdsToSend.length} households...\n`
  );

  let sent = 0;
  let failed = 0;

  for (const household of householdsToSend) {
    const guestNames = household.guests.map((g) => g.firstName);

    if (dryRun) {
      console.log(
        `  ${household.email}: ${guestNames.join(", ")} (${household.inviteStatus})`
      );
      continue;
    }

    try {
      await resend!.emails.send({
        from: "Yannis & Alara <noreply@updates.yannisandalara.com>",
        to: household.email!,
        subject: EVENT_DETAILS_UPDATE_SUBJECT,
        react: EventDetailsUpdateEmail({ guestNames, detailsUrl }),
      });

      await db
        .update(households)
        .set({ lastUpdateSentAt: new Date() })
        .where(eq(households.id, household.id));

      console.log(`  ✓ ${household.email}`);
      sent++;
    } catch (error) {
      console.error(
        `  ✗ ${household.email}:`,
        error instanceof Error ? error.message : error
      );
      failed++;
    }
  }

  if (!dryRun) {
    console.log(`\nDone. Sent: ${sent}, Failed: ${failed}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
