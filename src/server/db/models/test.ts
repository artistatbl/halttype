import { pgTable, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"
import { user } from "./user"

export const test = pgTable("test", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content").notNull(), // The text content to type
  language: text("language").notNull().default("english"),
  difficulty: text("difficulty").notNull().default("medium"), // easy, medium, hard
  wordCount: integer("wordCount").notNull(),
  timeLimit: integer("timeLimit"), // in seconds, null for unlimited
  isPublic: boolean("isPublic").notNull().default(true),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdBy: text("createdBy").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const testResult = pgTable("testResult", {
  id: text("id").primaryKey(),
  testId: text("testId").notNull().references(() => test.id, { onDelete: "cascade" }),
  userId: text("userId").references(() => user.id, { onDelete: "cascade" }),
  wpm: integer("wpm").notNull(), // words per minute
  accuracy: integer("accuracy").notNull(), // percentage
  timeSpent: integer("timeSpent").notNull(), // in seconds
  wordsTyped: integer("wordsTyped").notNull(),
  correctWords: integer("correctWords").notNull(),
  incorrectWords: integer("incorrectWords").notNull(),
  keystrokes: jsonb("keystrokes").$type<{
    key: string;
    timestamp: number;
    correct: boolean;
  }[]>().default([]),
  startedAt: timestamp("startedAt"), // When the test was started
  completedAt: timestamp("completedAt").notNull().defaultNow(), // When the test was completed
  status: text("status").notNull().default("completed"), // Status of the test: 'started', 'completed', 'abandoned'
})