/**
 * Configuration storage service using localStorage
 * Handles persistence of user preferences and test configurations
 */

export interface StoredTestConfig {
  mode: 'time' | 'words' | 'quote';
  timeLimit: number;
  wordCount: 10 | 25 | 50 | 100;
  quoteLength: 'short' | 'medium' | 'long';
  difficulty: 'easy' | 'medium' | 'hard';
  punctuation: boolean;
  numbers: boolean;
}

export interface StoredUserSettings {
  language: string;
  keyboardLayout: string;
  wpmDisplay: 'live' | 'end' | 'both';
  theme: string; // Support any theme name from theme-config
  soundEnabled: boolean;
}

export interface StoredConfig {
  testConfig: StoredTestConfig;
  userSettings: StoredUserSettings;
  lastUpdated: number;
}

class ConfigStorageService {
  private static instance: ConfigStorageService;
  private readonly STORAGE_KEY = 'halttype-config';
  private readonly VERSION = '1.0.0';

  private constructor() {}

  static getInstance(): ConfigStorageService {
    if (!ConfigStorageService.instance) {
      ConfigStorageService.instance = new ConfigStorageService();
    }
    return ConfigStorageService.instance;
  }

  /**
   * Default configuration values
   */
  private getDefaultConfig(): StoredConfig {
    return {
      testConfig: {
        mode: 'time',
        timeLimit: 30,
        wordCount: 25,
        quoteLength: 'medium',
        difficulty: 'medium',
        punctuation: false,
        numbers: false
      },
      userSettings: {
        language: 'english',
        keyboardLayout: 'qwerty',
        wpmDisplay: 'live',
        theme: 'halt',
        soundEnabled: false
      },
      lastUpdated: Date.now()
    };
  }

  /**
   * Check if localStorage is available
   */
  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Load configuration from localStorage
   */
  loadConfig(): StoredConfig {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage not available, using default config');
      return this.getDefaultConfig();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return this.getDefaultConfig();
      }

      const parsed = JSON.parse(stored);
      
      // Validate and merge with defaults to handle missing properties
      const defaultConfig = this.getDefaultConfig();
      const mergedConfig: StoredConfig = {
        testConfig: { ...defaultConfig.testConfig, ...parsed.testConfig },
        userSettings: { ...defaultConfig.userSettings, ...parsed.userSettings },
        lastUpdated: parsed.lastUpdated || Date.now()
      };

      return mergedConfig;
    } catch (error) {
      console.error('Error loading config from localStorage:', error);
      return this.getDefaultConfig();
    }
  }

  /**
   * Save configuration to localStorage
   */
  saveConfig(config: Partial<StoredConfig>): void {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage not available, cannot save config');
      return;
    }

    try {
      const currentConfig = this.loadConfig();
      const updatedConfig: StoredConfig = {
        ...currentConfig,
        ...config,
        lastUpdated: Date.now()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedConfig));
    } catch (error) {
      console.error('Error saving config to localStorage:', error);
    }
  }

  /**
   * Save only test configuration
   */
  saveTestConfig(testConfig: Partial<StoredTestConfig>): void {
    const currentConfig = this.loadConfig();
    this.saveConfig({
      testConfig: { ...currentConfig.testConfig, ...testConfig }
    });
  }

  /**
   * Save only user settings
   */
  saveUserSettings(userSettings: Partial<StoredUserSettings>): void {
    const currentConfig = this.loadConfig();
    this.saveConfig({
      userSettings: { ...currentConfig.userSettings, ...userSettings }
    });
  }

  /**
   * Get only test configuration
   */
  getTestConfig(): StoredTestConfig {
    return this.loadConfig().testConfig;
  }

  /**
   * Get only user settings
   */
  getUserSettings(): StoredUserSettings {
    return this.loadConfig().userSettings;
  }

  /**
   * Clear all stored configuration
   */
  clearConfig(): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing config from localStorage:', error);
    }
  }

  /**
   * Export configuration as JSON string
   */
  exportConfig(): string {
    const config = this.loadConfig();
    return JSON.stringify(config, null, 2);
  }

  /**
   * Import configuration from JSON string
   */
  importConfig(configJson: string): boolean {
    try {
      const config = JSON.parse(configJson);
      this.saveConfig(config);
      return true;
    } catch (error) {
      console.error('Error importing config:', error);
      return false;
    }
  }
}

// Export singleton instance
export const configStorage = ConfigStorageService.getInstance();
export { ConfigStorageService };