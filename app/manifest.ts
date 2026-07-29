import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Haulflair — US Drayage & Warehousing',
    short_name: 'Haulflair',
    description:
      'Technology-driven US drayage and warehousing partner for freight forwarders and importers.',
    start_url: '/',
    display: 'standalone',
    background_color: '#141b34',
    theme_color: '#141b34',
    icons: [
      { src: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  }
}
