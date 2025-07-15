import { useState, useEffect, useCallback } from 'react';

export interface WordTestState {
  wordsCompleted: number;
  wordsRemaining: number;
  totalWords: number;
  isComplete: boolean;
}

export interface UseWordTestReturn {
  wordTestState: WordTestState;
  updateWordsCompleted: (completedWords: number) => void;
  countCompletedWords: (userInput: string) => number;
  resetWordTest: () => void;
}

/**
 * Hook for managing word-based typing tests
 * Provides word counter functionality instead of timer
 */
export function useWordTest(targetWordCount: number): UseWordTestReturn {
  const [wordTestState, setWordTestState] = useState<WordTestState>({
    wordsCompleted: 0,
    wordsRemaining: targetWordCount,
    totalWords: targetWordCount,
    isComplete: false
  });

  // Update words completed and calculate remaining
  const updateWordsCompleted = useCallback((completedWords: number) => {
    setWordTestState(prev => {
      const remaining = Math.max(0, prev.totalWords - completedWords);
      const isComplete = completedWords >= prev.totalWords;
      
      return {
        ...prev,
        wordsCompleted: completedWords,
        wordsRemaining: remaining,
        isComplete
      };
    });
  }, []);

  // Count completed words based on spaces typed
  const countCompletedWords = useCallback((userInput: string) => {
    // Count words that are followed by a space (completed words)
    const words = userInput.split(' ');
    // If input ends with space, all words are completed
    // If input doesn't end with space, exclude the last word as it's still being typed
    return userInput.endsWith(' ') ? words.length - 1 : Math.max(0, words.length - 1);
  }, []);

  // Reset word test state
  const resetWordTest = useCallback(() => {
    setWordTestState({
      wordsCompleted: 0,
      wordsRemaining: targetWordCount,
      totalWords: targetWordCount,
      isComplete: false
    });
  }, [targetWordCount]);

  // Update state when target word count changes
  useEffect(() => {
    setWordTestState(prev => ({
      ...prev,
      totalWords: targetWordCount,
      wordsRemaining: Math.max(0, targetWordCount - prev.wordsCompleted)
    }));
  }, [targetWordCount]);

  return {
    wordTestState,
    updateWordsCompleted,
    countCompletedWords,
    resetWordTest
  };
}