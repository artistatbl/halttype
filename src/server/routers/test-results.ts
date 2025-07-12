import { j, publicProcedure, protectedProcedure } from "../jstack"
import { z } from "zod"
import { nanoid } from "nanoid"
import { testResult } from "../db/schema"
import { eq, desc, and } from "drizzle-orm"

// Define the input schema for starting a test
const startTestSchema = z.object({
  testId: z.string(),
})

// Define the input schema for saving test results
const saveTestResultSchema = z.object({
  testId: z.string(),
  wpm: z.number().int().positive(),
  accuracy: z.number().int().min(0).max(100),
  timeSpent: z.number().int().positive(), // Changed from z.number().positive() to z.number().int().positive()
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
  // Start a test and save the initial record
  startTest: protectedProcedure
    .input(startTestSchema)
    .mutation(async ({ input, ctx, c }) => {
      const { db } = ctx
      const userId = ctx.user?.id // Get the authenticated user's ID
      
      if (!userId) {
        throw new Error("User must be authenticated to start a test")
      }

      // Check if there's an existing started test that hasn't been completed
      const existingTests = await db
        .select()
        .from(testResult)
        .where(
          and(
            eq(testResult.userId, userId),
            eq(testResult.testId, input.testId),
            eq(testResult.status, "started")
          )
        )
        .limit(1)

      // If there's an existing started test, return it
      if (existingTests.length > 0) {
        return c.json(existingTests[0]!)
      }

      // Insert the initial test result into the database
      const result = await db.insert(testResult).values({
        id: nanoid(),
        testId: input.testId,
        userId: userId,
        wpm: 0, // Initial values will be updated when test is completed
        accuracy: 0,
        timeSpent: 0,
        wordsTyped: 0,
        correctWords: 0,
        incorrectWords: 0,
        keystrokes: [],
        startedAt: new Date(),
        status: "started",
      })
      .returning()

      // Return the result through the context's json method
      return c.json(result[0]!)
    }),

  // Save a test result to the database
  saveTestResult: protectedProcedure
    .input(saveTestResultSchema)
    .mutation(async ({ input, ctx, c }) => {
      const { db } = ctx
      const userId = ctx.user?.id // Get the authenticated user's ID
      
      if (!userId) {
        throw new Error("User must be authenticated to save test results")
      }

      // Check if there's an existing started test for this user and test
      const existingTests = await db
        .select()
        .from(testResult)
        .where(
          and(
            eq(testResult.userId, userId),
            eq(testResult.testId, input.testId),
            eq(testResult.status, "started")
          )
        )
        .limit(1)

      if (existingTests.length > 0) {
        // Update the existing test result
        const existingTest = existingTests[0]!  // Non-null assertion
        const result = await db.update(testResult)
          .set({
            wpm: input.wpm,
            accuracy: input.accuracy,
            timeSpent: input.timeSpent,
            wordsTyped: input.wordsTyped,
            correctWords: input.correctWords,
            incorrectWords: input.incorrectWords,
            keystrokes: input.keystrokes || [],
            completedAt: new Date(),
            status: "completed",
          })
          .where(eq(testResult.id, existingTest.id))
          .returning()
        
        return c.json(result[0])
      } else {
        // Insert a new test result
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
          startedAt: new Date(), // Set startedAt to the same as completedAt since we don't have the actual start time
          completedAt: new Date(),
          status: "completed",
        })
        .returning()

        // Return the result through the context's json method to match the expected ResponseType
        return c.json(result[0]!)
      }
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