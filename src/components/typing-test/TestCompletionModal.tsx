"use client"

import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/typing-test/calculations"
import { ActionButton } from "./ActionButton"

interface TestCompletionModalProps {
  isOpen: boolean
  wpm: number
  accuracy: number
  timeSpent: number
  charactersTyped: number
  testMode: "time" | "words" | "quote"
  onTryAgain: () => void
  onNewTest: () => void
  className?: string
}

export function TestCompletionModal({
  isOpen,
  wpm,
  accuracy,
  timeSpent,
  charactersTyped,
  testMode,
  onTryAgain,
  onNewTest,
  className,
}: TestCompletionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={cn(
        "bg-card/90 p-4 sm:p-6 max-w-md w-full rounded-md",
        className
      )}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary mb-4 sm:mb-6 text-center">
          Test Complete
        </h2>
        
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <StatCard
            value={wpm}
            label="wpm"
            className="text-primary"
          />
          <StatCard
            value={`${accuracy}%`}
            label="accuracy"
            className="text-foreground"
          />
          <StatCard
            value={formatTime(timeSpent)}
            label="time"
            className="text-foreground"
          />
          <StatCard
            value={charactersTyped}
            label="chars"
            className="text-foreground"
          />
        </div>
        
        <div className="flex gap-2 sm:gap-3">
          <ActionButton
            onClick={onTryAgain}
            className="flex-1"
            tooltip="Restart the same test with identical settings"
          >
            Try Again
          </ActionButton>
          <ActionButton
            onClick={onNewTest}
            className="flex-1"
            tooltip="Start a new test with different content"
          >
            New Test
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

// Reusable stat card component
interface StatCardProps {
  value: string | number
  label: string
  className?: string
}

function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div className="flex flex-col items-center">
      <p className={cn(
        "text-3xl sm:text-4xl md:text-5xl font-mono",
        className
      )}>
        {value}
      </p>
      <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  )
}