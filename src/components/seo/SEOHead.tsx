import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  structuredData?: object
}

export function generateSEOMetadata({
  title = 'HaltType - Free Online Typing Speed Test | WPM Test',
  description = 'Test your typing speed and accuracy with HaltType. Free online typing test with real-time WPM calculation, accuracy tracking, and detailed statistics. Improve your typing skills today!',
  keywords = [
    'typing test',
    'typing speed test',
    'wpm test',
    'words per minute',
    'typing practice',
    'keyboard test',
    'typing skills',
    'typing accuracy',
    'online typing test',
    'free typing test',
    'typing speed',
    'typing game',
    'typing trainer',
    'touch typing'
  ],
  ogImage = '/og-image.png',
  canonicalUrl
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://halttype.com'
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'HaltType' }],
    creator: 'HaltType',
    publisher: 'HaltType',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: fullCanonicalUrl,
      siteName: 'HaltType',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullOgImage],
      creator: '@halttype',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}