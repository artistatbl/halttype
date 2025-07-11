// import { pgTable, serial, text, timestamp, index } from "drizzle-orm/pg-core"

// Import all models
import { user, session, account, verification } from "./models/user"
import { test, testResult } from "./models/test"
import { leaderboard, userStats } from "./models/leaderboard"
import { userSettings, customText } from "./models/settings"

// Export all models for use throughout the application
export {
  // User authentication models
  user,
  session,
  account,
  verification,
  
  // Typing test models
  test,
  testResult,
  
  // Leaderboard and statistics models
  leaderboard,
  userStats,
  
  // User preferences and custom content models
  userSettings,
  customText,
}

// Export types for TypeScript
export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
export type Session = typeof session.$inferSelect
export type NewSession = typeof session.$inferInsert
export type Account = typeof account.$inferSelect
export type NewAccount = typeof account.$inferInsert
export type Verification = typeof verification.$inferSelect
export type NewVerification = typeof verification.$inferInsert

export type Test = typeof test.$inferSelect
export type NewTest = typeof test.$inferInsert
export type TestResult = typeof testResult.$inferSelect
export type NewTestResult = typeof testResult.$inferInsert

export type Leaderboard = typeof leaderboard.$inferSelect
export type NewLeaderboard = typeof leaderboard.$inferInsert
export type UserStats = typeof userStats.$inferSelect
export type NewUserStats = typeof userStats.$inferInsert

export type UserSettings = typeof userSettings.$inferSelect
export type NewUserSettings = typeof userSettings.$inferInsert
export type CustomText = typeof customText.$inferSelect
export type NewCustomText = typeof customText.$inferInsert 