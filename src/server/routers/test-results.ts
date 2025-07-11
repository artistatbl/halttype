import { j, publicProcedure, protectedProcedure } from "../jstack"
import { z } from "zod"
import { nanoid } from "nanoid"
import { testResult } from "../db/schema"
import { eq, desc } from "drizzle-orm"

// Define the input schema for saving test results
const saveTestResultSchema = z.object({
  testId: z.string(),
  wpm: z.number().int().positive(),
  accuracy: z.number().int().min(0).max(100),
  timeSpent: z.number().positive(),
  wordsTyped: z.number().int().positive(),
  correctWords: z.number().int().min(0),
  incorrectWords: z.number().int().min(0),
  keystrokes: z.array(
    z.object({
      key: z.string(),
      timestamp: z.number(),
      correct: z.boolean(),
    })
  ).optional(),
})

// Create the test results router
export const testResultsRouter = j.router({
  // Save a test result to the database
  saveTestResult: protectedProcedure
    .input(saveTestResultSchema)
    .mutation(async ({ input, ctx, c }) => {
      const { db } = ctx
      const userId = ctx.user?.id // Get the authenticated user's ID
      
      if (!userId) {
        throw new Error("User must be authenticated to save test results")
      }

      // Insert the test result into the database
      const result = await db.insert(testResult).values({
        id: nanoid(),
        testId: input.testId,
        userId: userId, // User ID from the authenticated session
        wpm: input.wpm,
        accuracy: input.accuracy,
        timeSpent: input.timeSpent,
        wordsTyped: input.wordsTyped,
        correctWords: input.correctWords,
        incorrectWords: input.incorrectWords,
        keystrokes: input.keystrokes || [],
        completedAt: new Date(),
      })
      .returning()

      // Return the result through the context's json method to match the expected ResponseType
      return c.json(result[0])
    }),

  // Get test results for a specific test
  getTestResults: publicProcedure
    .input(z.object({
      testId: z.string(),
      limit: z.number().int().min(1).max(100).default(10),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input, ctx, c }) => {
      const { db } = ctx
      const { testId, limit, offset } = input

      // Using SQL-like query instead of the query builder
      const results = await db
        .select()
        .from(testResult)
        .where(eq(testResult.testId, testId))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(testResult.completedAt))

      return c.json(results)
    }),

  // Get test results for the current user
  getUserResults: protectedProcedure
    .input(z.object({
      limit: z.number().int().min(1).max(100).default(10),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input, ctx, c }) => {
      const { db } = ctx
      const { limit, offset } = input
      const userId = ctx.user?.id

      if (!userId) {
        return c.json([])
      }

      // Using SQL-like query instead of the query builder
      const results = await db
        .select()
        .from(testResult)
        .where(eq(testResult.userId, userId))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(testResult.completedAt))

      return c.json(results)
    }),
})