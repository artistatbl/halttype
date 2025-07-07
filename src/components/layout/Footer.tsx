"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const [language, setLanguage] = useState("english")
  const [keyboardLayout, setKeyboardLayout] = useState("qwerty")
  
  return (
    <footer className={cn(
      "w-full py-2 px-4 flex items-center justify-between bg-zinc-950 text-xs border-t border-zinc-800/30",
      className
    )}>
      {/* Language and Settings */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 8 6 6"></path>
              <path d="m4 14 10-10 6 6-10 10-6-6z"></path>
            </svg>
            <span>{language}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="M6 8h.01"></path>
              <path d="M10 8h.01"></path>
              <path d="M14 8h.01"></path>
              <path d="M18 8h.01"></path>
              <path d="M8 12h.01"></path>
              <path d="M12 12h.01"></path>
              <path d="M16 12h.01"></path>
              <path d="M7 16h10"></path>
            </svg>
            <span>pb pace 86 wpm</span>
          </button>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="M6 8h.01"></path>
              <path d="M10 8h.01"></path>
              <path d="M14 8h.01"></path>
              <path d="M18 8h.01"></path>
              <path d="M8 12h.01"></path>
              <path d="M12 12h.01"></path>
              <path d="M16 12h.01"></path>
              <path d="M7 16h10"></path>
            </svg>
            <span>emulating qwerty</span>
          </button>
        </div>
      </div>
      
      {/* Center - Click to focus */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-zinc-600 text-xs">
        <span className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 19-4-4"></path>
            <path d="m19 5-4 4"></path>
            <path d="m5 19 4-4"></path>
            <path d="m5 5 4 4"></path>
          </svg>
          click here or press any key to focus
        </span>
      </div>
      
      {/* Links */}
      <div className="flex items-center gap-3">
        <Link href="/about" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs">
          about
        </Link>
        <Link href="/contact" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs">
          contact
        </Link>
        <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors text-xs">
          privacy
        </Link>
      </div>
    </footer>
  )
}