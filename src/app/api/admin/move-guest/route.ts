import { NextRequest, NextResponse } from "next/server";
import { db, guests, households } from "@/db";
import { eq, sql } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/move-guest - Move an existing guest to another household
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { guestId, targetHouseholdId } = body as {
      guestId: string;
      targetHouseholdId: string;
    };

    if (!guestId || !targetHouseholdId) {
      return NextResponse.json(
        { error: "guestId and targetHouseholdId are required" },
        { status: 400 }
      );
    }

    // Verify target household exists
    const [targetHousehold] = await db
      .select({ id: households.id })
      .from(households)
      .where(eq(households.id, targetHouseholdId))
      .limit(1);

    if (!targetHousehold) {
      return NextResponse.json(
        { error: "Target household not found" },
        { status: 404 }
      );
    }

    // Verify guest exists and get current household
    const [guest] = await db
      .select({
        id: guests.id,
        householdId: guests.householdId,
        firstName: guests.firstName,
        lastName: guests.lastName,
      })
      .from(guests)
      .where(eq(guests.id, guestId))
      .limit(1);

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    if (guest.householdId === targetHouseholdId) {
      return NextResponse.json(
        { error: "Guest is already in this household" },
        { status: 400 }
      );
    }

    const previousHouseholdId = guest.householdId;

    const [updated] = await db
      .update(guests)
      .set({ householdId: targetHouseholdId })
      .where(eq(guests.id, guestId))
      .returning({ id: guests.id, householdId: guests.householdId });

    const newHouseholdId =
      updated?.householdId ??
      (updated as { household_id?: string } | undefined)?.household_id;
    if (!updated || newHouseholdId !== targetHouseholdId) {
      console.error("Move guest: update did not persist", {
        guestId,
        targetHouseholdId,
        updated,
      });
      return NextResponse.json(
        { error: "Update did not persist; please try again." },
        { status: 500 }
      );
    }

    // If the previous household now has no guests, delete it so we don't leave orphaned empty households
    const remainingInPrevious = await db
      .select({ id: guests.id })
      .from(guests)
      .where(eq(guests.householdId, previousHouseholdId))
      .limit(1);
    if (remainingInPrevious.length === 0) {
      await db.delete(households).where(eq(households.id, previousHouseholdId));
    }

    return NextResponse.json({
      success: true,
      guest: {
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
      },
    });
  } catch (error) {
    console.error("Error moving guest:", error);
    return NextResponse.json(
      { error: "Failed to move guest" },
      { status: 500 }
    );
  }
}
