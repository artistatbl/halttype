"use client"

import { LockIcon } from "lucide-react"
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

    // Add event listeners for both keydown and keyup to detect Caps Lock changes
    document.addEventListener("keydown", checkCapsLock)
    document.addEventListener("keyup", checkCapsLock)
    
    // Function for capslock event
    const handleCapsLockEvent = () => {
      // This is a fallback for browsers that support the capslock event
      // We'll still rely on the keydown/keyup events for most browsers
      try {
        const testEvent = new KeyboardEvent("keydown")
        if (testEvent.getModifierState) {
          setCapsLockOn(testEvent.getModifierState("CapsLock"))
        }
      } catch (error) {
        // Ignore errors
      }
    }
    
    // Some browsers support a dedicated 'capslock' event
    document.addEventListener("capslock", handleCapsLockEvent)

    // Cleanup
    return () => {
      document.removeEventListener("keydown", checkCapsLock)
      document.removeEventListener("keyup", checkCapsLock)
      document.removeEventListener("capslock", handleCapsLockEvent)
    }
  }, [])

  return capsLockOn
}

export function CapsLockWarning({
  isOn = false,
}: {
  isOn: boolean
}) {
  return (
    <div 
      className={`absolute top-0 left-0 right-0 z-50 flex justify-center mb-16 ${isOn ? 'block' : 'hidden'}`}
      aria-hidden={!isOn}
    >
      <div className="bg-accent text-primany px-4 py-2 rounded-md text-sm font-bold  flex items-center gap-2">
        <LockIcon className="w-4 h-4"/>
        CAPS LOCK
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