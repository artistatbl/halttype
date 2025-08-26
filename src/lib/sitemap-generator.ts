import { seoConfig } from './seo-config'

interface SitemapUrl {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  alternateLanguages?: Record<string, string>
}

interface SitemapOptions {
  includeLanguageAlternates?: boolean
  includeImages?: boolean
  includeVideos?: boolean
}

export class SitemapGenerator {
  private baseUrl: string
  private urls: SitemapUrl[] = []

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || seoConfig.siteUrl
  }

  addUrl(urlData: SitemapUrl) {
    this.urls.push({
      ...urlData,
      url: this.normalizeUrl(urlData.url)
    })
    return this
  }

  addUrls(urlsData: SitemapUrl[]) {
    urlsData.forEach(url => this.addUrl(url))
    return this
  }

  private normalizeUrl(url: string): string {
    if (url.startsWith('http')) {
      return url
    }
    const baseUrl = this.baseUrl || seoConfig.siteUrl
    return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
  }

  private formatDate(date: Date): string {
    const datePart = date.toISOString().split('T')[0];
    if (!datePart) {
      throw new Error('Failed to format date');
    }
    return datePart;
  }

  generateXML(options: SitemapOptions = {}): string {
    const { includeLanguageAlternates = false } = options

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
    
    if (includeLanguageAlternates) {
      xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    }
    
    xml += '>\n'

    this.urls.forEach(urlData => {
      xml += '  <url>\n'
      xml += `    <loc>${this.escapeXml(urlData.url)}</loc>\n`
      
      if (urlData.lastModified) {
        xml += `    <lastmod>${this.formatDate(urlData.lastModified)}</lastmod>\n`
      }
      
      if (urlData.changeFrequency) {
        xml += `    <changefreq>${urlData.changeFrequency}</changefreq>\n`
      }
      
      if (urlData.priority !== undefined) {
        xml += `    <priority>${urlData.priority.toFixed(1)}</priority>\n`
      }
      
      // Add language alternates
      if (includeLanguageAlternates && urlData.alternateLanguages) {
        Object.entries(urlData.alternateLanguages).forEach(([lang, altUrl]) => {
          xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${this.escapeXml(altUrl)}" />\n`
        })
      }
      
      xml += '  </url>\n'
    })

    xml += '</urlset>'
    return xml
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  // Static method to generate default sitemap
  static generateDefault(): string {
    const generator = new SitemapGenerator()
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

    // Add language-specific pages
    const languages = ['english', 'spanish', 'french', 'german', 'italian']
    languages.forEach(lang => {
      generator.addUrl({
        url: `/typing-test/${lang}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6
      })
    })

    return generator.generateXML()
  }

  // Generate sitemap index for large sites
  static generateSitemapIndex(sitemaps: Array<{ url: string; lastModified?: Date }>): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    sitemaps.forEach(sitemap => {
      xml += '  <sitemap>\n'
      xml += `    <loc>${sitemap.url}</loc>\n`
      if (sitemap.lastModified) {
        xml += `    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>\n`
      }
      xml += '  </sitemap>\n'
    })

    xml += '</sitemapindex>'
    return xml
  }
}

// Helper function to generate robots.txt content
export function generateRobotsTxt(options: {
  sitemapUrl?: string
  disallowPaths?: string[]
  allowPaths?: string[]
  crawlDelay?: number
  userAgent?: string
} = {}): string {
  const {
    sitemapUrl = `${seoConfig.siteUrl}/sitemap.xml`,
    disallowPaths = ['/api/', '/admin/', '/_next/', '/static/'],
    allowPaths = ['/about', '/privacy', '/terms'],
    crawlDelay = 1,
    userAgent = '*'
  } = options

  let robotsTxt = `# Robots.txt for ${seoConfig.siteUrl}\n\n`
  robotsTxt += `User-agent: ${userAgent}\n`
  robotsTxt += 'Allow: /\n\n'

  // Add disallow rules
  if (disallowPaths.length > 0) {
    robotsTxt += '# Disallow specific paths\n'
    disallowPaths.forEach(path => {
      robotsTxt += `Disallow: ${path}\n`
    })
    robotsTxt += '\n'
  }

  // Add allow rules
  if (allowPaths.length > 0) {
    robotsTxt += '# Allow important pages\n'
    allowPaths.forEach(path => {
      robotsTxt += `Allow: ${path}\n`
    })
    robotsTxt += '\n'
  }

  // Add crawl delay
  if (crawlDelay > 0) {
    robotsTxt += `Crawl-delay: ${crawlDelay}\n\n`
  }

  // Add sitemap
  robotsTxt += `Sitemap: ${sitemapUrl}\n`

  return robotsTxt
}