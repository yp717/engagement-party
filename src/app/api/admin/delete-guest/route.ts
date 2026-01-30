import { NextRequest, NextResponse } from "next/server";
import { db, guests, households } from "@/db";
import { eq } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/delete-guest - Delete a guest; if household becomes empty, delete the household too
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { guestId } = body as { guestId: string };

    if (!guestId) {
      return NextResponse.json(
        { error: "guestId is required" },
        { status: 400 }
      );
    }

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

    const householdId = guest.householdId;

    await db.delete(guests).where(eq(guests.id, guestId));

    // If the household now has no guests, delete it so we don't leave an orphaned empty household
    const remaining = await db
      .select({ id: guests.id })
      .from(guests)
      .where(eq(guests.householdId, householdId))
      .limit(1);
    if (remaining.length === 0) {
      await db.delete(households).where(eq(households.id, householdId));
    }

    return NextResponse.json({
      success: true,
      deletedGuest: {
        id: guest.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
      },
    });
  } catch (error) {
    console.error("Error deleting guest:", error);
    return NextResponse.json(
      { error: "Failed to delete guest" },
      { status: 500 }
    );
  }
}
