import { useState, useEffect, useCallback } from 'react';
import { configStorage, type StoredTestConfig, type StoredUserSettings } from '@/lib/storage/config-storage';
import type { TestConfigOptions } from '@/components/typing-test/TestConfig';
import type { UserSettings } from '@/components/typing-test/Settings';

export interface UseConfigStorageReturn {
  testConfig: TestConfigOptions;
  userSettings: UserSettings;
  updateTestConfig: (config: Partial<TestConfigOptions>) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  resetToDefaults: () => void;
  isLoaded: boolean;
}

/**
 * Hook for managing configuration with localStorage persistence
 */
export function useConfigStorage(): UseConfigStorageReturn {
  const [testConfig, setTestConfig] = useState<TestConfigOptions>(() => {
    // Load initial config from localStorage
    const stored = configStorage.getTestConfig();
    return {
      mode: stored.mode,
      timeLimit: stored.timeLimit,
      wordCount: stored.wordCount,
      quoteLength: stored.quoteLength,
      difficulty: stored.difficulty,
      punctuation: stored.punctuation,
      numbers: stored.numbers
    };
  });

  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    // Load initial settings from localStorage
    const stored = configStorage.getUserSettings();
    return {
      language: stored.language,
      keyboardLayout: stored.keyboardLayout,
      wpmDisplay: stored.wpmDisplay,
      theme: stored.theme,
      soundEnabled: stored.soundEnabled
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load configuration on mount
  useEffect(() => {
    try {
      const storedTestConfig = configStorage.getTestConfig();
      const storedUserSettings = configStorage.getUserSettings();

      setTestConfig({
        mode: storedTestConfig.mode,
        timeLimit: storedTestConfig.timeLimit,
        wordCount: storedTestConfig.wordCount,
        quoteLength: storedTestConfig.quoteLength,
        difficulty: storedTestConfig.difficulty,
        punctuation: storedTestConfig.punctuation,
        numbers: storedTestConfig.numbers
      });

      setUserSettings({
        theme: storedUserSettings.theme,
        fontSize: storedUserSettings.fontSize,
        fontFamily: storedUserSettings.fontFamily,
        soundEnabled: storedUserSettings.soundEnabled,
        showWPM: storedUserSettings.showWPM,
        showAccuracy: storedUserSettings.showAccuracy,
        showProgress: storedUserSettings.showProgress
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading configuration:', error);
      setIsLoaded(true); // Still mark as loaded even if there's an error
    }
  }, []);

  // Update test configuration
  const updateTestConfig = useCallback((newConfig: Partial<TestConfigOptions>) => {
    setTestConfig(prev => {
      const updated = { ...prev, ...newConfig };
      
      // Save to localStorage
      configStorage.saveTestConfig({
        mode: updated.mode,
        timeLimit: updated.timeLimit,
        wordCount: updated.wordCount,
        quoteLength: updated.quoteLength,
        difficulty: updated.difficulty,
        punctuation: updated.punctuation,
        numbers: updated.numbers
      });
      
      return updated;
    });
  }, []);

  // Update user settings
  const updateUserSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setUserSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Save to localStorage
      configStorage.saveUserSettings({
        theme: updated.theme,
        fontSize: updated.fontSize,
        fontFamily: updated.fontFamily,
        soundEnabled: updated.soundEnabled,
        showWPM: updated.showWPM,
        showAccuracy: updated.showAccuracy,
        showProgress: updated.showProgress
      });
      
      return updated;
    });
  }, []);

  // Reset to default configuration
  const resetToDefaults = useCallback(() => {
    configStorage.clearConfig();
    
    const defaultTestConfig = configStorage.getTestConfig();
    const defaultUserSettings = configStorage.getUserSettings();
    
    setTestConfig({
      mode: defaultTestConfig.mode,
      timeLimit: defaultTestConfig.timeLimit,
      wordCount: defaultTestConfig.wordCount,
      quoteLength: defaultTestConfig.quoteLength,
      difficulty: defaultTestConfig.difficulty,
      punctuation: defaultTestConfig.punctuation,
      numbers: defaultTestConfig.numbers
    });
    
    setUserSettings({
      theme: defaultUserSettings.theme,
      fontSize: defaultUserSettings.fontSize,
      fontFamily: defaultUserSettings.fontFamily,
      soundEnabled: defaultUserSettings.soundEnabled,
      showWPM: defaultUserSettings.showWPM,
      showAccuracy: defaultUserSettings.showAccuracy,
      showProgress: defaultUserSettings.showProgress
    });
  }, []);

  return {
    testConfig,
    userSettings,
    updateTestConfig,
    updateUserSettings,
    resetToDefaults,
    isLoaded
  };
}