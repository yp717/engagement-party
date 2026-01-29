import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { db, households } from "@/db";
import { eq } from "drizzle-orm";
import InvitationEmail from "@/emails/invitation";

const resend = new Resend(process.env.RESEND_API_KEY);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/send-single - Send invitation to a single household
export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { householdId } = body as { householdId: string };

    if (!householdId) {
      return NextResponse.json(
        { error: "householdId is required" },
        { status: 400 }
      );
    }

    // Get the household
    const household = await db.query.households.findFirst({
      where: eq(households.id, householdId),
      with: {
        guests: true,
      },
    });

    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }

    if (!household.email) {
      return NextResponse.json(
        { error: "Household has no email address" },
        { status: 400 }
      );
    }

    const guestNames = household.guests.map((g) => g.firstName);
    const rsvpUrl = `${BASE_URL}/rsvp?token=${household.uniqueToken}`;

    // Send the email
    await resend.emails.send({
      from: "Alara & Yannis <noreply@updates.yannisandalara.com>",
      to: household.email,
      subject: "You're Invited to Alara & Yannis' Engagement Party",
      react: InvitationEmail({ guestNames, rsvpUrl }),
    });

    // Update invite_sent_at
    await db
      .update(households)
      .set({ inviteSentAt: new Date() })
      .where(eq(households.id, household.id));

    return NextResponse.json({
      success: true,
      email: household.email,
    });
  } catch (error) {
    console.error("Error sending single invite:", error);
    return NextResponse.json(
      { error: "Failed to send invitation" },
      { status: 500 }
    );
  }
}
