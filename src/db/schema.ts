import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const households = pgTable("households", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique(), // nullable - some guests don't have emails yet
  uniqueToken: text("unique_token").unique().notNull(),
  inviteStatus: text("invite_status").notNull().default("Yes"), // "Yes", "Maybe", "Yes - Unlikely to Come"
  inviteSentAt: timestamp("invite_sent_at"),
  lastUpdateSentAt: timestamp("last_update_sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const guests = pgTable("guests", {
  id: uuid("id").defaultRandom().primaryKey(),
  householdId: uuid("household_id")
    .notNull()
    .references(() => households.id, { onDelete: "cascade" }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  invitedBy: text("invited_by").notNull(), // "Bride" or "Groom"
  role: text("role").notNull(), // "B&G", "Family", "Extended Family", "Family Friend", "Friend", "Work"
  isAttending: boolean("is_attending"), // null until RSVP submitted
  dietaryRequirements: text("dietary_requirements"),
  notes: text("notes"), // admin notes from spreadsheet
  rsvpCompletedAt: timestamp("rsvp_completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  furthestQuestionIndex: integer("furthest_question_index").notNull(),
  completed: boolean("completed").notNull(),
  visitorHash: text("visitor_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const householdsRelations = relations(households, ({ many }) => ({
  guests: many(guests),
}));

export const guestsRelations = relations(guests, ({ one }) => ({
  household: one(households, {
    fields: [guests.householdId],
    references: [households.id],
  }),
}));

// Types
export type Household = typeof households.$inferSelect;
export type NewHousehold = typeof households.$inferInsert;
export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;
