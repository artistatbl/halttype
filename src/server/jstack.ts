import { jstack } from "jstack"
import { drizzle } from "drizzle-orm/postgres-js"
import { env } from "hono/adapter"
import { auth } from "@/lib/auth"

interface Env {
  Bindings: { DATABASE_URL: string }
}

export const j = jstack.init<Env>()

/**
 * Type-safely injects database into all procedures
 * @see https://jstack.app/docs/backend/middleware
 * 
 * For deployment to Cloudflare Workers
 * @see https://developers.cloudflare.com/workers/tutorials/postgres/
 */
const databaseMiddleware = j.middleware(async ({ c, next }) => {
  const { DATABASE_URL } = env(c)

  const db = drizzle(DATABASE_URL)

  return await next({ db })
})

/**
 * Authentication middleware to get the current user
 * Extracts the user from the session and adds it to the context
 */
const authMiddleware = j.middleware(async ({ c, next }) => {
  try {
    // Get the session from the request headers
    // better-auth requires the headers to extract the session
    const session = await auth.api.getSession({
      headers: c.req.raw.headers
    })
    
    if (session?.user) {
      // If we have a user in the session, add it to the context
      return await next({ 
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email
        } 
      })
    } else {
      // No authenticated user
      return await next({ user: null })
    }
  } catch (error) {
    console.error("Auth middleware error:", error)
    return await next({ user: null })
  }
})


export const publicProcedure = j.procedure.use(databaseMiddleware)
export const protectedProcedure = j.procedure.use(databaseMiddleware).use(authMiddleware)
