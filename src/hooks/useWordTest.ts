import { useState, useEffect, useCallback } from 'react';
import { countCompletedWords as calculateCompletedWords } from '@/lib/typing-test/calculations';

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

  // Use the centralized word counting logic
  const countCompletedWords = useCallback((userInput: string) => {
    return calculateCompletedWords(userInput);
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