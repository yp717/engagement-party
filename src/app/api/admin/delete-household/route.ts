import { NextRequest, NextResponse } from "next/server";
import { db, households } from "@/db";
import { eq } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// POST /api/admin/delete-household - Delete a household and all its guests (cascade)
export async function POST(request: NextRequest) {
  try {
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

    // Deleting the household cascades to guests (onDelete: "cascade" in schema)
    await db.delete(households).where(eq(households.id, householdId));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting household:", error);
    return NextResponse.json(
      { error: "Failed to delete household" },
      { status: 500 }
    );
  }
}
