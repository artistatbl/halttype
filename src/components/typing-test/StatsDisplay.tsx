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
        "flex items-center justify-center gap-4 sm:gap-6 md:gap-8 text-muted-foreground text-xs",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl md:text-2xl font-mono text-primary font-medium">{wpm}</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">wpm</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-lg sm:text-xl md:text-2xl font-mono text-foreground font-medium">{accuracy}%</span>
        <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">accuracy</span>
      </div>
      
      {timeRemaining !== undefined && timeRemaining !== null && (
        <div className="flex flex-col items-center">
          <span className="text-lg sm:text-xl md:text-2xl font-mono text-foreground font-medium">{timeRemaining}s</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider mt-1">time</span>
        </div>
      )}
    </div>
  )
}