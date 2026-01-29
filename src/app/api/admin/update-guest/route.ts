import { NextRequest, NextResponse } from "next/server";
import { db, guests } from "@/db";
import { eq } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/update-guest - Update a guest's details
export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      guestId,
      firstName,
      lastName,
      isAttending,
      dietaryRequirements,
      resetRsvp,
    } = body as {
      guestId: string;
      firstName?: string;
      lastName?: string;
      isAttending?: boolean | null;
      dietaryRequirements?: string | null;
      resetRsvp?: boolean;
    };

    if (!guestId) {
      return NextResponse.json(
        { error: "guestId is required" },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, any> = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (isAttending !== undefined) updateData.isAttending = isAttending;
    if (dietaryRequirements !== undefined)
      updateData.dietaryRequirements = dietaryRequirements;

    if (resetRsvp) {
      updateData.isAttending = null;
      updateData.dietaryRequirements = null;
      updateData.rsvpCompletedAt = null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    await db.update(guests).set(updateData).where(eq(guests.id, guestId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json(
      { error: "Failed to update guest" },
      { status: 500 }
    );
  }
}
