"use client"

import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/typing-test/calculations"
import { TestState } from "@/lib/typing-test/types"

interface TestTimerProps {
  timeRemaining: number
  className?: string
}

export function TestTimer({
  timeRemaining,
  className,
}: TestTimerProps) {
  return (
    <div className={cn(
      "w-full flex justify-start",
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
  testState: TestState
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