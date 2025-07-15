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
        "flex items-center gap-1.5 px-2 py-1 rounded transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      <span>{children}</span>
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
        "px-2 py-1 rounded transition-colors min-w-[2rem] text-center",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

export function ConfigSeparator() {
  return <div className="w-1 h-4 rounded-2xl bg-accent-foreground"></div>
}