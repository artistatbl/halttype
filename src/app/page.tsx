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
      <div className="container flex flex-col items-center px-4 py-8">
        {/* Settings Toggle Button */}
        <div className="w-full max-w-4xl flex justify-end mb-4">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded",
              showSettings
                ? "text-yellow-400 bg-zinc-800"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
            )}
          >
            <SettingsIcon className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-full mb-8">
            <Settings
              settings={userSettings}
              onSettingsChange={setUserSettings}
            />
          </div>
        )}

        {/* Test Configuration Component */}
        <div className="w-full mt-4 mb-12">
          <TestConfig 
            onConfigChange={setTestConfig}
            initialConfig={testConfig}
          />
        </div>

        {/* Main Typing Test Area */}
        <div className="w-full max-w-4xl">
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
