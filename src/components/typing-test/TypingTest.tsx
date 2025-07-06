"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { TextDisplay } from "./TextDisplay"
import { StatsDisplay } from "./StatsDisplay"

interface TypingTestProps {
  content: string
  timeLimit?: number // in seconds, undefined for unlimited
  difficulty?: "easy" | "medium" | "hard"
  language?: string
  onComplete?: (results: TestResults) => void
  className?: string
}

export interface TestResults {
  wpm: number
  accuracy: number
  timeSpent: number // in seconds
  wordsTyped: number
  correctWords: number
  incorrectWords: number
  keystrokes: {
    key: string
    timestamp: number
    correct: boolean
  }[]
}

export function TypingTest({
  content,
  timeLimit = 30,
  difficulty = "medium",
  language = "english",
  onComplete,
  className,
}: TypingTestProps) {
  // Test state
  const [testState, setTestState] = useState<"idle" | "running" | "completed">("idle")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeLimit || null)
  
  // Typing state
  const [currentPosition, setCurrentPosition] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [errors, setErrors] = useState<number[]>([])
  const [keystrokes, setKeystrokes] = useState<TestResults["keystrokes"]>([])
  
  // Stats
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Start the test when user starts typing
  const startTest = () => {
    if (testState === "idle") {
      setTestState("running")
      setStartTime(Date.now())
    }
  }
  
  // Complete the test
  const completeTest = () => {
    if (testState === "running") {
      setTestState("completed")
      setEndTime(Date.now())
      
      // Calculate final results
      const timeSpent = ((endTime || Date.now()) - (startTime || Date.now())) / 1000
      const wordsTyped = userInput.trim().split(/\s+/).length
      const correctWords = wordsTyped - errors.length
      
      const results: TestResults = {
        wpm: Math.round((wordsTyped / timeSpent) * 60),
        accuracy: Math.round((correctWords / wordsTyped) * 100) || 0,
        timeSpent,
        wordsTyped,
        correctWords,
        incorrectWords: errors.length,
        keystrokes,
      }
      
      // Call onComplete callback with results
      onComplete?.(results)
    }
  }
  
  // Handle user input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    
    // Start test if not already started
    if (testState === "idle") {
      startTest()
    }
    
    // Update user input
    setUserInput(input)
    
    // Check for errors
    const newErrors: number[] = []
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== content[i]) {
        newErrors.push(i)
      }
    }
    setErrors(newErrors)
    
    // Update current position
    setCurrentPosition(input.length)
    
    // Record keystroke
    const lastChar = input.charAt(input.length - 1)
    if (lastChar) {
      const isCorrect = content.charAt(currentPosition) === lastChar
      setKeystrokes(prev => [
        ...prev,
        {
          key: lastChar,
          timestamp: Date.now(),
          correct: isCorrect,
        }
      ])
    }
    
    // Check if test is complete
    if (input.length >= content.length) {
      completeTest()
    }
  }
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (testState === "running" && timeLimit) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (startTime || Date.now())) / 1000)
        const remaining = timeLimit - elapsed
        
        setTimeRemaining(remaining >= 0 ? remaining : 0)
        
        if (remaining <= 0) {
          completeTest()
          if (timer) clearInterval(timer)
        }
      }, 1000)
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [testState, startTime, timeLimit])
  
  // Calculate WPM and accuracy in real-time
  useEffect(() => {
    if (testState === "running" && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60 // in minutes
      const wordsTyped = userInput.trim().split(/\s+/).length
      
      // Calculate WPM
      const currentWpm = Math.round(wordsTyped / timeElapsed) || 0
      setWpm(currentWpm)
      
      // Calculate accuracy
      const correctChars = userInput.length - errors.length
      const currentAccuracy = Math.round((correctChars / userInput.length) * 100) || 100
      setAccuracy(currentAccuracy)
    }
  }, [userInput, startTime, testState, errors])
  
  // Focus input on mount and when clicked anywhere
  useEffect(() => {
    inputRef.current?.focus()
    
    const handleClick = () => {
      inputRef.current?.focus()
    }
    
    document.addEventListener("click", handleClick)
    
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])
  
  return (
    <div 
      className={cn(
        "w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-8",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden input field to capture typing */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInput}
        className="opacity-0 absolute h-0 w-0"
        aria-label="Typing input"
      />
      
      {/* Text display */}
      <TextDisplay 
        text={content}
        currentPosition={currentPosition}
        errors={errors}
      />
      
      {/* Stats display */}
      <StatsDisplay 
        wpm={wpm}
        accuracy={accuracy}
        timeRemaining={timeRemaining}
      />
      
      {/* Test completed view */}
      {testState === "completed" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6">Test Complete</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-zinc-400 text-sm">WPM</p>
                <p className="text-3xl font-mono text-zinc-100">{wpm}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Accuracy</p>
                <p className="text-3xl font-mono text-zinc-100">{accuracy}%</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Time</p>
                <p className="text-3xl font-mono text-zinc-100">
                  {((endTime || 0) - (startTime || 0)) / 1000}s
                </p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Characters</p>
                <p className="text-3xl font-mono text-zinc-100">{userInput.length}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setTestState("idle")
                  setUserInput("")
                  setCurrentPosition(0)
                  setErrors([])
                  setKeystrokes([])
                  setStartTime(null)
                  setEndTime(null)
                  setTimeRemaining(timeLimit || null)
                  setWpm(0)
                  setAccuracy(100)
                  inputRef.current?.focus()
                }}
                className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-md transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  // TODO: Navigate to new test
                }}
                className="flex-1 py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-md transition-colors"
              >
                New Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}