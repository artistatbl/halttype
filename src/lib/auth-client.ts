import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NODE_ENV === "production" 
    ? "https://halttype.com" // Replace with your production domain
    : "http://localhost:3000",
})

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
} = authClient