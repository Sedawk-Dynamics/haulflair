import type { MetadataRoute } from 'next'

// The apex 308-redirects to www, so www is the canonical host. Keep this in
// sync with layout.tsx and sitemap.ts — a mismatch points the canonical at a
// URL that redirects away from the page Google actually crawled.
const siteUrl = 'https://www.haulflair.com'

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
