"use client"

import { createContext, useContext, useState, ReactNode, useRef, useCallback, useEffect } from "react"

interface FocusContextType {
  isFocused: boolean
  showBlurOverlay: boolean
  setFocused: (focused: boolean) => void
  resetInactivityTimer: () => void
}

const FocusContext = createContext<FocusContextType | undefined>(undefined)

export function FocusProvider({ children }: { children: ReactNode }) {
  const [isFocused, setFocused] = useState(false)
  const [showBlurOverlay, setShowBlurOverlay] = useState(false)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)

  const resetInactivityTimer = useCallback(() => {
    // Clear existing timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }
    
    // Hide blur overlay immediately when user is active
    setShowBlurOverlay(false)
    
    // Set new timer for 2 seconds of inactivity
    inactivityTimerRef.current = setTimeout(() => {
      setShowBlurOverlay(true)
    }, 2000)
  }, [])

  // Start the inactivity timer on mount
  useEffect(() => {
    resetInactivityTimer()
    
    // Cleanup timer on unmount
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [resetInactivityTimer])

  return (
    <FocusContext.Provider value={{ isFocused, showBlurOverlay, setFocused, resetInactivityTimer }}>
      {children}
    </FocusContext.Provider>
  )
}

export function useFocus() {
  const context = useContext(FocusContext)
  if (context === undefined) {
    throw new Error("useFocus must be used within a FocusProvider")
  }
  return context
}