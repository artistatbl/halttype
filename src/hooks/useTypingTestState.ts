import { useState, useCallback, useEffect } from 'react';
import { TestResults, TestState } from '@/lib/typing-test/types';

export interface TypingTestState {
  testState: TestState;
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number | null;
  currentPosition: number;
  userInput: string;
  errors: number[];
  keystrokes: TestResults["keystrokes"];
  wpm: number;
  accuracy: number;
}

export interface UseTypingTestStateReturn {
  state: TypingTestState;
  actions: {
    startTest: () => void;
    completeTest: () => void;
    resetTest: (timeLimit?: number) => void;
    updateInput: (input: string) => void;
    updatePosition: (position: number) => void;
    addError: (errorIndex: number) => void;
    removeErrorsAfter: (position: number) => void;
    addKeystroke: (keystroke: TestResults["keystrokes"][0]) => void;
    updateStats: (wpm: number, accuracy: number) => void;
    setTimeRemaining: (time: number) => void;
  };
}

/**
 * Custom hook for managing typing test state
 * Extracted from TypingTest component to improve maintainability
 */
export function useTypingTestState(initialTimeLimit?: number): UseTypingTestStateReturn {
  const [state, setState] = useState<TypingTestState>({
    testState: "idle",
    startTime: null,
    endTime: null,
    timeRemaining: initialTimeLimit || null,
    currentPosition: 0,
    userInput: "",
    errors: [],
    keystrokes: [],
    wpm: 0,
    accuracy: 100,
  });

  const startTest = useCallback(() => {
    setState(prev => ({
      ...prev,
      testState: "running",
      startTime: Date.now(),
      timeRemaining: initialTimeLimit || prev.timeRemaining,
    }));
  }, [initialTimeLimit]);

  const completeTest = useCallback(() => {
    setState(prev => ({
      ...prev,
      testState: "completed",
      endTime: Date.now(),
    }));
  }, []);

  const resetTest = useCallback((timeLimit?: number) => {
    const newTimeLimit = timeLimit || initialTimeLimit;
    setState({
      testState: "idle",
      startTime: null,
      endTime: null,
      timeRemaining: newTimeLimit || null,
      currentPosition: 0,
      userInput: "",
      errors: [],
      keystrokes: [],
      wpm: 0,
      accuracy: 100,
    });
  }, [initialTimeLimit]);

  const updateInput = useCallback((input: string) => {
    setState(prev => ({
      ...prev,
      userInput: input,
    }));
  }, []);

  const updatePosition = useCallback((position: number) => {
    setState(prev => ({
      ...prev,
      currentPosition: position,
    }));
  }, []);

  const addError = useCallback((errorIndex: number) => {
    setState(prev => ({
      ...prev,
      errors: [...prev.errors, errorIndex],
    }));
  }, []);

  const removeErrorsAfter = useCallback((position: number) => {
    setState(prev => ({
      ...prev,
      errors: prev.errors.filter(errorIndex => errorIndex < position),
    }));
  }, []);

  const addKeystroke = useCallback((keystroke: TestResults["keystrokes"][0]) => {
    setState(prev => ({
      ...prev,
      keystrokes: [...prev.keystrokes, keystroke],
    }));
  }, []);

  const updateStats = useCallback((wpm: number, accuracy: number) => {
    setState(prev => ({
      ...prev,
      wpm,
      accuracy,
    }));
  }, []);

  const setTimeRemaining = useCallback((time: number) => {
    setState(prev => ({
      ...prev,
      timeRemaining: time,
    }));
  }, []);

  // Update timeRemaining when initialTimeLimit changes and test is idle
  useEffect(() => {
    if (state.testState === "idle" && initialTimeLimit) {
      setState(prev => ({
        ...prev,
        timeRemaining: initialTimeLimit,
      }));
    }
  }, [initialTimeLimit, state.testState]);

  return {
    state,
    actions: {
      startTest,
      completeTest,
      resetTest,
      updateInput,
      updatePosition,
      addError,
      removeErrorsAfter,
      addKeystroke,
      updateStats,
      setTimeRemaining,
    },
  };
}