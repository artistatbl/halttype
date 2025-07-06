import { pgTable, text, timestamp, integer, index } from "drizzle-orm/pg-core"
import { user } from "./user"
import { test } from "./test"

export const leaderboard = pgTable("leaderboard", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  testId: text("testId").notNull().references(() => test.id, { onDelete: "cascade" }),
  wpm: integer("wpm").notNull(),
  accuracy: integer("accuracy").notNull(),
  timeSpent: integer("timeSpent").notNull(),
  category: text("category").notNull(), // "daily", "weekly", "monthly", "all-time"
  language: text("language").notNull(),
  difficulty: text("difficulty").notNull(),
  rank: integer("rank"),
  achievedAt: timestamp("achievedAt").notNull().defaultNow(),
}, (table) => ({
  categoryIdx: index("leaderboard_category_idx").on(table.category),
  languageIdx: index("leaderboard_language_idx").on(table.language),
  difficultyIdx: index("leaderboard_difficulty_idx").on(table.difficulty),
  wpmIdx: index("leaderboard_wpm_idx").on(table.wpm),
  userIdx: index("leaderboard_user_idx").on(table.userId),
}))

export const userStats = pgTable("userStats", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }).unique(),
  totalTests: integer("totalTests").notNull().default(0),
  totalTimeSpent: integer("totalTimeSpent").notNull().default(0), // in seconds
  averageWpm: integer("averageWpm").notNull().default(0),
  averageAccuracy: integer("averageAccuracy").notNull().default(0),
  bestWpm: integer("bestWpm").notNull().default(0),
  bestAccuracy: integer("bestAccuracy").notNull().default(0),
  currentStreak: integer("currentStreak").notNull().default(0),
  longestStreak: integer("longestStreak").notNull().default(0),
  lastTestDate: timestamp("lastTestDate"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})