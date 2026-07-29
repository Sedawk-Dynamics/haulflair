import type { MetadataRoute } from 'next'

const siteUrl = 'https://haulflair.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Unused shadcn/v0 scaffolding assets — no reason to spend crawl budget
      // on them or risk them surfacing in image search.
      disallow: ['/placeholder.svg', '/placeholder.jpg', '/placeholder-logo.*', '/placeholder-user.*'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
