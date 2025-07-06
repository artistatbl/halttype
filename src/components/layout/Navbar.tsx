"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DropdownMenu } from "@/components/ui/dropdown-menu"

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const [testMode, setTestMode] = useState<"time" | "words" | "quote">("time")
  const [testLength, setTestLength] = useState<string>("30")
  
  return (
    <header className={cn(
      "w-full py-4 px-6 flex items-center justify-between bg-zinc-950/80 backdrop-blur-sm",
      className
    )}>
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-zinc-100 font-medium text-xl flex items-center gap-2">
          <span className="text-emerald-500 font-bold">halt</span>
          <span>type</span>
        </Link>
      </div>
      
      {/* Test Configuration */}
      <div className="flex items-center gap-4">
        {/* Test Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTestMode("time")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              testMode === "time" 
                ? "bg-zinc-800 text-zinc-100" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            time
          </button>
          <button
            onClick={() => setTestMode("words")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              testMode === "words" 
                ? "bg-zinc-800 text-zinc-100" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            words
          </button>
          <button
            onClick={() => setTestMode("quote")}
            className={cn(
              "px-3 py-1 text-sm rounded-md transition-colors",
              testMode === "quote" 
                ? "bg-zinc-800 text-zinc-100" 
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            quote
          </button>
        </div>
        
        {/* Test Length */}
        {testMode === "time" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTestLength("15")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "15" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              15
            </button>
            <button
              onClick={() => setTestLength("30")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "30" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              30
            </button>
            <button
              onClick={() => setTestLength("60")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "60" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              60
            </button>
            <button
              onClick={() => setTestLength("120")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "120" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              120
            </button>
          </div>
        )}
        
        {testMode === "words" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTestLength("10")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "10" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              10
            </button>
            <button
              onClick={() => setTestLength("25")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "25" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              25
            </button>
            <button
              onClick={() => setTestLength("50")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "50" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              50
            </button>
            <button
              onClick={() => setTestLength("100")}
              className={cn(
                "px-3 py-1 text-sm rounded-md transition-colors",
                testLength === "100" 
                  ? "bg-zinc-800 text-zinc-100" 
                  : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              100
            </button>
          </div>
        )}
      </div>
      
      {/* User Menu */}
      <div className="flex items-center gap-2">
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </header>
  )
}