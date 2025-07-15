export const seoConfig = {
  siteName: 'HaltType',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com',
  defaultTitle: 'HaltType - Free Online Typing Speed Test | WPM Test & Typing Practice',
  defaultDescription: 'Test your typing speed and accuracy with HaltType\'s free online typing test. Measure your WPM (words per minute), track progress, and improve your typing skills with our interactive typing trainer.',
  
  // Core typing test keywords for better SEO
  coreKeywords: [
    'typing test',
    'typing speed test',
    'wpm test',
    'words per minute test',
    'typing practice',
    'keyboard test',
    'typing skills',
    'typing accuracy',
    'online typing test',
    'free typing test',
    'typing speed',
    'typing game',
    'typing trainer',
    'touch typing',
    'keyboard proficiency',
    'typing improvement',
    'typing assessment',
    'typing exercise',
    'typing lesson',
    'typing tutor'
  ],
  
  // Social media handles
  social: {
    twitter: '@halttype',
    github: 'https://github.com/halttype'
  },
  
  // Default Open Graph image
  defaultOgImage: '/opengraph-image.png',
  
  // Verification codes
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
  
  // Structured data organization info
  organization: {
    name: 'HaltType',
    description: 'Free online typing speed test and typing trainer',
    foundingDate: '2024',
    contactPoint: {
      contactType: 'customer service',
      availableLanguage: ['English']
    }
  }
}

// Common page configurations for different typing test related pages
export const pageConfigs = {
  home: {
    title: 'HaltType - Free Online Typing Speed Test | WPM Test & Typing Practice',
    description: 'Test your typing speed and accuracy with HaltType\'s free online typing test. Measure your WPM (words per minute), track progress, and improve your typing skills with our interactive typing trainer. Perfect for students, professionals, and anyone looking to enhance their keyboard proficiency.',
    keywords: seoConfig.coreKeywords
  },
  
  typingTest: {
    title: 'Typing Test - Free Online Typing Speed Test | HaltType',
    description: 'Take a free online typing test to measure your typing speed and accuracy. Our typing test provides real-time WPM calculation, detailed statistics, and helps improve your typing skills.',
    keywords: [
      'typing test',
      'online typing test',
      'free typing test',
      'typing speed test',
      'keyboard test',
      'typing assessment',
      'typing evaluation',
      'typing skills test'
    ]
  },
  
  speedTest: {
    title: 'Typing Speed Test - Measure Your WPM | HaltType',
    description: 'Test your typing speed with our free online typing speed test. Measure your WPM (words per minute), track your progress, and improve your keyboard typing speed.',
    keywords: [
      'typing speed test',
      'wpm test',
      'words per minute test',
      'typing speed',
      'keyboard speed test',
      'fast typing test',
      'typing velocity',
      'typing rate test'
    ]
  },
  
  wpmTest: {
    title: 'WPM Test - Words Per Minute Typing Test | HaltType',
    description: 'Take a free WPM test to measure your words per minute typing speed. Our accurate WPM calculator provides instant results and detailed typing statistics.',
    keywords: [
      'wpm test',
      'words per minute test',
      'wpm calculator',
      'words per minute calculator',
      'typing wpm',
      'wpm typing test',
      'wpm measurement',
      'typing speed wpm'
    ]
  }
}