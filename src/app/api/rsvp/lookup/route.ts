import { NextRequest, NextResponse } from "next/server";
import { db, households, guests } from "@/db";
import { eq, and, ilike } from "drizzle-orm";

// GET /api/rsvp/lookup?firstName=X&lastName=Y - Look up guest by name
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const firstName = searchParams.get("firstName")?.trim();
    const lastName = searchParams.get("lastName")?.trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    // Find guest by name (case-insensitive)
    const guest = await db.query.guests.findFirst({
      where: and(
        ilike(guests.firstName, firstName),
        ilike(guests.lastName, lastName)
      ),
      with: {
        household: true,
      },
    });

    if (!guest) {
      return NextResponse.json(
        { error: "We couldn't find your name on the guest list. Please check the spelling or contact the couple." },
        { status: 404 }
      );
    }

    // Return the household token for redirect
    return NextResponse.json({
      token: guest.household.uniqueToken,
      message: "Guest found",
    });
  } catch (error) {
    console.error("Error looking up guest:", error);
    return NextResponse.json(
      { error: "Failed to look up guest" },
      { status: 500 }
    );
  }
}
