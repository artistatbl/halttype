"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";
import { TypingTest } from "@/components/typing-test/TypingTest";
import { TestConfig } from "@/components/typing-test/TestConfig";
import { useFocus } from "@/components/typing-test/FocusContext";
import { ActionButton } from "@/components/typing-test/ActionButton";
import { useTextGeneration } from "@/hooks/useTextGeneration";
import { useConfigStorage } from "@/hooks/useConfigStorage";
import { useLanguage } from "@/hooks/useLanguage";
import { RotateCcw } from "lucide-react";
import { nanoid } from "nanoid";


export default function Home() {
  // Use configuration storage hook for persistent settings
  const { testConfig, updateTestConfig } = useConfigStorage();

  const [testId] = useState(() => nanoid());

  // Get focus state
  const { isFocused } = useFocus();

  // Get current language
  const { currentLanguage } = useLanguage();

  // Memoize the text generation config to prevent infinite loops
  const textGenerationConfig = useMemo(
    () => ({
      mode: testConfig.mode,
      wordCount: testConfig.wordCount as 10 | 25 | 50 | 100,
      punctuation: testConfig.punctuation || false,
      numbers: testConfig.numbers || false,
      language: currentLanguage,
      sessionId: testId, // Use testId as session identifier
    }),
    [
      testConfig.mode,
      testConfig.wordCount,
      testConfig.punctuation,
      testConfig.numbers,
      currentLanguage,
      testId,
    ]
  );

  // Generate text based on current configuration
  const { currentText, regenerateText, isGenerating, error } =
    useTextGeneration(textGenerationConfig);

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-full mb-6 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <TestConfig
            onConfigChange={updateTestConfig}
            initialConfig={testConfig}
          />
        </div>

        {/* Text Display Language Selector - Independent of test config */}
        <div
          className={cn(
            "w-full max-w-3xl mx-auto mb-4 transition-opacity duration-300",
            isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        ></div>
        {error && (
          <div className="w-full mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
            Error generating text: {error}
          </div>
        )}

        {/* Fixed height container for typing test and restart button */}
        <div className="relative w-full">
          {isGenerating ? (
            <div className="w-full flex items-center justify-center py-6 min-h-[300px]">
              <div className="text-muted-foreground">Generating text...</div>
            </div>
          ) : (
            <div className="mt-6 min-h-[300px] flex flex-col">
              <div className="flex-1">
                <TypingTest
                  content={currentText}
                  testMode={testConfig.mode}
                  timeLimit={
                    testConfig.mode === "time"
                      ? testConfig.timeLimit
                      : undefined
                  }
                  wordCount={
                    testConfig.mode === "words"
                      ? testConfig.wordCount
                      : undefined
                  }
                />
              </div>
            </div>
          )}

          {/* Fixed position restart button */}
          <div
            className={cn(
              "absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-300",
              isFocused ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ActionButton
              onClick={regenerateText}
              disabled={isGenerating}
              className={cn(
                "p-2 transition-all rounded-md",
                "text-muted-foreground hover:text-foreground ",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              tooltip="Restart Test"
            >
              <RotateCcw
                className={cn("w-4 h-4", isGenerating && "animate-spin")}
              />
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}
