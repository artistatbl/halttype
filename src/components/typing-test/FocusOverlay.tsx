"use client"

import { cn } from "@/lib/utils"

interface FocusOverlayProps {
  isVisible: boolean
  onClick: () => void
  className?: string
}

export function FocusOverlay({ isVisible, onClick, className }: FocusOverlayProps) {
  return (
    <div 
      className={cn(
        "absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg cursor-pointer",
        "transition-all duration-500 ease-out",
        isVisible 
          ? "opacity-100 scale-100 pointer-events-auto" 
          : "opacity-0 scale-95 pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      <div className={cn(
        "text-center transform transition-all duration-700 ease-out",
        isVisible 
          ? "translate-y-0 opacity-100 scale-100" 
          : "translate-y-4 opacity-0 scale-95"
      )}>
        <div className="relative">
          <p className="text-lg font-medium text-primary mb-2 animate-pulse">
            Click here or press any key to focus
          </p>
          <div className={cn(
            "absolute -inset-2 bg-primary/10 rounded-lg blur-xl",
            "transition-all duration-1000 ease-out",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )} />
        </div>
      </div>
    </div>
  )
}