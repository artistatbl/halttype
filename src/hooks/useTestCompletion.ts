import { useCallback } from 'react';
import { TestResults } from '@/components/typing-test/TypingTest';
import { UseTypingTestStateReturn } from './useTypingTestState';
import { client } from '@/lib/client';

export interface UseTestCompletionProps {
  testMode: "time" | "words" | "quote";
  testId: string;
  state: UseTypingTestStateReturn['state'];
  actions: UseTypingTestStateReturn['actions'];
  elapsedTime?: number;
  onComplete?: (results: TestResults) => void;
  stopTimer?: () => void;
}

export interface UseTestCompletionReturn {
  completeTest: () => Promise<void>;
}

/**
 * Custom hook for handling test completion logic
 * Extracted from TypingTest component to improve maintainability
 */
export function useTestCompletion({
  testMode,
  testId,
  state,
  actions,
  elapsedTime,
  onComplete,
  stopTimer,
}: UseTestCompletionProps): UseTestCompletionReturn {
  
  const completeTest = useCallback(async () => {
    if (state.testState !== "running") return;
    
    actions.completeTest();
    
    // Stop elapsed timer for word-based tests
    if (testMode === "words" && stopTimer) {
      stopTimer();
    }
    
    // Calculate final results
    const timeSpent = testMode === "words" 
      ? elapsedTime || 0
      : ((state.endTime || Date.now()) - (state.startTime || Date.now())) / 1000;
    
    const wordsTyped = state.userInput.trim().split(/\s+/).length;
    const correctWords = wordsTyped - state.errors.length;
    const calculatedWpm = Math.round((wordsTyped / (timeSpent / 60)) || 0);
    const calculatedAccuracy = Math.round((correctWords / wordsTyped) * 100) || 0;
    const roundedTimeSpent = Math.round(timeSpent);
    
    const results: TestResults = {
      wpm: calculatedWpm,
      accuracy: calculatedAccuracy,
      timeSpent: roundedTimeSpent,
      wordsTyped,
      correctWords,
      incorrectWords: state.errors.length,
      keystrokes: state.keystrokes,
    };
    
    // Update final stats
    actions.updateStats(calculatedWpm, calculatedAccuracy);
    
    try {
      // Save the test result to the database
      await client.testResults.saveTestResult.$post({
        testId: testId,
        wpm: calculatedWpm,
        accuracy: calculatedAccuracy,
        timeSpent: roundedTimeSpent,
        wordsTyped,
        correctWords,
        incorrectWords: state.errors.length,
        keystrokes: state.keystrokes,
      });
    } catch (error) {
      console.error("Failed to save test result:", error);
    }
    
    // Call onComplete callback with results
    onComplete?.(results);
  }, [
    testMode,
    testId,
    state.testState,
    state.endTime,
    state.startTime,
    state.userInput,
    state.errors.length,
    state.keystrokes,
    actions,
    elapsedTime,
    onComplete,
    stopTimer,
  ]);
  
  return {
    completeTest,
  };
}