"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter,  MessageSquare } from "lucide-react"
import { ThemeModal } from "../theme"
import { useFocus } from "../typing-test/FocusContext"



interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const { isFocused } = useFocus()
  
  return (
    <footer className={cn(
      "w-full",
      className
    )}>
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
        )}>
          
          {/* Single Line Minimal Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Left Side - Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://discord.gg/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            
            {/* Center - Legal Links & Copyright */}
            <div className="flex items-center gap-4 text-xs">
              <Link href="/terms" className="text-muted-foreground/60 hover:text-primary transition-all duration-300">
                Terms
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link href="/privacy" className="text-muted-foreground/60 hover:text-primary transition-all duration-300">
                Privacy
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link href="/privacy" className="text-muted-foreground/60 hover:text-primary transition-all duration-300">
                Privacy
              </Link>
              <span className="hidden sm:inline text-muted-foreground/30 mx-2">•</span>
              <span className="hidden sm:inline text-xs text-muted-foreground/50">© 2024 HaltType</span>
            </div>
            
            {/* Right Side - Theme Selector */}
            <div className="flex items-center">
              <ThemeModal />
            </div>
            
          </div>
          
          {/* Mobile Copyright */}
          <div className="sm:hidden text-center mt-2">
            <span className="text-xs text-muted-foreground/50">© 2024 HaltType</span>
          </div>
        </div>
      </div>
      

     </footer>
  )
}