"use client"

import { cn } from "@/lib/utils"

interface StatsDisplayProps {
  wpm: number
  accuracy: number
  timeRemaining?: number | null
  className?: string
}

export function StatsDisplay({
  wpm,
  accuracy,
  timeRemaining,
  className,
}: StatsDisplayProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-center gap-3 sm:gap-4 md:gap-6 text-muted-foreground text-xs",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl font-mono text-primary">{wpm}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider">wpm</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl font-mono text-foreground">{accuracy}%</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider">accuracy</span>
      </div>
      
      {timeRemaining !== undefined && timeRemaining !== null && (
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl font-mono text-foreground">{timeRemaining}s</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider">time</span>
        </div>
      )}
    </div>
  )
}