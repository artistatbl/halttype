"use client"

import { cn } from "@/lib/utils"

interface TextDisplayProps {
  text: string
  currentPosition: number
  errors: number[]
  timeRemaining?: number | null
  testState?: "idle" | "running" | "completed"
  className?: string
}

export function TextDisplay({
  text,
  currentPosition,
  errors,
  timeRemaining,
  testState = "idle",
  className,
}: TextDisplayProps) {
  return (
    <div 
      className={cn(
        "w-full text-xl leading-relaxed tracking-wide font-mono",
        className
      )}
    >
      <div className="relative w-full">

        {/* Text content */}
        <div className="w-full">
          {text.split('').map((char, index) => {
            const isActive = index === currentPosition
            const isPast = index < currentPosition
            const isError = errors.includes(index)
            
            return (
              <span
                key={index}
                className={cn(
                  "transition-colors duration-50",
                  isActive && "bg-muted/70 text-foreground rounded",
                  isPast && !isError && "text-muted-foreground",
                  isPast && isError && "text-destructive",
                  !isPast && !isActive && "text-muted-foreground/70"
                )}
              >
                {char}
              </span>
            )
          })}
        </div>
        
        {/* Cursor */}
        <div 
          className="absolute top-0 left-0 w-[2px] h-[1.2em] bg-primary animate-pulse transition-all duration-50"
          style={{
            transform: `translateX(${currentPosition * 0.6}em)`,
          }}
        />
      </div>
    </div>
  )
}