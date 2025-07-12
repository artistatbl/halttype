import { j, publicProcedure, protectedProcedure } from "../jstack"
import { z } from "zod"
import { nanoid } from "nanoid"
import { test } from "../db/schema"
import { eq, desc } from "drizzle-orm"

// Define the input schema for creating a test
const createTestSchema = z.object({
  name: z.string(),
  content: z.string(),
  language: z.string().default("english"),
  difficulty: z.enum(["easy", "medium", "hard"]).default("medium"),
  wordCount: z.number().int().positive(),
  timeLimit: z.number().int().positive().optional(),
  isPublic: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
})

// Create the tests router
export const testsRouter = j.router({
  // Create a new test
  createTest: protectedProcedure
    .input(createTestSchema)
    .mutation(async ({ input, ctx, c }) => {
      const { db } = ctx
      const userId = ctx.user?.id // Get the authenticated user's ID
      
      // Insert the test into the database
      const result = await db.insert(test).values({
        id: nanoid(),
        name: input.name,
        content: input.content,
        language: input.language,
        difficulty: input.difficulty,
        wordCount: input.wordCount,
        timeLimit: input.timeLimit,
        isPublic: input.isPublic,
        tags: input.tags || [],
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

      // Return the result through the context's json method
      return c.json(result[0]!)
    }),

  // Get a test by ID
  getTest: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input, ctx, c }) => {
      const { db } = ctx
      
      const result = await db
        .select()
        .from(test)
        .where(eq(test.id, input.id))
        .limit(1)
      
      if (result.length === 0) {
        throw new Error("Test not found")
      }
      
      return c.json(result[0]!)
    }),

  // Get all tests
  getAllTests: publicProcedure
    .input(z.object({
      limit: z.number().int().min(1).max(100).default(10),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input, ctx, c }) => {
      const { db } = ctx
      const { limit, offset } = input
      
      const results = await db
        .select()
        .from(test)
        .where(eq(test.isPublic, true))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(test.createdAt))
      
      return c.json(results)
    }),

  // Create a sample test (for development/testing)
  createSampleTest: publicProcedure
    .mutation(async ({ ctx, c }) => {
      const { db } = ctx
      
      // Check if the sample test already exists
      const existingTest = await db
        .select()
        .from(test)
        .where(eq(test.id, "sample-test"))
        .limit(1)
      
      if (existingTest.length > 0) {
        return c.json(existingTest[0]!)
      }
      
      // Create a sample test
      const result = await db.insert(test).values({
        id: "sample-test", // Use a fixed ID for the sample test
        name: "Sample Typing Test",
        content: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once. Typing practice helps improve speed and accuracy over time.",
        language: "english",
        difficulty: "medium",
        wordCount: 24,
        timeLimit: 60,
        isPublic: true,
        tags: ["sample", "practice"],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
      
      return c.json(result[0]!)
    }),
})