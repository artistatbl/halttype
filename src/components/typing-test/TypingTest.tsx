"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { TextDisplay } from "./TextDisplay"
import { StatsDisplay } from "./StatsDisplay"
import { WordCounter } from "./WordCounter"
import { useFocus } from "./FocusContext"
import { useCapsLock } from "./CapsLock"
import { useWordTest } from "@/hooks/useWordTest"
import { useElapsedTime } from "@/hooks/useElapsedTime"
import { client } from "@/lib/client"
import { nanoid } from "nanoid"

interface TypingTestProps {
  content: string
  timeLimit?: number // in seconds, undefined for unlimited
  wordCount?: number // for word mode, undefined for unlimited
  difficulty?: "easy" | "medium" | "hard"
  language?: string
  onComplete?: (results: TestResults) => void
  className?: string
  testMode?: "time" | "words" | "quote"
  testId?: string // ID of the test being taken
}

export interface TestResults {
  wpm: number
  accuracy: number
  timeSpent: number // in seconds (integer)
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
  wordCount = 25,
  difficulty = "medium",
  language = "english",
  onComplete,
  className,
  testMode = "time",
  testId = "default", // Default test ID if none provided
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
  
  // Use the capsLock hook instead of managing state directly
  const capsLockOn = useCapsLock()
  
  // Word test hook for word-based tests
  const { wordTestState, updateWordsCompleted, countCompletedWords, resetWordTest } = useWordTest(wordCount || 25)
  
  // Elapsed time hook for word-based tests
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useElapsedTime()
  
  // Stats
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Get focus context
  const { setFocused } = useFocus()
  
  // Start the test when user starts typing
  const startTest = async () => {
    if (testState === "idle") {
      setTestState("running")
      setStartTime(Date.now())
      setFocused(true) // Set focus mode when typing starts
      
      // Start elapsed timer for word-based tests
      if (testMode === "words") {
        startTimer()
      }
      
      try {
        // Call the API to record the test start
        await client.testResults.startTest.$post({
          testId: testId,
        })
      } catch (error) {
        // If there's an error, we still want the test to continue locally
        console.error("Failed to record test start:", error)
      }
    }
  }
  
  // Complete the test
  const completeTest = async () => {
    if (testState === "running") {
      setTestState("completed")
      setEndTime(Date.now())
      setFocused(false) // Exit focus mode when test completes
      
      // Stop elapsed timer for word-based tests
      if (testMode === "words") {
        stopTimer()
      }
      
      // Calculate final results
      const timeSpent = testMode === "words" 
        ? elapsedTime 
        : ((endTime || Date.now()) - (startTime || Date.now())) / 1000
      const wordsTyped = userInput.trim().split(/\s+/).length
      const correctWords = wordsTyped - errors.length
      const calculatedWpm = Math.round((wordsTyped / (timeSpent / 60)) || 0)
      const calculatedAccuracy = Math.round((correctWords / wordsTyped) * 100) || 0
      
      const roundedTimeSpent = Math.round(timeSpent);
      
      const results: TestResults = {
        wpm: calculatedWpm,
        accuracy: calculatedAccuracy,
        timeSpent: roundedTimeSpent,
        wordsTyped,
        correctWords,
        incorrectWords: errors.length,
        keystrokes,
      }
      
      try {
        // Save the test result to the database
        await client.testResults.saveTestResult.$post({
          testId: testId,
          wpm: calculatedWpm,
          accuracy: calculatedAccuracy,
          timeSpent: roundedTimeSpent, // Using the rounded integer value
          wordsTyped,
          correctWords,
          incorrectWords: errors.length,
          keystrokes,
        })
      } catch (error) {
        console.error("Failed to save test result:", error)
      }
      
      // Call onComplete callback with results
      onComplete?.(results)
    }
  }
  
