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
import { FocusProvider } from "./typing-test/FocusContext"

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
        defaultTheme="halt"
        //enableSystem={false}
       // disableTransitionOnChange
        storageKey="theme"
        themes={["halt", "amber", "caffiene", "nature", "notebook", "claude", "twitter", "mono"]}
      >
        <FocusProvider>
          <ThemeSwitcher />
          {children}
        </FocusProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
