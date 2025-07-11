"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout/Layout"
import { TypingTest } from "@/components/typing-test/TypingTest"
import { TestConfig, TestConfigOptions } from "@/components/typing-test/TestConfig"
import { Settings, UserSettings, defaultSettings } from "@/components/typing-test/Settings"
import { SettingsIcon } from "@/components/icons/settings"

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
  
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Settings Toggle Button */}
        <div className="w-full flex justify-end mb-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 text-xs transition-colors rounded",
              showSettings
                ? "text-primary bg-muted/70"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-full mb-6">
            <Settings
              settings={userSettings}
              onSettingsChange={setUserSettings}
            />
          </div>
        )}

        {/* Test Configuration Component */}
        <div className="w-full mb-8">
          <TestConfig 
            onConfigChange={setTestConfig}
            initialConfig={testConfig}
          />
        </div>

        {/* Main Typing Test Area - Monkeytype-style minimalistic design */}
        <div className="w-full">
          <TypingTest 
            content={sampleText}
            testMode={testConfig.mode}
            timeLimit={testConfig.mode === "time" ? testConfig.timeLimit : undefined}
            wordCount={testConfig.mode === "words" ? testConfig.wordCount : undefined}
            difficulty={testConfig.difficulty}
          />
        </div>
      </div>
    </Layout>
  )
}
