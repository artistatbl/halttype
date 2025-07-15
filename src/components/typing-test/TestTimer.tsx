"use client"

import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/typing-test/calculations"

interface TestTimerProps {
  timeRemaining: number
  testMode: "time" | "words" | "quote"
  testState: "idle" | "running" | "completed"
  className?: string
}

export function TestTimer({
  timeRemaining,
  testMode,
  testState,
  className,
}: TestTimerProps) {
  // Only show timer for time-based tests
  if (testMode !== "time") {
    return null
  }

  return (
    <div className={cn(
      "w-full flex justify-start mb-2 sm:mb-4",
      className
    )}>
      <div className="text-sm sm:text-base md:text-lg font-mono text-primary/90 font-semibold bg-background/50 px-2 sm:px-3 py-1 rounded-md">
        {timeRemaining}s
      </div>
    </div>
  )
}

// Alternative timer component for elapsed time display
interface ElapsedTimerProps {
  elapsedTime: number
  testState: "idle" | "running" | "completed"
  className?: string
}

export function ElapsedTimer({
  elapsedTime,
  testState,
  className,
}: ElapsedTimerProps) {
  if (testState === "idle") {
    return null
  }

  return (
    <div className={cn(
      "text-sm sm:text-base md:text-lg font-mono text-muted-foreground",
      className
    )}>
      {formatTime(elapsedTime)}
    </div>
  )
}