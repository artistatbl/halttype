export function getTypingTestStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'HaltType - Typing Speed Test',
    description: 'Free online typing speed test to measure your WPM (words per minute) and accuracy. Improve your typing skills with our interactive typing trainer.',
    url: baseUrl,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    permissions: 'browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Real-time WPM calculation',
      'Accuracy tracking',
      'Multiple test modes (time, words, quotes)',
      'Difficulty levels',
      'Detailed statistics',
      'Progress tracking'
    ],
    author: {
      '@type': 'Organization',
      name: 'HaltType'
    },
    publisher: {
      '@type': 'Organization',
      name: 'HaltType'
    }
  }
}

export function getWebsiteStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'HaltType',
    description: 'Free online typing speed test and typing trainer',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    sameAs: [
      'https://twitter.com/halttype',
      'https://github.com/halttype'
    ]
  }
}

export function getEducationalStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'Typing Speed Test and Training',
    description: 'Interactive typing test to improve typing speed and accuracy',
    educationalLevel: 'Beginner to Advanced',
    learningResourceType: 'Interactive Tool',
    teaches: [
      'Touch typing',
      'Typing speed improvement',
      'Keyboard proficiency',
      'Typing accuracy'
    ],
    timeRequired: 'PT1M',
    interactivityType: 'active',
    educationalUse: [
      'skill development',
      'practice',
      'assessment'
    ]
  }
}

export function getBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  }
}