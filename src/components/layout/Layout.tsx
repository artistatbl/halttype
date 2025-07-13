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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12">
            {children}
        </div>
      </main>
      <Footer className={cn(
        "transition-all duration-300 ease-in-out",
        isFocused ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100 translate-y-0"
      )} />
    </div>
  )
}