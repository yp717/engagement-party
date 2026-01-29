import { NextRequest, NextResponse } from "next/server";
import { db, guests, households } from "@/db";
import { eq } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/add-guest - Add a new guest to an existing household
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { householdId, firstName, lastName, invitedBy, role } = body as {
      householdId: string;
      firstName: string;
      lastName: string;
      invitedBy: string;
      role: string;
    };

    if (!householdId || !firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "householdId, firstName, and lastName are required" },
        { status: 400 }
      );
    }

    if (!invitedBy?.trim() || !role?.trim()) {
      return NextResponse.json(
        { error: "invitedBy and role are required" },
        { status: 400 }
      );
    }

    // Verify household exists
    const [household] = await db
      .select({ id: households.id })
      .from(households)
      .where(eq(households.id, householdId))
      .limit(1);

    if (!household) {
      return NextResponse.json(
        { error: "Household not found" },
        { status: 404 }
      );
    }

    const [newGuest] = await db
      .insert(guests)
      .values({
        householdId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        invitedBy: invitedBy.trim(),
        role: role.trim(),
      })
      .returning({ id: guests.id, firstName: guests.firstName, lastName: guests.lastName });

    return NextResponse.json({
      success: true,
      guest: newGuest,
    });
  } catch (error) {
    console.error("Error adding guest:", error);
    return NextResponse.json(
      { error: "Failed to add guest" },
      { status: 500 }
    );
  }
}
