import { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background flex items-start justify-center pt-8">
        <div className="w-full max-w-7xl px-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}