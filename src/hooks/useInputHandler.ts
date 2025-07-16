import { useCallback } from 'react';
import { TestResults, TestMode } from '@/lib/typing-test/types';
import { UseTypingTestStateReturn } from './useTypingTestState';

export interface UseInputHandlerProps {
  content: string;
  testMode: TestMode;
  wordCount?: number;
  state: UseTypingTestStateReturn['state'];
  actions: UseTypingTestStateReturn['actions'];
  onTestStart?: () => void;
  onTestComplete?: () => void;
  countCompletedWords?: (input: string) => number;
  updateWordsCompleted?: (count: number) => void;
}

export interface UseInputHandlerReturn {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Custom hook for handling typing input logic
 * Extracted from TypingTest component to improve maintainability
 */
export function useInputHandler({
  content,
  testMode,
  wordCount,
  state,
  actions,
  onTestStart,
  onTestComplete,
  countCompletedWords,
  updateWordsCompleted,
}: UseInputHandlerProps): UseInputHandlerReturn {
  
  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Start test if not already started
    if (state.testState === "idle") {
      console.log('🎯 Starting test from input handler');
      actions.startTest();
      onTestStart?.();
    }
    
    // Update user input and position immediately for responsive UI
    actions.updateInput(input);
    actions.updatePosition(input.length);
    
    // Optimized error checking - only check new or modified characters
    const prevLength = state.userInput.length;
    
    if (input.length > prevLength) {
      // Adding characters - check only new ones
      for (let i = prevLength; i < input.length; i++) {
        if (input[i] !== content[i]) {
          actions.addError(i);
        }
      }
    } else if (input.length < prevLength) {
      // Removing characters - filter out errors beyond current position
      actions.removeErrorsAfter(input.length);
    }
    
    // Update word counter for word-based tests
    if (testMode === "words" && countCompletedWords && updateWordsCompleted) {
      const completedWords = countCompletedWords(input);
      updateWordsCompleted(completedWords);
    }
    
    // Record keystroke only for new characters
    if (input.length > prevLength) {
      const lastChar = input.charAt(input.length - 1);
      const expectedChar = content.charAt(input.length - 1);
      const isCorrect = expectedChar === lastChar;
      
      actions.addKeystroke({
        key: lastChar,
        timestamp: Date.now(),
        correct: isCorrect,
      });
    }
    
    // Check if test is complete based on test mode
    const shouldComplete = (
      // Complete if reached end of content
      input.length >= content.length ||
      // Complete if in words mode and reached word count
      (testMode === "words" && 
       wordCount && 
       countCompletedWords && 
       countCompletedWords(input) >= wordCount)
    );
    
    if (shouldComplete) {
      onTestComplete?.();
    }
  }, [
    content,
    testMode,
    wordCount,
    state.testState,
    state.userInput.length,
    actions,
    onTestStart,
    onTestComplete,
    countCompletedWords,
    updateWordsCompleted,
  ]);
  
  return {
    handleInput,
  };
}