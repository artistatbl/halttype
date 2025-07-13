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
      "w-full bg-background backdrop-blur-md sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-10 py-5">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-primary font-bold text-3xl tracking-tight">halt</span>
              <span className="text-foreground font-bold text-3xl tracking-tight group-hover:text-primary transition-colors duration-200">type</span>
            </Link>
            
            {/* Navigation Links - Hidden in focus mode */}
            <nav className={cn(
              "hidden md:flex items-center gap-2 transition-all duration-300 ease-in-out",
              isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50">
                    <Infinity className="w-4 h-4" />
                    <span className="text-sm font-medium">Practice</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Practice</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-sm font-medium">Leaderboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Leaderboard</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50">
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">About</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>About</p>
                </TooltipContent>
              </Tooltip>
            </nav>
          </div>
          
          {/* Mobile Navigation + User Menu */}
          <div className="flex items-center gap-2">
            {/* Mobile Navigation - Only icons */}
            <nav className={cn(
              "flex md:hidden items-center gap-1 transition-all duration-300 ease-in-out",
              isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center p-2 rounded-lg hover:bg-muted/50">
                    <Infinity className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Practice</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center p-2 rounded-lg hover:bg-muted/50">
                    <BarChart3 className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Leaderboard</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center p-2 rounded-lg hover:bg-muted/50">
                    <HelpCircle className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>About</p>
                </TooltipContent>
              </Tooltip>
            </nav>
            
            {/* User Menu - Hidden in focus mode */}
            <div className={cn(
              "flex items-center transition-all duration-300 ease-in-out",
              isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            )}>
              <UserDropdown />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}