"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout/Layout"
import { TypingTest } from "@/components/typing-test/TypingTest"
import { TestConfig, TestConfigOptions } from "@/components/typing-test/TestConfig"

// Sample text for typing test
const sampleText = "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++."

export default function Home() {
  const [testConfig, setTestConfig] = useState<TestConfigOptions>({
    mode: "time",
    timeLimit: 30,
    wordCount: 25,
    quoteLength: "medium",
    difficulty: "medium",
    language: "english"
  })
  
  return (
    <Layout>
      <div className="container flex flex-col items-center px-4 py-8">
        {/* Test Configuration Component - Positioned Higher */}
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
            language={testConfig.language}
          />
        </div>
      </div>
    </Layout>
  )
}
