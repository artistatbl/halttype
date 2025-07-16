"use client"

import { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface StaticLayoutProps {
  children: ReactNode
}

export function StaticLayout({ children }: StaticLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-7xl mx-auto px-10 py-8 md:py-12">
            {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}