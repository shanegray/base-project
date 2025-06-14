import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const userTypeEnum = pgEnum("user_type", [
  "contractor",
  "employee",
  "manager",
  "client",
]);

// Users table
export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  clerkId: varchar("clerk_id", { length: 255 }).unique().notNull(), // Clerk user ID
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: text("name").notNull(),
  userType: userTypeEnum("user_type").notNull(),
  timezone: varchar("timezone", { length: 50 }).default("UTC"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
