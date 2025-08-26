"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ConfigButtonProps {
  isActive: boolean
  onClick: () => void
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function ConfigButton({
  isActive,
  onClick,
  icon,
  children,
  className,
}: ConfigButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-md bg-transparent",
        "transition-all duration-200 ease-out transform",
        "hover:scale-105 hover:bg-accent/20 active:scale-95",
        isActive
          ? "text-primary bg-primary/10 shadow-sm scale-105"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {icon && (
        <span className={cn(
          "w-3 h-3 transition-transform duration-200 ease-out",
          isActive && "scale-110"
        )}>
          {icon}
        </span>
      )}
      <span className={cn(
        "transition-all duration-200 ease-out",
        isActive && "font-medium"
      )}>
        {children}
      </span>
    </button>
  )
}

interface OptionButtonProps {
  isActive: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}

export function OptionButton({
  isActive,
  onClick,
  children,
  className,
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-1 rounded-md min-w-[2rem] text-center",
        "transition-all duration-200 ease-out transform",
        "hover:scale-110 hover:bg-accent/20 active:scale-95",
        "hover:shadow-sm hover:-translate-y-0.5",
        isActive
          ? "text-primary bg-primary/10 font-medium scale-105 shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <span className={cn(
        "transition-all duration-200 ease-out",
        isActive && "drop-shadow-sm"
      )}>
        {children}
      </span>
    </button>
  )
}

export function ConfigSeparator() {
  return (
    <div className={cn(
      "w-1 h-4 rounded-2xl bg-accent-foreground/30",
      "transition-all duration-300 ease-out",
      "hover:bg-accent-foreground/50 hover:scale-110"
    )} />
  )
}