import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db, households, guests } from "@/db";
import { eq, isNull, and } from "drizzle-orm";
import InvitationEmail from "@/emails/invitation";

const resend = new Resend(process.env.RESEND_API_KEY);
// Prefer server-side SITE_URL/BASE_URL so production emails get correct links (not localhost)
const BASE_URL =
  process.env.SITE_URL ||
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "http://localhost:3000";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/email/send-invites - Send invitation emails
export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { inviteStatus, dryRun = false } = body as {
      inviteStatus?: string; // "Yes", "Maybe", "Yes - Unlikely to Come"
      dryRun?: boolean; // If true, don't actually send emails, just return what would be sent
    };

    // Build query conditions
    const conditions = [
      isNull(households.inviteSentAt), // Not yet sent
    ];

    if (inviteStatus) {
      conditions.push(eq(households.inviteStatus, inviteStatus));
    }

    // Get all households matching criteria that have an email
    const householdsToSend = await db.query.households.findMany({
      where: and(...conditions),
      with: {
        guests: true,
      },
    });

    // Filter out households without email
    const householdsWithEmail = householdsToSend.filter((h) => h.email);

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        count: householdsWithEmail.length,
        households: householdsWithEmail.map((h) => ({
          email: h.email,
          inviteStatus: h.inviteStatus,
          guests: h.guests.map((g) => `${g.firstName} ${g.lastName}`),
        })),
      });
    }

    const results: Array<{
      email: string;
      success: boolean;
      error?: string;
    }> = [];

    for (const household of householdsWithEmail) {
      const guestNames = household.guests.map((g) => g.firstName);
      const rsvpUrl = `${BASE_URL}/rsvp?token=${household.uniqueToken}`;
      const coupleImageUrl = `${BASE_URL}/photos/black-and-white-post-engagement.jpeg`;

      try {
        await resend.emails.send({
          from: "Yannis & Alara <noreply@updates.yannisandalara.com>",
          to: household.email!,
          subject: "You're Invited to Yannis & Alara's Engagement Party",
          react: InvitationEmail({ guestNames, rsvpUrl, coupleImageUrl }),
        });

        // Update invite_sent_at
        await db
          .update(households)
          .set({ inviteSentAt: new Date() })
          .where(eq(households.id, household.id));

        results.push({ email: household.email!, success: true });
      } catch (error) {
        console.error(`Failed to send to ${household.email}:`, error);
        results.push({
          email: household.email!,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({
      success: true,
      sent: successful,
      failed,
      results,
    });
  } catch (error) {
    console.error("Error sending invites:", error);
    return NextResponse.json(
      { error: "Failed to send invitations" },
      { status: 500 }
    );
  }
}
