"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserDropdown } from "./users/UserDropdown"
import { useFocus } from "../typing-test/FocusContext"


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
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-1 group">
              <span className="text-primary font-extrabold text-3xl tracking-tighter">halt</span>
              <span className="text-foreground/90 font-extrabold text-3xl tracking-tighter group-hover:text-primary transition-all duration-300">type</span>
            </Link>
            
            {/* Navigation Links - Removed as requested */}
          </div>
          
          {/* Mobile Navigation + User Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Navigation - Removed as requested */}
            
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