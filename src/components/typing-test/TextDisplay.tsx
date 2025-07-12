"use client"

import { cn } from "@/lib/utils"
import { CapsLockWarning } from "./CapsLock"

interface TextDisplayProps {
  text: string
  currentPosition: number
  errors: number[]
  timeRemaining?: number | null
  testState?: "idle" | "running" | "completed"
  capsLockOn?: boolean
  className?: string
}

export function TextDisplay({
  text,
  currentPosition,
  errors,
  timeRemaining,
  testState = "idle",
  capsLockOn = false,
  className,
}: TextDisplayProps) {
  return (
    <div 
      className={cn(
        "w-full text-accent-foreground text-xl sm:text-xl md:text-2xl leading-relaxed tracking-wide  py-5 sm:py-6 md:py-8 px-4 sm:px-5 md:px-6 rounded-lg transition-all",
        className
      )}
    >
      <div className="relative w-full">
        <CapsLockWarning isOn={capsLockOn} />
        
        {/* Text content with improved styling and readability */}
        <div className="w-full leading-[1.7] tracking-[0.04em] [word-spacing:0.18em] sm:leading-[1.8] sm:tracking-[0.05em] sm:[word-spacing:0.2em] md:leading-[1.9] md:tracking-[0.06em] md:[word-spacing:0.22em]">
          {text.split('').map((char, index) => {
            const isActive = index === currentPosition
            const isPast = index < currentPosition
            const isError = errors.includes(index)
            
            return (
              <span
                key={index}
                className={cn(
                  "transition-colors duration-50",
                  isActive && "text-primary font-bold relative", 
                  isPast && !isError && "text-primary/40",
                  isPast && isError && "text-destructive",
                  !isPast && !isActive && "text-primary"
                )}
              >
                {char}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}