  // Handle user input
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    
    // Start test if not already started
    if (testState === "idle") {
      await startTest()
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
    
    // Update word counter for word-based tests
    if (testMode === "words") {
      const completedWords = countCompletedWords(input)
      updateWordsCompleted(completedWords)
    }
    
    // Record keystroke
    const lastChar = input.charAt(input.length - 1)
    if (lastChar) {
      const expectedChar = content.charAt(input.length - 1)
      const isCorrect = expectedChar === lastChar
      setKeystrokes(prev => [
        ...prev,
        {
          key: lastChar,
          timestamp: Date.now(),
          correct: isCorrect,
        }
      ])
    }
    
    // Check if test is complete based on test mode
    if (
      // Complete if reached end of content
      input.length >= content.length ||
      // Complete if in words mode and reached word count
      (testMode === "words" && 
       wordCount && 
       countCompletedWords(input) >= wordCount)
    ) {
      completeTest()
    }
  }
  
  // Timer effect - only for time-based tests
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (testState === "running" && testMode === "time" && timeLimit) {
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
  }, [testState, startTime, timeLimit, testMode])
  
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
        "w-full flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 transition-all",
        className
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Hidden input field to capture typing - completely hidden from view */}
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleInput}
        className="opacity-0 absolute h-0 w-0 pointer-events-none"
        aria-label="Typing input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      
    
      
      {/* Timer display for time-based tests */}
      {testState === "running" && testMode === "time" && timeRemaining !== undefined && timeRemaining !== null && (
        <div className="w-full flex justify-start mb-2 sm:mb-4">
          <div className="text-sm sm:text-base md:text-lg font-mono text-primary/90 font-semibold bg-background/50 px-2 sm:px-3 py-1 rounded-md">
            {timeRemaining}s
          </div>
        </div>
      )}
      
      {/* Word counter for word-based tests */}
      {testState === "running" && testMode === "words" && (
        <div className="w-full mb-2 sm:mb-4">
          <WordCounter wordTestState={wordTestState} />
        </div>
      )}
      
      {/* Text display */}
      <TextDisplay 
        text={content}
        currentPosition={currentPosition}
        errors={errors}
        testState={testState}
        capsLockOn={capsLockOn}
        maxVisibleWords={wordCount && wordCount >= 50 ? 25 : 20} // Show more words for longer tests
       // className="bg-card/10 shadow-sm border border-muted/10"
      />
      
      {/* Stats display - only shown when test is completed */}
      {testState === "completed" && (
        <StatsDisplay 
          wpm={wpm}
          accuracy={accuracy}
          timeRemaining={timeRemaining}
          //className="mt-4 sm:mt-6 bg-card/5 p-3 rounded-md shadow-sm border border-muted/10"
        />
      )}
      
      {/* Test completed view */}
      {testState === "completed" && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card/90 p-4 sm:p-6 max-w-md w-full rounded-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-primary mb-4 sm:mb-6 text-center">Test Complete</h2>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="flex flex-col items-center">
                <p className="text-primary text-3xl sm:text-4xl md:text-5xl font-mono">{wpm}</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">wpm</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-foreground text-3xl sm:text-4xl md:text-5xl font-mono">{accuracy}%</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">accuracy</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-foreground text-3xl sm:text-4xl md:text-5xl font-mono">
                  {testMode === "words" 
                    ? `${elapsedTime}s`
                    : `${Math.round(((endTime || 0) - (startTime || 0)) / 100) / 10}s`
                  }
                </p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">time</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-foreground text-3xl sm:text-4xl md:text-5xl font-mono">{userInput.length}</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">chars</p>
              </div>
            </div>
            
            <div className="flex gap-2 sm:gap-3">
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
                  setFocused(false) // Ensure focus mode is off when resetting
                  
                  // Reset word test and elapsed timer for word-based tests
                  if (testMode === "words") {
                    resetWordTest()
                    resetTimer()
                  }
                  
                  inputRef.current?.focus()
                }}
                className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-muted/70 hover:bg-muted/90 text-foreground text-sm sm:text-base transition-colors rounded"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  // TODO: Navigate to new test
                }}
                className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-muted/70 hover:bg-muted/90 text-foreground text-sm sm:text-base transition-colors rounded"
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