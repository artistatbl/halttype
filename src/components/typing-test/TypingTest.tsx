"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { TextDisplay } from "./TextDisplay"
import { StatsDisplay } from "./StatsDisplay"
import { WordCounter } from "./WordCounter"
import { TestCompletionModal } from "./TestCompletionModal"
import { TestTimer } from "./TestTimer"
import { useFocus } from "./FocusContext"
import { useCapsLock } from "./CapsLock"
import { useWordTest } from "@/hooks/useWordTest"
import { useElapsedTime } from "@/hooks/useElapsedTime"
import { useTypingTestState } from "@/hooks/useTypingTestState"
import { useInputHandler } from "@/hooks/useInputHandler"
import { useTestCompletion } from "@/hooks/useTestCompletion"
import { calculateRealTimeWPM, calculateRealTimeAccuracy } from "@/lib/typing-test/calculations"
import { client } from "@/lib/client"

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
  // Custom hooks for state management
  const { state, actions } = useTypingTestState(timeLimit)
  const capsLockOn = useCapsLock()
  const { wordTestState, updateWordsCompleted, countCompletedWords, resetWordTest } = useWordTest(wordCount || 25)
  const { elapsedTime, startTimer, stopTimer, resetTimer } = useElapsedTime()
  const { setFocused } = useFocus()
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Handle test start
  const handleTestStart = () => {
    setFocused(true)
    actions.startTest()
    
    // Start elapsed timer for word-based tests
    if (testMode === "words") {
      startTimer()
    }
    
    // Call the API to record the test start (non-blocking)
    client.testResults.startTest.$post({
      testId: testId,
    }).catch(error => {
      console.error("Failed to record test start:", error)
    })
  }
  
  // Handle test completion
  const handleTestComplete = () => {
    setFocused(false)
    completeTest()
  }
  
  // Input handler hook
  const { handleInput } = useInputHandler({
    content,
    testMode,
    wordCount,
    state,
    actions,
    onTestStart: handleTestStart,
    onTestComplete: handleTestComplete,
    countCompletedWords,
    updateWordsCompleted,
  })
  
  // Test completion hook
  const { completeTest } = useTestCompletion({
    testMode,
    testId,
    state,
    actions,
    elapsedTime,
    onComplete,
    stopTimer,
  })
  
  // Timer effect - only for time-based tests
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    
    if (state.testState === "running" && testMode === "time" && timeLimit) {
      timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - (state.startTime || Date.now())) / 1000)
        const remaining = timeLimit - elapsed
        
        actions.setTimeRemaining(remaining >= 0 ? remaining : 0)
        
        if (remaining <= 0) {
          handleTestComplete()
          if (timer) clearInterval(timer)
        }
      }, 1000)
    }
    
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [state.testState, state.startTime, timeLimit, testMode, actions, handleTestComplete])
  
  // Calculate WPM and accuracy in real-time
  useEffect(() => {
    if (state.testState === "running" && state.startTime) {
      const currentWpm = calculateRealTimeWPM(state.userInput, state.startTime)
      const currentAccuracy = calculateRealTimeAccuracy(state.userInput, state.errors)
      
      actions.updateStats(currentWpm, currentAccuracy)
    }
  }, [state.userInput, state.startTime, state.testState, state.errors, actions])
  
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
        value={state.userInput}
        onChange={handleInput}
        className="opacity-0 absolute h-0 w-0 pointer-events-none"
        aria-label="Typing input"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      
    
      
      {/* Timer display for time-based tests */}
      <TestTimer
        timeRemaining={state.timeRemaining || 0}
        testMode={testMode}
        testState={state.testState}
      />
      
      {/* Word counter for word-based tests */}
      {state.testState === "running" && testMode === "words" && (
        <div className="w-full mb-2 sm:mb-4">
          <WordCounter wordTestState={wordTestState} />
        </div>
      )}
      
      {/* Text display */}
      <TextDisplay 
        text={content}
        currentPosition={state.currentPosition}
        errors={state.errors}
        testState={state.testState}
        capsLockOn={capsLockOn}
        maxVisibleWords={wordCount && wordCount >= 50 ? 25 : 20} // Show more words for longer tests
      />
      
      {/* Stats display - only shown when test is completed */}
      {state.testState === "completed" && (
        <StatsDisplay 
          wpm={state.wpm}
          accuracy={state.accuracy}
          timeRemaining={state.timeRemaining}
        />
      )}
      
      {/* Test completion modal */}
      <TestCompletionModal
        isOpen={state.testState === "completed"}
        wpm={state.wpm}
        accuracy={state.accuracy}
        timeSpent={testMode === "words" 
          ? elapsedTime 
          : Math.round(((state.endTime || 0) - (state.startTime || 0)) / 1000)
        }
        charactersTyped={state.userInput.length}
        testMode={testMode}
        onTryAgain={() => {
          actions.resetTest(timeLimit)
          setFocused(false)
          
          // Reset word test and elapsed timer for word-based tests
          if (testMode === "words") {
            resetWordTest()
            resetTimer()
          }
          
          inputRef.current?.focus()
        }}
        onNewTest={() => {
          // TODO: Navigate to new test
        }}
      />
    </div>
  )
}