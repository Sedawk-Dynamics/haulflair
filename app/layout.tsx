import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OpeningAnimation } from '@/components/opening-animation'
import './globals.css'
 
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

const siteUrl = 'https://haulflair.com'
const ogImage = '/images/hero-bg.png'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Haulflair — US Drayage & Warehousing Partner for Freight Forwarders',
    template: '%s | Haulflair',
  },
  description:
    'Haulflair is a technology-driven US drayage and warehousing specialist. From port pickup to final delivery into Amazon FCs, Walmart DCs, and B2B/B2C warehouses — with real-time container intelligence and full shipment visibility for freight forwarders and importers.',
  applicationName: 'Haulflair',
  authors: [{ name: 'Haulflair' }],
  creator: 'Haulflair',
  publisher: 'Haulflair',
  category: 'Logistics',
  keywords: [
    'US drayage',
    'container drayage',
    'port drayage',
    'drayage and warehousing',
    'Amazon FC delivery',
    'Walmart DC delivery',
    'B2B warehousing',
    'B2C fulfillment',
    'cross-docking',
    'warehousing and fulfillment',
    'FCL drayage',
    'freight forwarder partner',
    'US inland freight',
    'shipment visibility',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Haulflair — US Drayage & Warehousing, Engineered Smarter',
    description:
      "Global trade is complex. Moving cargo shouldn't be. Haulflair blends operational precision with technology-driven execution to deliver reliable US drayage, flexible warehousing, and complete shipment visibility.",
    url: siteUrl,
    siteName: 'Haulflair',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1024,
        height: 1024,
        alt: 'Haulflair — US drayage and warehousing partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haulflair — US Drayage & Warehousing, Engineered Smarter',
    description:
      'Reliable US drayage, flexible B2B & B2C warehousing, and complete shipment visibility — the partner freight forwarders and importers can count on.',
    images: [ogImage],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#141b34',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'Haulflair',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon.svg`,
        },
        image: `${siteUrl}${ogImage}`,
        description:
          'Technology-driven US drayage and warehousing specialist — port pickup to final delivery, with real-time container intelligence and full shipment visibility.',
        email: 'sales@haulflair.com',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: 'sales@haulflair.com',
            telephone: '+91-7259963859',
            availableLanguage: ['English'],
          },
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'info@haulflair.com',
            telephone: '+91-8310172085',
            availableLanguage: ['English'],
          },
        ],
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        knowsAbout: [
          'US drayage',
          'container drayage',
          'port drayage',
          'warehousing and fulfillment',
          'B2B and B2C fulfillment',
          'cross-docking',
          'shipment visibility',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: 'Haulflair',
        description: 'US drayage and warehousing partner for freight forwarders and importers.',
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        name: 'US Drayage Services',
        serviceType: 'Container drayage',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        description:
          'Smart port drayage from major US ports to Amazon Fulfillment Centers, Walmart Distribution Centers, B2B warehouses, and 3PL facilities — with real-time container intelligence and predictive demurrage prevention.',
      },
      {
        '@type': 'Service',
        name: 'Warehousing & Fulfillment',
        serviceType: 'Warehousing and fulfillment',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        description:
          'Flexible B2B and B2C warehousing across key US logistics hubs — short-term storage, cross-docking, and full order fulfillment, backed by live visibility and AI-powered slotting.',
      },
    ],
  }

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} bg-navy-deep`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <OpeningAnimation />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
