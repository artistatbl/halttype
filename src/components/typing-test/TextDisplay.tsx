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
        "w-full text-base sm:text-lg md:text-xl leading-relaxed tracking-wide font-mono py-4 sm:py-5 md:py-6 px-2 sm:px-3 md:px-4 rounded-lg",
        className
      )}
    >
      <div className="relative w-full">
        {/* Caps Lock warning */}
        <CapsLockWarning isOn={capsLockOn} />
        
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
        
        {/* Improved spacing and line height for better readability with responsive adjustments */}
        <style jsx>{`
          .w-full {
            line-height: 1.6;
            letter-spacing: 0.03em;
            word-spacing: 0.15em;
          }
          
          @media (min-width: 640px) {
            .w-full {
              line-height: 1.7;
              letter-spacing: 0.04em;
              word-spacing: 0.18em;
            }
          }
          
          @media (min-width: 768px) {
            .w-full {
              line-height: 1.8;
              letter-spacing: 0.05em;
              word-spacing: 0.2em;
            }
          }
        `}</style>
      </div>
    </div>
  )
}