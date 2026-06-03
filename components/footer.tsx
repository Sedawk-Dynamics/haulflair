import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

const serviceLinks = [
  'Freight Forwarding',
  'Port-to-Port Shipping',
  'US Drayage',
  'Customs Clearance',
  'Warehousing & Storage',
  'Last-Mile Delivery',
]

const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Mission', href: '#about' },
  { label: 'Our Values', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-electric/60 bg-navy-deep">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-40 w-[800px] -translate-x-1/2 bg-electric/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Haulflair%20logo%20without%20background-UBBXNLpkfxewBdWt7onCbHhz1hMlew.png"
              alt="Haulflair"
              width={160}
              height={44}
              className="mb-5 h-9 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-light-grey/70">
              Freight forwarding meets operational expertise, transparency, and genuine partnership.
              Moving cargo with confidence.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="mailto:info@haulflair.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-light-grey/70 transition-all duration-300 hover:border-electric/50 hover:text-electric-bright"
                aria-label="Email Haulflair"
              >
                <Mail size={15} />
              </a>
              <a
                href="tel:7259963859"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-light-grey/70 transition-all duration-300 hover:border-electric/50 hover:text-electric-bright"
                aria-label="Call Haulflair"
              >
                <Phone size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-electric-bright">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <a
                    href="#services"
                    className="text-sm text-light-grey/70 transition-colors duration-200 hover:text-electric-bright"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-electric-bright">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-light-grey/70 transition-colors duration-200 hover:text-electric-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-electric-bright">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-electric-bright" />
                <div className="space-y-0.5 text-sm text-light-grey/70">
                  <a href="tel:7259963859" className="block transition-colors hover:text-electric-bright">
                    +91 7259963859
                  </a>
                  <a href="tel:8310172085" className="block transition-colors hover:text-electric-bright">
                    +91 8310172085
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail size={14} className="mt-0.5 shrink-0 text-electric-bright" />
                <div className="space-y-0.5 text-sm text-light-grey/70">
                  <a href="mailto:info@haulflair.com" className="block transition-colors hover:text-electric-bright">
                    info@haulflair.com
                  </a>
                  <a href="mailto:sales@haulflair.com" className="block transition-colors hover:text-electric-bright">
                    sales@haulflair.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-mid-grey">
            &copy; 2026 Haulflair Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-mid-grey">Registered in India &mdash; haulflair.com</p>
        </div>
      </div>
    </footer>
  )
}
