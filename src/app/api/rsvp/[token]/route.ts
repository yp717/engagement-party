import { NextRequest, NextResponse } from "next/server";
import { db, households, guests } from "@/db";
import { eq } from "drizzle-orm";

// GET /api/rsvp/[token] - Validate token and return household + guests
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const household = await db.query.households.findFirst({
      where: eq(households.uniqueToken, token),
      with: {
        guests: true,
      },
    });

    if (!household) {
      return NextResponse.json(
        { error: "Invalid or expired RSVP link" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      household: {
        id: household.id,
        email: household.email,
      },
      guests: household.guests.map((guest) => ({
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        isAttending: guest.isAttending,
        dietaryRequirements: guest.dietaryRequirements,
        rsvpCompletedAt: guest.rsvpCompletedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching RSVP:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP data" },
      { status: 500 }
    );
  }
}

// POST /api/rsvp/[token] - Submit RSVP for all household members
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const body = await request.json();

    // Validate the token first
    const household = await db.query.households.findFirst({
      where: eq(households.uniqueToken, token),
      with: {
        guests: true,
      },
    });

    if (!household) {
      return NextResponse.json(
        { error: "Invalid or expired RSVP link" },
        { status: 404 }
      );
    }

    // Validate the request body
    const { responses } = body as {
      responses: Array<{
        guestId: string;
        isAttending: boolean;
        dietaryRequirements?: string;
      }>;
    };

    if (!responses || !Array.isArray(responses)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Verify all guest IDs belong to this household
    const householdGuestIds = new Set(household.guests.map((g) => g.id));
    for (const response of responses) {
      if (!householdGuestIds.has(response.guestId)) {
        return NextResponse.json(
          { error: "Invalid guest ID" },
          { status: 400 }
        );
      }
    }

    // Update each guest's RSVP
    const now = new Date();
    for (const response of responses) {
      await db
        .update(guests)
        .set({
          isAttending: response.isAttending,
          dietaryRequirements: response.dietaryRequirements || null,
          rsvpCompletedAt: now,
        })
        .where(eq(guests.id, response.guestId));
    }

    return NextResponse.json({
      success: true,
      message: "RSVP submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
