"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  tooltip?: string
  disabled?: boolean
}

export function ActionButton({ onClick, children, className, tooltip, disabled }: ActionButtonProps) {
  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "py-1.5 sm:py-2 px-2 sm:px-3  text-accent text-md sm:text-base transition-colors rounded",
        className
      )}
    >
      {children}
    </button>
  )

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-lg">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return button
}