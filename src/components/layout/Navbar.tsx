"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserDropdown } from "./users/UserDropdown"
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
      "w-full top-0 z-50",
      className
    )}>
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-primary font-extrabold text-3xl tracking-tighter">halt</span>
              <span className="text-foreground/90 font-extrabold text-3xl tracking-tighter group-hover:text-primary transition-all duration-300">type</span>
            </Link>
            
            {/* Navigation Links - Hidden in focus mode */}
            <nav className={cn(
              "hidden lg:flex items-center gap-8 transition-all duration-300 ease-in-out",
              isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            )}>
              <Link href="/" className="text-muted-foreground hover:text-primary transition-all duration-300 group relative">
                <span className="text-sm font-semibold tracking-wide">Practice</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              
              <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-all duration-300 group relative">
                <span className="text-sm font-semibold tracking-wide">Leaderboard</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
              
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-all duration-300 group relative">
                <span className="text-sm font-semibold tracking-wide">About</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </Link>
            </nav>
          </div>
          
          {/* Mobile Navigation + User Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Navigation - Only icons */}
            <nav className={cn(
              "flex lg:hidden items-center gap-3 transition-all duration-300 ease-in-out",
              isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            )}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-all duration-300 p-2">
                    <Infinity className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Practice</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-all duration-300 p-2">
                    <BarChart3 className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Leaderboard</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-all duration-300 p-2">
                    <HelpCircle className="w-5 h-5" />
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