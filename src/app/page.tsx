"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { TypingTest } from "@/components/typing-test/TypingTest";
import {
  TestConfig,
  TestConfigOptions,
} from "@/components/typing-test/TestConfig";
import {
  Settings,
  UserSettings,
  defaultSettings,
} from "@/components/typing-test/Settings";
import { SettingsIcon } from "@/components/icons/settings";
import { useFocus } from "@/components/typing-test/FocusContext";
import { useTextGeneration } from "@/components/typing-test/useTextGeneration";
import { nanoid } from "nanoid";

export default function Home() {
  const [testConfig, setTestConfig] = useState<TestConfigOptions>({
    mode: "time",
    timeLimit: 30,
    wordCount: 25,
    quoteLength: "medium",
    difficulty: "medium",
    punctuation: false,
    numbers: false,
  });

  const [userSettings, setUserSettings] =
    useState<UserSettings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [testId] = useState(() => nanoid());

  // Get focus state
  const { isFocused } = useFocus();

  // Memoize the text generation config to prevent infinite loops
  const textGenerationConfig = useMemo(() => ({
    mode: testConfig.mode,
    wordCount: testConfig.wordCount as 10 | 25 | 50 | 100,
    difficulty: testConfig.difficulty as 'easy' | 'medium' | 'hard',
    punctuation: testConfig.punctuation || false,
    numbers: testConfig.numbers || false,
  }), [testConfig.mode, testConfig.wordCount, testConfig.difficulty, testConfig.punctuation, testConfig.numbers]);

  // Generate text based on current configuration
  const { currentText, regenerateText, isGenerating, error } = useTextGeneration(textGenerationConfig);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-full flex justify-end mb-3 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
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
          <div
            className={cn(
              "w-full mb-6 transition-opacity duration-300",
              isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <Settings
              settings={userSettings}
              onSettingsChange={setUserSettings}
              className="rounded-md shadow-sm"
            />
          </div>
        )}
        
        <div
          className={cn(
            "w-full mb-6 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <TestConfig
            onConfigChange={setTestConfig}
            initialConfig={testConfig}
          />
        </div>
        
        {/* Regenerate Text Button */}
        <div
          className={cn(
            "w-full mb-4 flex justify-center transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <button
            onClick={regenerateText}
            disabled={isGenerating}
            className={cn(
              "px-4 py-2 text-sm transition-all rounded-md",
              "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isGenerating ? "Generating..." : "🔄 New Text"}
          </button>
        </div>
        {error && (
          <div className="w-full mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
            Error generating text: {error}
          </div>
        )}
        
        {isGenerating ? (
          <div className="w-full flex items-center justify-center py-8">
            <div className="text-muted-foreground">Generating text...</div>
          </div>
        ) : (
          <TypingTest
            content={currentText}
            testMode={testConfig.mode}
            timeLimit={
              testConfig.mode === "time" ? testConfig.timeLimit : undefined
            }
            wordCount={
              testConfig.mode === "words" ? testConfig.wordCount : undefined
            }
            difficulty={testConfig.difficulty}
            testId={testId}
            key={`${testId}-${currentText.slice(0, 20)}`} // Force re-render when text changes
          />
        )}
      </div>
    </Layout>
  );
}
