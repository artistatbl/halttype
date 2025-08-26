"use client"

import Link from "next/link"
import Image from "next/image"
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
              <Image
                src="/logo.svg"
                alt="HaltType"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
                priority
              />
              <span className="text-xl font-bold">
          <span className="text-foreground">Halt</span>
            <span className="text-accent-foreground">type</span>
        </span>
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