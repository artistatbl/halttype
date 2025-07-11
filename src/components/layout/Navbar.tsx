"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserDropdown } from "./UserDropdown"
import { useFocus } from "../typing-test/FocusContext"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Infinity, BarChart3, HelpCircle } from "lucide-react"

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { isFocused } = useFocus()
  
  return (
    <header className={cn(
      "w-full py-3 sm:py-4 md:py-5 px-4 sm:px-6 md:px-8 flex flex-wrap items-center justify-between text-xs mt-3 sm:mt-4 md:mt-6 mb-6 sm:mb-8 md:mb-10 mx-auto max-w-full sm:max-w-[95%] md:max-w-[90%] gap-y-3 sm:gap-y-4 bg-background text-card-foreground",
      className
    )}>
      <div className="w-full flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-foreground font-medium flex items-center gap-1 hover:text-primary transition-all duration-200">
            <span className="text-primary font-bold text-2xl sm:text-2xl md:text-3xl">halt</span>
            <span className="text-2xl sm:text-2xl md:text-3xl">type</span>
          </Link>
          
          {/* Navigation Links - Hidden in focus mode */}
          <div className={cn(
            "flex flex-wrap items-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-2 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center p-1.5 rounded-md hover:bg-muted/50">
                  <Infinity width="16" height="16" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Practice</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center p-1.5 rounded-md hover:bg-muted/50">
                  <BarChart3 width="16" height="16" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Leaderboard</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center justify-center p-1.5 rounded-md hover:bg-muted/50">
                  <HelpCircle width="16" height="16" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* User Menu - Hidden in focus mode */}
        <div className={cn(
          "flex items-center gap-4 transition-opacity duration-300",
          isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}