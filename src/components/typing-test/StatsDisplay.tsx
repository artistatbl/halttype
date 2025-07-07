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
        "flex items-center justify-center gap-6 text-zinc-500 text-xs",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl font-mono text-yellow-400">{wpm}</span>
        <span className="text-xs uppercase tracking-wider">wpm</span>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-xl font-mono text-zinc-300">{accuracy}%</span>
        <span className="text-xs uppercase tracking-wider">accuracy</span>
      </div>
      
      {timeRemaining !== undefined && timeRemaining !== null && (
        <div className="flex flex-col items-center">
          <span className="text-xl font-mono text-zinc-300">{timeRemaining}s</span>
          <span className="text-xs uppercase tracking-wider">time</span>
        </div>
      )}
    </div>
  )
}