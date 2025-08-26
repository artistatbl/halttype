// SEO Configuration and Environment Variables

export const seoConfig = {
  // Site URLs
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com',
  
  // Social Media
  social: {
    twitter: '@halttype',
    github: 'https://github.com/halttype',
    discord: process.env.NEXT_PUBLIC_DISCORD_URL,
  },
  
  // Analytics and Verification
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID,
    microsoftClarity: process.env.NEXT_PUBLIC_CLARITY_ID,
    hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },
  
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    pinterest: process.env.PINTEREST_VERIFICATION,
  },
  
  // SEO Features
  features: {
    enableJsonLd: true,
    enableOpenGraph: true,
    enableTwitterCards: true,
    enableBreadcrumbs: true,
    enableSitemap: true,
    enableRobots: true,
  },
  
  // Default Images
  images: {
    ogImage: '/og-image.png',
    twitterImage: '/twitter-image.png',
    favicon: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
    icon192: '/icon-192.png',
    icon512: '/icon-512.png',
  },
  
  // Content Settings
  content: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'],
    maxDescriptionLength: 160,
    maxTitleLength: 60,
  },
  
  // Performance
  performance: {
    enablePreconnect: true,
    enableDnsPrefetch: true,
    enableResourceHints: true,
  }
}

// Helper functions for SEO configuration
export function getCanonicalUrl(path: string = '') {
  return `${seoConfig.siteUrl}${path}`
}

export function getImageUrl(imagePath: string) {
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  return `${seoConfig.siteUrl}${imagePath}`
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength - 3) + '...'
}

export function generatePageTitle(title: string, includeAppName: boolean = true) {
  const appName = 'HaltType'
  if (!includeAppName) {
    return truncateText(title, seoConfig.content.maxTitleLength)
  }
  
  const fullTitle = `${title} | ${appName}`
  return truncateText(fullTitle, seoConfig.content.maxTitleLength)
}

export function generatePageDescription(description: string) {
  return truncateText(description, seoConfig.content.maxDescriptionLength)
}

// Language and locale helpers
export function getLanguageAlternates(currentPath: string) {
  return seoConfig.content.supportedLanguages.reduce((acc, lang) => {
    acc[lang] = `${seoConfig.siteUrl}/${lang}${currentPath}`
    return acc
  }, {} as Record<string, string>)
}

export function getHreflangTags(currentPath: string) {
  const alternates = getLanguageAlternates(currentPath)
  return Object.entries(alternates).map(([lang, url]) => ({
    hreflang: lang,
    href: url
  }))
}