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
        "flex items-center justify-center gap-8 text-zinc-400 text-lg",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <span className="text-2xl font-mono text-zinc-200">{wpm}</span>
        <span className="text-sm uppercase tracking-wider">wpm</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-2xl font-mono text-zinc-200">{accuracy}%</span>
        <span className="text-sm uppercase tracking-wider">accuracy</span>
      </div>
      
      {timeRemaining !== undefined && timeRemaining !== null && (
        <div className="flex flex-col items-center">
          <span className="text-2xl font-mono text-zinc-200">{timeRemaining}s</span>
          <span className="text-sm uppercase tracking-wider">time</span>
        </div>
      )}
    </div>
  )
}