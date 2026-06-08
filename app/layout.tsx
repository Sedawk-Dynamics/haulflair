import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
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

export const metadata: Metadata = {
  title: 'Haulflair — Intelligent Freight Forwarding & Global Logistics Platform',
  description:
    'Haulflair is a technology-driven freight forwarding and logistics company specialising in US drayage, port-to-door delivery, customs clearance, and supply chain coordination for freight forwarders and importers/exporters worldwide.',
  keywords: [
    'US drayage',
    'freight forwarding',
    'port drayage',
    'Amazon FC delivery',
    'Walmart DC delivery',
    'customs clearance',
    'logistics platform',
    'FCL drayage',
    'freight forwarder partner',
    'US inland freight',
    'intelligent logistics',
  ],
  openGraph: {
    title: 'Haulflair — Where Freight Intelligence Meets Global Logistics',
    description:
      "Global trade is complex. Moving cargo shouldn't be. Haulflair combines AI-powered operations with real freight expertise to deliver end-to-end logistics solutions that move fast and communicate clearly.",
    url: 'https://haulflair.com',
    siteName: 'Haulflair',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#141b34',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable} bg-navy-deep`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <OpeningAnimation />
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
