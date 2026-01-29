import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { households, guests } from "../src/db/schema";
import { randomBytes } from "crypto";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

interface CsvRow {
  firstName: string;
  lastName: string;
  email: string;
  invitedBy: string;
  role: string;
  inviteStatus: string;
  inviteSent: string;
  rsvp: string;
  notes: string;
}

function generateToken(): string {
  return randomBytes(16).toString("hex");
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    // Handle quoted fields with commas
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    return {
      firstName: values[0] || "",
      lastName: values[1] || "",
      email: values[2]?.replace(/\s+/g, "") || "", // Remove spaces from email
      invitedBy: values[3] || "",
      role: values[4] || "",
      inviteStatus: values[5] || "Yes",
      inviteSent: values[6] || "FALSE",
      rsvp: values[7] || "Unconfirmed",
      notes: values[8] || "",
    };
  });
}

async function seed() {
  console.log("🌱 Starting seed...\n");

  // Read CSV file
  const csvContent = readFileSync("src/data/raw_guest_list.csv", "utf-8");
  const rows = parseCsv(csvContent);

  console.log(`📋 Found ${rows.length} guests in CSV\n`);

  // Group guests by email
  const householdMap = new Map<
    string,
    { email: string | null; inviteStatus: string; guests: CsvRow[] }
  >();

  for (const row of rows) {
    const email = row.email || null;

    // If no email, create a unique key based on name
    const key = email || `no-email-${row.firstName}-${row.lastName}`;

    if (!householdMap.has(key)) {
      householdMap.set(key, {
        email,
        inviteStatus: row.inviteStatus,
        guests: [],
      });
    }

    householdMap.get(key)!.guests.push(row);
  }

  console.log(`🏠 Created ${householdMap.size} households\n`);

  // Insert households and guests
  let householdCount = 0;
  let guestCount = 0;

  for (const [key, household] of householdMap) {
    const token = generateToken();

    // Insert household
    const [insertedHousehold] = await db
      .insert(households)
      .values({
        email: household.email,
        uniqueToken: token,
        inviteStatus: household.inviteStatus,
      })
      .returning({ id: households.id });

    householdCount++;

    // Insert guests for this household
    for (const guest of household.guests) {
      await db.insert(guests).values({
        householdId: insertedHousehold.id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        invitedBy: guest.invitedBy,
        role: guest.role,
        notes: guest.notes || null,
        isAttending:
          guest.rsvp === "Yes" ? true : guest.rsvp === "No" ? false : null,
      });
      guestCount++;
    }

    // Log progress
    const guestNames = household.guests
      .map((g) => `${g.firstName} ${g.lastName}`)
      .join(", ");
    console.log(`  ✓ ${household.email || "(no email)"}: ${guestNames}`);
  }

  console.log(`\n✅ Seed complete!`);
  console.log(`   - ${householdCount} households created`);
  console.log(`   - ${guestCount} guests created`);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
