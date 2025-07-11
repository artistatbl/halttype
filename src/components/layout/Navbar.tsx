"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserDropdown } from "./UserDropdown"

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={cn(
      "w-full py-5 px-8 flex flex-wrap items-center justify-between text-xs mt-6 mb-10 mx-auto max-w-[90%] gap-y-4 bg-background text-card-foreground",
      className
    )}>
      <div className="w-full flex flex-wrap items-center justify-between gap-y-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-foreground font-medium flex items-center gap-1 hover:text-primary transition-all duration-200">
            <span className="text-primary font-bold text-3xl">halt</span>
            <span className="text-3xl">type</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
              <span>Practice</span>
            </Link>
            <Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"></path><path d="M6 20V10"></path><path d="M18 20V4"></path></svg>
              <span>Leaderboard</span>
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              <span>About</span>
            </Link>
          </div>
        </div>
        
        {/* User Menu */}
        <div className="flex items-center gap-4">
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}