import { pgTable, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core"
import { user } from "./user"

export const userSettings = pgTable("userSettings", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }).unique(),
  
  // Typing preferences
  theme: text("theme").notNull().default("dark"), // "light", "dark", "custom"
  fontSize: integer("fontSize").notNull().default(16),
  fontFamily: text("fontFamily").notNull().default("monospace"),
  
  // Test preferences
  defaultLanguage: text("defaultLanguage").notNull().default("english"),
  defaultDifficulty: text("defaultDifficulty").notNull().default("medium"),
  defaultTimeLimit: integer("defaultTimeLimit").default(60), // in seconds
  
  // Display preferences
  showWpmLive: boolean("showWpmLive").notNull().default(true),
  showAccuracyLive: boolean("showAccuracyLive").notNull().default(true),
  showTimer: boolean("showTimer").notNull().default(true),
  highlightErrors: boolean("highlightErrors").notNull().default(true),
  
  // Sound preferences
  soundEnabled: boolean("soundEnabled").notNull().default(false),
  soundVolume: integer("soundVolume").notNull().default(50), // 0-100
  
  // Advanced settings
  blindMode: boolean("blindMode").notNull().default(false),
  strictMode: boolean("strictMode").notNull().default(false), // stop on first error
  confidenceMode: boolean("confidenceMode").notNull().default(false), // no backspace
  
  // Custom themes and layouts
  customTheme: jsonb("customTheme").$type<{
    background: string;
    text: string;
    accent: string;
    error: string;
    correct: string;
  }>(),
  
  keyboardLayout: text("keyboardLayout").notNull().default("qwerty"),
  
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const customText = pgTable("customText", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  content: text("content").notNull(),
  isPrivate: boolean("isPrivate").notNull().default(true),
  tags: jsonb("tags").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})