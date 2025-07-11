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
        "w-full text-xl leading-relaxed tracking-wide font-mono py-4",
        className
      )}
    >
      <div className="relative w-full">

        {/* Text content - styled like Monkeytype with no visible input line */}
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
                  isActive && "text-primary", // Removed the underline
                  isPast && !isError && "text-primary/70",
                  isPast && isError && "text-destructive",
                  !isPast && !isActive && "text-primary/40"
                )}
              >
                {char}
              </span>
            )
          })}
        </div>
        
        {/* Cursor - smoother and more visible like Monkeytype */}
        <div 
          className="absolute top-0 left-0 w-[2px] h-[1.2em] bg-primary transition-all duration-100"
          style={{
            transform: `translateX(${currentPosition * 0.6}em)`,
            animation: 'caret-blink 1.2s ease-in-out infinite',
            opacity: testState === 'running' ? 1 : 0.7,
          }}
        />
        
        <style jsx>{`
          @keyframes caret-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    </div>
  )
}