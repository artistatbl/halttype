import type { Metadata } from "next"
import { Providers } from "../components/providers"
import { generateSEOMetadata } from "@/components/seo/SEOHead"
import { StructuredData } from "@/components/seo/SEOHead"
import { 
  getTypingTestStructuredData, 
  getWebsiteStructuredData, 
  getEducationalStructuredData 
} from "@/components/seo/StructuredData"

import "./globals.css"

export const metadata: Metadata = generateSEOMetadata({
  title: "HaltType - Free Online Typing Speed Test | WPM Test & Typing Practice",
  description: "Test your typing speed and accuracy with HaltType's free online typing test. Measure your WPM (words per minute), track progress, and improve your typing skills with our interactive typing trainer. Perfect for students, professionals, and anyone looking to enhance their keyboard proficiency.",
  keywords: [
    "typing test",
    "typing speed test", 
    "wpm test",
    "words per minute test",
    "typing practice",
    "keyboard test",
    "typing skills",
    "typing accuracy",
    "online typing test",
    "free typing test",
    "typing speed",
    "typing game",
    "typing trainer",
    "touch typing",
    "keyboard proficiency",
    "typing improvement",
    "typing assessment",
    "typing exercise",
    "typing lesson",
    "typing tutor"
  ]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={getWebsiteStructuredData()} />
        <StructuredData data={getTypingTestStructuredData()} />
        <StructuredData data={getEducationalStructuredData()} />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
