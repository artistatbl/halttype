"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout/Layout"
import { TypingTest } from "@/components/typing-test/TypingTest"
import { TestConfig, TestConfigOptions } from "@/components/typing-test/TestConfig"
import { Settings, UserSettings, defaultSettings } from "@/components/typing-test/Settings"
import { SettingsIcon } from "@/components/icons/settings"
import { useFocus } from "@/components/typing-test/FocusContext"

// Sample text for typing test
const sampleText = "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++."

export default function Home() {
  const [testConfig, setTestConfig] = useState<TestConfigOptions>({
    mode: "time",
    timeLimit: 30,
    wordCount: 25,
    quoteLength: "medium",
    difficulty: "medium",
    punctuation: false,
    numbers: false
  })
  
  const [userSettings, setUserSettings] = useState<UserSettings>(defaultSettings)
  const [showSettings, setShowSettings] = useState(false)
  
  // Get focus state
  const { isFocused } = useFocus()
  
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Settings Toggle Button - Hidden in focus mode */}
        <div className={cn(
          "w-full flex justify-end mb-3 transition-opacity duration-300",
          isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all rounded-md shadow-sm",
              showSettings
                ? "text-primary bg-muted/70"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Settings
          </button>
        </div>

        {/* Settings Panel - Hidden in focus mode */}
        {showSettings && (
          <div className={cn(
            "w-full mb-6 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}>
            <Settings
              settings={userSettings}
              onSettingsChange={setUserSettings}
              className="rounded-md shadow-sm"
            />
          </div>
        )}

        {/* Test Configuration Component - Hidden in focus mode */}
        <div className={cn(
          "w-full mb-10 transition-opacity duration-300",
          isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          <TestConfig 
            onConfigChange={setTestConfig}
            initialConfig={testConfig}
          />
        </div>

        {/* Main Typing Test Area - Monkeytype-style minimalistic design */}
        <div className="w-full ">
          <TypingTest 
            content={sampleText}
            testMode={testConfig.mode}
            timeLimit={testConfig.mode === "time" ? testConfig.timeLimit : undefined}
            wordCount={testConfig.mode === "words" ? testConfig.wordCount : undefined}
            difficulty={testConfig.difficulty}
            //className="max-w-3xl mx-auto"
          />
        </div>
      </div>
    </Layout>
  )
}
