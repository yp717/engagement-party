import { NextRequest, NextResponse } from "next/server";
import { db, households } from "@/db";
import { eq } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/update-household - Update a household's details
export async function POST(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { householdId, email, inviteStatus, resetInvite } = body as {
      householdId: string;
      email?: string | null;
      inviteStatus?: string;
      resetInvite?: boolean;
    };

    if (!householdId) {
      return NextResponse.json(
        { error: "householdId is required" },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, any> = {};

    if (email !== undefined) updateData.email = email;
    if (inviteStatus !== undefined) updateData.inviteStatus = inviteStatus;

    if (resetInvite) {
      updateData.inviteSentAt = null;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    await db
      .update(households)
      .set(updateData)
      .where(eq(households.id, householdId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating household:", error);
    return NextResponse.json(
      { error: "Failed to update household" },
      { status: 500 }
    );
  }
}
