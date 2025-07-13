"use client"

import { cn } from "@/lib/utils"
import { useFocus } from "../typing-test/FocusContext"

interface GuideProps {
  className?: string
}

export function Guide({ className }: GuideProps) {
  const { isFocused } = useFocus()
  
  return (
    <section className={cn(
      "w-full bg-background transition-all duration-300 ease-in-out",
      isFocused ? "opacity-0 pointer-events-none translate-y-2" : "opacity-100 translate-y-0",
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-primary">
          <div className="flex flex-col items-center font-extralight gap-2 text-sm">
            <div className="flex items-center  gap-2">
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">Tab</kbd>
              <span className="text-primary">+</span>
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">Enter</kbd>
              <span className="text-primary font-extralight">restart test</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">Esc</kbd>
              <span className="text-primary">focus mode</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">Ctrl</kbd>
              <span className="text-primary">+</span>     
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">Shift</kbd>
              <span className="text-primary">+</span>
              <kbd className="px-2 py-1 bg-accent rounded text-xs ">P</kbd>
              <span className="text-primary">pause</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}