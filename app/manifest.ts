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
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
