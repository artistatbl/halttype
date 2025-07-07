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
      "w-full py-3 px-4 flex items-center justify-between bg-zinc-950 border-b border-zinc-800/30",
      className
    )}>
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-zinc-100 font-medium text-lg flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <span className="text-emerald-500 font-bold">monkey</span>
            <span>type</span>
          </Link>
        </div>
        
        {/* Icons - Minimal Navigation */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
              <span>Test</span>
            </Link>
            <Link href="/leaderboard" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><path d="M12 20v-6"></path><path d="M6 20V10"></path><path d="M18 20V4"></path></svg>
              <span>Leaderboard</span>
            </Link>
            <Link href="/about" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              <span>About</span>
            </Link>
          </div>
        </div>
        
        {/* User Menu */}
        <div className="flex items-center">
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}