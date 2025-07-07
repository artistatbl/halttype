"use client"

import { cn } from "@/lib/utils"

interface TextDisplayProps {
  text: string
  currentPosition: number
  errors: number[]
  className?: string
}

export function TextDisplay({
  text,
  currentPosition,
  errors,
  className,
}: TextDisplayProps) {
  return (
    <div 
      className={cn(
        "w-full text-xl leading-relaxed tracking-wide font-mono",
        "min-h-[180px] flex items-center justify-center",
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
                  isActive && "bg-zinc-800/70 text-zinc-100 rounded",
                  isPast && !isError && "text-zinc-400",
                  isPast && isError && "text-red-500",
                  !isPast && !isActive && "text-zinc-700"
                )}
              >
                {char}
              </span>
            )
          })}
        </div>
        
        {/* Cursor */}
        <div 
          className="absolute top-0 left-0 w-[2px] h-[1.2em] bg-yellow-400 animate-pulse transition-all duration-50"
          style={{
            transform: `translateX(${currentPosition * 0.6}em)`,
          }}
        />
      </div>
    </div>
  )
}