import type { Metadata } from "next"
import { Providers } from "../components/providers"

import "./globals.css"

export const metadata: Metadata = {
  title: "HaltType - Test Your Typing Speed",
  description: "A minimalist typing test app to measure your typing speed and accuracy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
