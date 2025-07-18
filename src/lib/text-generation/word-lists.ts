
// Most common English words (easy difficulty)
export const commonWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

// Medium difficulty words
export const mediumWords = [
  "through", "between", "another", "before", "great", "little", "world", "where", "much", "should",
  "system", "those", "both", "during", "place", "right", "government", "without", "thought", "school",
  "important", "until", "form", "food", "keep", "children", "feet", "land", "side", "enough",
  "almost", "let", "began", "night", "live", "might", "country", "help", "example", "while",
  "number", "each", "must", "before", "here", "different", "move", "right", "boy", "old",
  "too", "same", "tell", "does", "set", "three", "state", "never", "become", "between",
  "high", "really", "something", "most", "another", "much", "family", "own", "out", "leave",
  "put", "end", "why", "turn", "start", "every", "made", "need", "may", "call"
];

// Hard difficulty words (longer, less common)
export const hardWords = [
  "development", "environment", "management", "government", "information", "organization", "community", "technology", "experience", "education",
  "relationship", "understanding", "opportunity", "responsibility", "international", "administration", "communication", "transportation", "infrastructure", "implementation",
  "characteristic", "representative", "accommodation", "recommendation", "transformation", "investigation", "concentration", "consideration", "demonstration", "establishment",
  "programming", "algorithm", "database", "framework", "architecture", "methodology", "optimization", "authentication", "configuration", "documentation",
  "performance", "maintenance", "deployment", "integration", "specification", "requirement", "functionality", "compatibility", "accessibility", "reliability",
  "efficiency", "productivity", "creativity", "innovation", "collaboration", "communication", "presentation", "organization", "coordination", "supervision"
];

// Programming-related words for tech-focused tests
export const programmingWords = [
  "function", "variable", "array", "object", "string", "number", "boolean", "null", "undefined", "class",
  "method", "property", "parameter", "argument", "return", "import", "export", "module", "package", "library",
  "framework", "component", "interface", "abstract", "extends", "implements", "constructor", "prototype", "callback", "promise",
  "async", "await", "try", "catch", "throw", "error", "debug", "console", "log", "warn",
  "const", "let", "var", "if", "else", "switch", "case", "for", "while", "do",
  "break", "continue", "typeof", "instanceof", "new", "this", "super", "static", "public", "private"
];

export type WordDifficulty = 'easy' | 'medium' | 'hard' | 'programming';

/**
 * Get word list based on difficulty
 */
export function getWordsByDifficulty(difficulty: WordDifficulty): string[] {
  switch (difficulty) {
    case 'easy':
      return commonWords;
    case 'medium':
      return mediumWords;
    case 'hard':
      return hardWords;
    case 'programming':
      return programmingWords;
    default:
      return commonWords;
  }
}