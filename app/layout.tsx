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

// The apex 308-redirects to www, so www is the host Google actually crawls.
// Keep in sync with robots.ts and sitemap.ts.
const siteUrl = 'https://www.haulflair.com'
// 1200x630 social card — the aspect ratio summary_large_image and Facebook expect.
const ogImage = '/og-image.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // Kept under ~60 characters so it is not truncated in search results.
    default: 'US Drayage & Warehousing for Freight Forwarders | Haulflair',
    template: '%s | Haulflair',
  },
  // Kept under ~155 characters so the full snippet renders in search results.
  description:
    'US drayage and warehousing, engineered smarter. Port pickup to final delivery into Amazon FCs, Walmart DCs and B2B/B2C warehouses — with full visibility.',
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
        width: 1200,
        height: 630,
        alt: 'Haulflair — US drayage and warehousing partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haulflair — US Drayage & Warehousing, Engineered Smarter',
    description:
      'Reliable US drayage, flexible B2B & B2C warehousing, and complete shipment visibility — the partner freight forwarders and importers can count on.',
    images: [
      {
        url: ogImage,
        alt: 'Haulflair — US drayage and warehousing partner',
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
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
        legalName: 'Haulflair Private Limited',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/haulflair-logo.png`,
          width: 1281,
          height: 404,
        },
        image: `${siteUrl}${ogImage}`,
        description:
          'Technology-driven US drayage and warehousing specialist — port pickup to final delivery, with real-time container intelligence and full shipment visibility.',
        email: 'sales@haulflair.com',
        // Google uses address + sameAs to resolve Haulflair as a real entity
        // (knowledge panel). Country is all we can state from existing site
        // copy — fill in streetAddress / addressLocality / postalCode when
        // you have the registered address to hand.
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        // TODO: add your LinkedIn / social profile URLs here, e.g.
        // sameAs: ['https://www.linkedin.com/company/haulflair'],
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
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: 'US Drayage & Warehousing for Freight Forwarders | Haulflair',
        description:
          'US drayage and warehousing, engineered smarter. Port pickup to final delivery into Amazon FCs, Walmart DCs and B2B/B2C warehouses — with full visibility.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        primaryImageOfPage: `${siteUrl}${ogImage}`,
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-drayage`,
        url: `${siteUrl}/#services`,
        name: 'US Drayage Services',
        serviceType: 'Container drayage',
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: { '@type': 'Country', name: 'United States' },
        description:
          'Smart port drayage from major US ports to Amazon Fulfillment Centers, Walmart Distribution Centers, B2B warehouses, and 3PL facilities — with real-time container intelligence and predictive demurrage prevention.',
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service-warehousing`,
        url: `${siteUrl}/#services`,
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
        {/*
          Scroll-reveal sections start at opacity:0 and are un-hidden by an
          IntersectionObserver. Crawlers that do not execute JS (many AI and
          social bots) would otherwise read the page body as hidden text, so
          they get the fully-visible end state instead.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>.reveal{opacity:1!important;transform:none!important}</style>`,
          }}
        />
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
