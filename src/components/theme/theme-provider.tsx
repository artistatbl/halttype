"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // Log the props for debugging
  console.log('ThemeProvider props:', props)
  
  return (
    <NextThemesProvider 
      {...props}
      // Ensure we're using the class attribute for theme application
      attribute="class"
    >
      {children}
    </NextThemesProvider>
  )
}