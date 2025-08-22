"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter, MessageSquare, Keyboard, Globe } from "lucide-react"
import { ThemeModal } from "../theme"
import { LanguageModal } from "../typing-test/LanguageModal"
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
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
        )}>
          
          {/* Minimal Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Left Side - Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/halttype" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/halttype" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://discord.gg/halttype" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
                title="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
            
            {/* Center - Navigation Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                about
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                privacy
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                contact
              </Link>
            </div>
            
            {/* Right Side - Settings & Options */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <LanguageModal />
              </div>
              
              {/* Keyboard Layout - Placeholder for future implementation */}
              <button 
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors duration-200 p-1"
                title="Keyboard Layout (Coming Soon)"
                disabled
              >
                <Keyboard className="w-4 h-4" />
              </button>
              
              {/* Theme Selector */}
              <ThemeModal />
            </div>
            
          </div>
          
          {/* Mobile Copyright */}
          <div className="sm:hidden text-center mt-4 pt-4 border-t border-border/50">
            <span className="text-xs text-muted-foreground">© 2024 HaltType</span>
          </div>
        </div>
      </div>
      

     </footer>
  )
}