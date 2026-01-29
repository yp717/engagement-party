import { NextRequest, NextResponse } from "next/server";
import { db, households, guests } from "@/db";
import { isNull, isNotNull } from "drizzle-orm";

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// GET /api/admin/data - Get all households, guests, and stats
export async function GET(request: NextRequest) {
  try {
    // Verify admin API key
    const authHeader = request.headers.get("authorization");
    if (!ADMIN_API_KEY || authHeader !== `Bearer ${ADMIN_API_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all households with guests
    const allHouseholds = await db.query.households.findMany({
      with: {
        guests: true,
      },
      orderBy: (households, { desc }) => [desc(households.createdAt)],
    });

    // Calculate stats
    const allGuests = allHouseholds.flatMap((h) => h.guests);

    const stats = {
      totalGuests: allGuests.length,
      totalHouseholds: allHouseholds.length,
      invitesSent: allHouseholds.filter((h) => h.inviteSentAt).length,
      rsvpCompleted: allGuests.filter((g) => g.rsvpCompletedAt).length,
      attending: allGuests.filter((g) => g.isAttending === true).length,
      declined: allGuests.filter((g) => g.isAttending === false).length,
      pending: allGuests.filter((g) => g.isAttending === null).length,
      noEmail: allHouseholds.filter((h) => !h.email).length,
    };

    return NextResponse.json({
      households: allHouseholds,
      stats,
    });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
