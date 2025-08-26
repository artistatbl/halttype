"use client"

import Link from "next/link"
import Image from "next/image"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
        )}>
          
          {/* Clean Minimal Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
            
            {/* Left - Brand & Links */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="HaltType"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-bold">halttype</span>
              </Link>
              <div className="flex items-center gap-4 text-xs">
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Center - Copyright */}
            <div className="text-center">
              <span className="text-xs text-muted-foreground">© 2024 HaltType</span>
            </div>

            {/* Right - Social & Settings */}
            <div className="flex items-center gap-3">
              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a 
                  href="https://github.com/halttype" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com/halttype" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://discord.gg/halttype" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  title="Discord"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>

              {/* Settings */}
              <div className="flex items-center gap-2 border-l border-border/20 pl-3">
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <LanguageModal />
                </div>
                <button 
                  className="text-muted-foreground hover:text-foreground transition-colors p-1 opacity-50"
                  title="Keyboard Layout (Coming Soon)"
                  disabled
                >
                  <Keyboard className="w-4 h-4" />
                </button>
                <ThemeModal />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  )
}