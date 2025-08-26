import { NextResponse } from 'next/server'
import { SitemapGenerator } from '@/lib/sitemap-generator'
import { seoConfig } from '@/lib/seo-config'

export function GET() {
  const generator = new SitemapGenerator(seoConfig.siteUrl)
  const now = new Date()

  // Add main pages
  generator.addUrls([
    {
      url: '/',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: '/typing-test',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: '/speed-test',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: '/wpm-test',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: '/about',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: '/privacy',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5
    },
    {
      url: '/terms',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5
    }
  ])

  // Add typing test variations
  const testModes = ['words', 'time', 'quote']
  testModes.forEach(mode => {
    generator.addUrl({
      url: `/${mode}-test`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    })
  })

  // Add language-specific typing tests
  const languages = ['english', 'spanish', 'french', 'german', 'italian', 'portuguese']
  languages.forEach(lang => {
    generator.addUrl({
      url: `/typing-test/${lang}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    })
  })

  const sitemap = generator.generateXML()
  
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    },
  })
}