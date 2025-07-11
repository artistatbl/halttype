"use client"

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { HTTPException } from "hono/http-exception"
import { PropsWithChildren, useState } from "react"
import { ThemeProvider } from "./theme/theme-provider"
import { ThemeSwitcher } from "./theme/theme-switcher"

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            if (err instanceof HTTPException) {
              // global error handling, e.g. toast notification ...
            }
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="theme"
        themes={["light", "dark", "amber", "caffiene", "nature", "notebook", "claude", "twitter", "mono"]}
      >
        <ThemeSwitcher />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
