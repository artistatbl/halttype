import { ReactNode, useEffect, useState } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isFocusMode, setIsFocusMode] = useState(false)

  // Listen for focus mode changes from the TypingTest component
  useEffect(() => {
    const handleFocusModeChange = () => {
      const focusModeElements = document.querySelectorAll('[data-focus-mode="true"]')
      setIsFocusMode(focusModeElements.length > 0)
    }

    // Create a mutation observer to watch for changes to the DOM
    const observer = new MutationObserver(handleFocusModeChange)
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['data-focus-mode'],
      childList: true, 
      subtree: true 
    })
    
    // Initial check
    handleFocusModeChange()
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className={cn(isFocusMode && "navbar-focus-mode")} />
      <main className="flex-1 bg-background flex items-start justify-center pt-8">
        <div className="w-full max-w-7xl px-4">
          {children}
        </div>
      </main>
      <Footer className={cn(isFocusMode && "footer-focus-mode")} />
    </div>
  )
}