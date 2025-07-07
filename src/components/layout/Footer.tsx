"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, Twitter, MessageCircle, HelpCircle, Shield, FileText, ExternalLink, Home, MessageSquare } from "lucide-react"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn(
      "w-full py-5 px-8 flex flex-wrap items-center justify-between bg-zinc-950/70 text-xs mt-10 mb-6 mx-auto max-w-[90%] rounded-xl shadow-md gap-y-4",
      className
    )}>
      {/* Navigation Links - Left Side */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <Home size={14} />
          <span>Home</span>
        </Link>
        
        <Link href="/contact" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <MessageCircle size={14} />
          <span>Contact</span>
        </Link>
        
        <Link href="/support" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <HelpCircle size={14} />
          <span>Support</span>
        </Link>
      </div>
      
      {/* Center - Click to focus (Desktop) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-zinc-500 text-xs bg-zinc-900/50 px-3 py-1.5 rounded-full shadow-sm hover:bg-zinc-900/70 hover:text-zinc-300 transition-all duration-200 cursor-pointer hidden md:flex">
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
      
      {/* Center - Click to focus (Mobile) */}
      <div className="w-full flex justify-center md:hidden order-last mt-3">
        <div className="text-zinc-500 text-xs bg-zinc-900/50 px-3 py-1.5 rounded-full shadow-sm hover:bg-zinc-900/70 hover:text-zinc-300 transition-all duration-200 cursor-pointer">
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
      
      {/* Social and Additional Links */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-end">
        <Link href="/terms" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <FileText size={14} />
          <span>Terms</span>
        </Link>
        
        <Link href="/security" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <Shield size={14} />
          <span>Security</span>
        </Link>
        
        <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <FileText size={14} />
          <span>Privacy</span>
        </Link>
        
        <a href="https://github.com/halttype" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <Github size={14} />
          <span>GitHub</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
        
        <a href="https://twitter.com/halttype" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <Twitter size={14} />
          <span>Twitter</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
        
        <a href="https://discord.gg/halttype" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
          <MessageSquare size={14} />
          <span>Discord</span>
          <ExternalLink size={10} className="opacity-70" />
        </a>
      </div>
    </footer>
  )
}