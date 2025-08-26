import { Metadata } from 'next'

// Base site configuration
export const siteConfig = {
  name: 'HaltType',
  title: 'HaltType - Free Online Typing Speed Test',
  description: 'Test and improve your typing speed with HaltType. Free online typing test with multiple languages, customizable settings, and detailed statistics. Practice typing with words, quotes, or time-based tests.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com',
  ogImage: '/og-image.png',
  keywords: [
    'typing test',
    'typing speed test',
    'WPM test',
    'words per minute',
    'typing practice',
    'keyboard test',
    'typing skills',
    'online typing test',
    'free typing test',
    'typing accuracy',
    'typing game',
    'touch typing'
  ],
  authors: [{ name: 'HaltType Team' }],
  creator: 'HaltType',
  publisher: 'HaltType',
  category: 'Education'
}

// Generate base metadata
export function generateMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
  keywords,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
  keywords?: string[]
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url
  const metaKeywords = keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: siteConfig.category,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@halttype',
      site: '@halttype',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }
}

// JSON-LD structured data schemas
export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Typing speed test',
      'Multiple languages support',
      'Customizable test settings',
      'Real-time statistics',
      'Progress tracking',
      'Multiple test modes'
    ],
    screenshot: `${siteConfig.url}/screenshot.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    sameAs: [
      'https://github.com/halttype',
      'https://twitter.com/halttype'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English']
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Page-specific metadata generators
export const pageMetadata = {
  home: () => generateMetadata(),
  
  about: () => generateMetadata({
    title: 'About Us',
    description: 'Learn about HaltType, the free online typing speed test platform. Discover our mission to help users improve their typing skills with comprehensive testing tools.',
    url: '/about',
    keywords: ['about halttype', 'typing test platform', 'typing improvement']
  }),
  
  privacy: () => generateMetadata({
    title: 'Privacy Policy',
    description: 'Read HaltType\'s privacy policy to understand how we collect, use, and protect your personal information while using our typing test platform.',
    url: '/privacy',
    keywords: ['privacy policy', 'data protection', 'user privacy']
  }),
  
  terms: () => generateMetadata({
    title: 'Terms of Service',
    description: 'Review HaltType\'s terms of service and user agreement for using our free online typing speed test platform.',
    url: '/terms',
    keywords: ['terms of service', 'user agreement', 'terms and conditions']
  }),
  
  typingTest: (mode?: string) => generateMetadata({
    title: mode ? `${mode.charAt(0).toUpperCase() + mode.slice(1)} Typing Test` : 'Typing Test',
    description: `Take a ${mode || 'comprehensive'} typing speed test. Measure your WPM (words per minute) and accuracy with our free online typing test tool.`,
    keywords: [`${mode} typing test`, 'WPM test', 'typing speed', 'typing accuracy']
  })
}