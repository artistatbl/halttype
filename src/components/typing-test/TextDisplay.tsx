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
        "w-full text-xl leading-relaxed tracking-wide font-mono py-6 px-4 rounded-lg",
        className
      )}
    >
      <div className="relative w-full">
        {/* Text content with improved styling and readability */}
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
                  isActive && "text-primary font-bold", 
                  isPast && !isError && "text-primary/80",
                  isPast && isError && "text-destructive",
                  !isPast && !isActive && "text-primary/40"
                )}
              >
                {char}
              </span>
            )
          })}
        </div>
        
        {/* Improved spacing and line height for better readability */}
        <style jsx>{`
          .w-full {
            line-height: 1.8;
            letter-spacing: 0.05em;
            word-spacing: 0.2em;
          }
        `}</style>
      </div>
    </div>
  )
}