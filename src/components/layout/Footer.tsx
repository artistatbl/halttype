"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter, Shield, FileText, ExternalLink, MessageSquare, Maximize2 } from "lucide-react"
import { ThemeModal } from "../theme"
import { useFocus } from "../typing-test/FocusContext"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const { isFocused } = useFocus()
  
  return (
    <footer className={cn(
      "w-full bg-background",
      className
    )}>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Theme Selector - Left Side - Hidden in focus mode */}
          <div className={cn(
            "flex items-center transition-all duration-300 ease-in-out",
            isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
          )}>
            <ThemeModal />
          </div>
          
          {/* Center - Click to focus - Always visible */}
          <div className={cn(
            "flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border/50 transition-all duration-200 cursor-pointer backdrop-blur-sm",
            isFocused 
              ? "text-primary bg-primary/5 border-primary/20 hover:bg-primary/10" 
              : "text-muted-foreground bg-muted/30 hover:bg-muted/50 hover:text-foreground hover:border-border"
          )}>
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="font-medium">Click to focus</span>
          </div>
          
          {/* Social and Additional Links - Hidden in focus mode */}
          <div className={cn(
            "flex items-center gap-1 transition-all duration-300 ease-in-out",
            isFocused ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
          )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <FileText className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Terms</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/security" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <Shield className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Security</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <FileText className="w-4 h-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Privacy</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="w-px h-4 bg-border/50 mx-1" />
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <Github className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://twitter.com/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <Twitter className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Twitter</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://discord.gg/halttype" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-muted/50">
                  <MessageSquare className="w-4 h-4" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Discord</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  )
}