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
import { StructuredData } from "@/components/seo/SEOHead";
import { getBreadcrumbStructuredData } from "@/components/seo/StructuredData";
import { LanguageModal } from "@/components/typing-test/LanguageModal";

export default function Home() {
  // Use configuration storage hook for persistent settings
  const {
    testConfig,
    userSettings,
    updateTestConfig,
    updateUserSettings,
    isLoaded
  } = useConfigStorage();

  const [showSettings, setShowSettings] = useState(false);
  // Generate a unique ID for each page load to ensure new text on refresh
  const [testId] = useState(() => nanoid());

  // Get focus state
  const { isFocused } = useFocus();
  
  // Get current language
  const { currentLanguage } = useLanguage();

  // Memoize the text generation config to prevent infinite loops
  const textGenerationConfig = useMemo(() => ({
    mode: testConfig.mode,
    wordCount: testConfig.wordCount as 10 | 25 | 50 | 100,
    difficulty: testConfig.difficulty as 'easy' | 'medium' | 'hard',
    punctuation: testConfig.punctuation || false,
    numbers: testConfig.numbers || false,
    language: currentLanguage,
    sessionId: testId, // Use testId as session identifier
  }), [testConfig.mode, testConfig.wordCount, testConfig.difficulty, testConfig.punctuation, testConfig.numbers, currentLanguage, testId]);

  // Generate text based on current configuration
  const { currentText, regenerateText, isGenerating, error } = useTextGeneration(textGenerationConfig);

  // Show loading state while configuration is being loaded
  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-muted-foreground">Loading configuration...</div>
        </div>
      </Layout>
    );
  }

  // Breadcrumb structured data for SEO
  const breadcrumbData = getBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Typing Test', url: '/typing-test' }
  ]);

  return (
    <Layout>
      <StructuredData data={breadcrumbData} />
      
      {/* SEO Content - Hidden but crawlable */}
      <div className="sr-only">
        <h1>Free Online Typing Speed Test - Measure Your WPM and Accuracy</h1>
        <p>
          Welcome to HaltType, the best free online typing speed test. Test your typing speed 
          and accuracy with our comprehensive typing test that measures your WPM (words per minute), 
          tracks your typing accuracy, and provides detailed statistics to help you improve your 
          typing skills. Perfect for students, professionals, and anyone looking to enhance their 
          keyboard proficiency.
        </p>
        <h2>Features of Our Typing Test:</h2>
        <ul>
          <li>Real-time WPM (words per minute) calculation</li>
          <li>Accurate typing accuracy measurement</li>
          <li>Multiple test modes: time-based, word count, and quotes</li>
          <li>Difficulty levels from beginner to advanced</li>
          <li>Detailed typing statistics and progress tracking</li>
          <li>Clean, distraction-free interface</li>
          <li>No registration required - start typing immediately</li>
        </ul>
        <h2>Why Use HaltType for Typing Practice?</h2>
        <p>
          Our typing test is designed to provide accurate measurements of your typing speed 
          and help you improve your keyboard skills. Whether you're preparing for a job that 
          requires fast typing, studying for school, or just want to improve your computer 
          skills, HaltType provides the tools you need to succeed.
        </p>
      </div>
      
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
        >
          <div className="flex justify-center">
            <div className="bg-accent/20 rounded-md p-3 flex items-center gap-2">
              <LanguageModal />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="w-full mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
            Error generating text: {error}
          </div>
        )}
        
        {/* Fixed height container for typing test and restart button */}
        <div className="relative w-full">
          {isGenerating ? (
            <div className="w-full flex items-center justify-center py-8 min-h-[400px]">
              <div className="text-muted-foreground">Generating text...</div>
            </div>
          ) : (
            <div className="mt-8 min-h-[400px] flex flex-col">
              <div className="flex-1">
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
               <RotateCcw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
             </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}