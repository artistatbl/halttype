import { ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { useFocus } from "../typing-test/FocusContext"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { isFocused } = useFocus()
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-background flex items-start justify-center pt-8">
        <div className="w-full max-w-7xl px-4">
          {children}
        </div>
      </main>
      <Footer className={cn(
        "transition-opacity duration-300",
        isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
      )} />
    </div>
  )
}