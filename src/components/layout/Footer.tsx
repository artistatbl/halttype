"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter, Shield, FileText, ExternalLink, MessageSquare } from "lucide-react"
import { ThemeModal } from "../theme"
import { useFocus } from "../typing-test/FocusContext"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const { isFocused } = useFocus()
  
  return (
    <footer className={cn(
      "w-full py-5 px-8 flex flex-wrap items-center justify-between text-xs mt-10 mb-6 mx-auto max-w-[90%]  gap-y-4 bg-background text-card-foreground",
      className
    )}>
      {/* Theme Selector - Left Side - Hidden in focus mode */}
      <div className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 transition-opacity duration-300",
        isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <ThemeModal />
      </div>
      
      {/* Center - Click to focus (Desktop) - Always visible */}
      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2 text-xs px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer hidden md:flex",
        isFocused 
          ? "text-primary bg-muted/70 hover:bg-muted/90" 
          : "text-muted-foreground bg-muted/50 hover:bg-muted/70 hover:text-foreground"
      )}>
        <span className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 19-4-4"></path>
            <path d="m19 5-4 4"></path>
            <path d="m5 19 4-4"></path>
            <path d="m5 5 4 4"></path>
          </svg>
          click to focus
        </span>
      </div>
      
      {/* Center - Click to focus (Mobile) - Always visible */}
      <div className="w-full flex justify-center md:hidden order-last mt-3">
        <div className={cn(
          "text-xs px-3 py-1.5 rounded-full shadow-sm transition-all duration-200 cursor-pointer",
          isFocused 
            ? "text-primary bg-muted/70 hover:bg-muted/90" 
            : "text-muted-foreground bg-muted/50 hover:bg-muted/70 hover:text-foreground"
        )}>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m19 19-4-4"></path>
              <path d="m19 5-4 4"></path>
              <path d="m5 19 4-4"></path>
              <path d="m5 5 4 4"></path>
            </svg>
            click to focus
          </span>
        </div>
      </div>
      
      {/* Social and Additional Links - Hidden in focus mode */}
      <div className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 justify-end transition-opacity duration-300",
        isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <FileText size={14} />
          <span>Terms</span>
        </Link>
        
        <Link href="/security" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <Shield size={14} />
          <span>Security</span>
        </Link>
        
        <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <FileText size={14} />
          <span>Privacy</span>
        </Link>
        
        <a href="https://github.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <Github size={14} />
          <span>GitHub</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
        
        <a href="https://twitter.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <Twitter size={14} />
          <span>Twitter</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
        
        <a href="https://discord.gg/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1.5">
          <MessageSquare size={14} />
          <span>Discord</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
      </div>
    </footer>
  )
}