import type { MetadataRoute } from 'next'

// Must match layout.tsx and robots.ts — the apex 308-redirects to www.
const siteUrl = 'https://www.haulflair.com'

// Bump this when the page content actually changes. Using `new Date()` here
// would stamp a fresh date on every deploy, which tells crawlers the content
// changed when it did not — repeated false signals get lastmod ignored.
const lastModified = '2026-07-29'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      // No trailing slash — matches the canonical Next emits byte for byte.
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
