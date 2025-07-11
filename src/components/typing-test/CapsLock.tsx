"use client"

import { useState, useEffect } from "react"

interface CapsLockProps {
  onCapsLockChange?: (isOn: boolean) => void
}

export function useCapsLock(): boolean {
  const [capsLockOn, setCapsLockOn] = useState(false)

  useEffect(() => {
    // Function to check Caps Lock state
    const checkCapsLock = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setCapsLockOn(e.getModifierState("CapsLock"))
      }
    }

    // Check initial Caps Lock state using keyboard event
    const checkInitialState = () => {
      // We can't directly access getModifierState on document
      // Instead, we'll rely on the next keydown event to set the state
      // or use a dummy keyboard event if available in the browser
      try {
        // This is just to check if the API exists in this browser
        const testEvent = new KeyboardEvent("keydown")
        if (testEvent.getModifierState) {
          setCapsLockOn(testEvent.getModifierState("CapsLock"))
        }
      } catch (error) {
        // If KeyboardEvent constructor is not supported, we'll wait for user input
        console.log("Initial Caps Lock state will be detected on first keypress")
      }
    }

    // Run the initial check
    checkInitialState()

    // Add event listener for keydown
    document.addEventListener("keydown", checkCapsLock)

    // Cleanup
    return () => {
      document.removeEventListener("keydown", checkCapsLock)
    }
  }, [])

  return capsLockOn
}

export function CapsLockWarning({
  isOn = false,
}: {
  isOn: boolean
}) {
  if (!isOn) return null

  return (
    <div className="absolute top-0 left-0 right-0 z-10 transform -translate-y-full mb-2 flex justify-center">
      <div className="bg-destructive/90 text-destructive-foreground px-3 py-1 rounded-md text-sm font-medium shadow-md flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/>
          <circle cx="17" cy="7" r="5"/>
        </svg>
        Caps Lock is on
      </div>
    </div>
  )
}

export function CapsLock({ onCapsLockChange }: CapsLockProps) {
  const capsLockOn = useCapsLock()

  // Notify parent component of Caps Lock state change if callback provided
  useEffect(() => {
    onCapsLockChange?.(capsLockOn)
  }, [capsLockOn, onCapsLockChange])

  return (
    <CapsLockWarning 
      isOn={capsLockOn}
    />
  )
}