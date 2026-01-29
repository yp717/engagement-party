import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db, households } from "@/db";
import { isNotNull, and, eq } from "drizzle-orm";
import UpdateEmail from "@/emails/update";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/email/send-update - Send update emails
export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      subject,
      message,
      includeRsvpLink = true,
      onlyConfirmed = false, // Only send to those who have RSVPed "yes"
      inviteStatus,
      dryRun = false,
    } = body as {
      subject: string;
      message: string;
      includeRsvpLink?: boolean;
      onlyConfirmed?: boolean;
      inviteStatus?: string;
      dryRun?: boolean;
    };

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required" },
        { status: 400 }
      );
    }

    // Build query conditions - only send to households that have received an invite
    const conditions = [
      isNotNull(households.inviteSentAt),
      isNotNull(households.email),
    ];

    if (inviteStatus) {
      conditions.push(eq(households.inviteStatus, inviteStatus));
    }

    // Get all households matching criteria
    let householdsToSend = await db.query.households.findMany({
      where: and(...conditions),
      with: {
        guests: true,
      },
    });

    // Filter to only confirmed guests if requested
    if (onlyConfirmed) {
      householdsToSend = householdsToSend.filter((h) =>
        h.guests.some((g) => g.isAttending === true)
      );
    }

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        count: householdsToSend.length,
        households: householdsToSend.map((h) => ({
          email: h.email,
          inviteStatus: h.inviteStatus,
          guests: h.guests.map(
            (g) =>
              `${g.firstName} ${g.lastName} (${g.isAttending === true ? "attending" : g.isAttending === false ? "declined" : "not responded"})`
          ),
        })),
      });
    }

    const results: Array<{
      email: string;
      success: boolean;
      error?: string;
    }> = [];

    for (const household of householdsToSend) {
      const guestNames = household.guests.map((g) => g.firstName);
      const rsvpUrl = includeRsvpLink
        ? `${BASE_URL}/rsvp?token=${household.uniqueToken}`
        : undefined;

      try {
        await resend.emails.send({
          from: "Alara & Yannis <noreply@yourdomain.com>", // Update with your verified domain
          to: household.email!,
          subject,
          react: UpdateEmail({ guestNames, subject, message, rsvpUrl }),
        });

        // Update last_update_sent_at
        await db
          .update(households)
          .set({ lastUpdateSentAt: new Date() })
          .where(eq(households.id, household.id));

        results.push({ email: household.email!, success: true });
      } catch (error) {
        console.error(`Failed to send update to ${household.email}:`, error);
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
    console.error("Error sending updates:", error);
    return NextResponse.json(
      { error: "Failed to send updates" },
      { status: 500 }
    );
  }
}
