'use client'

import type { MouseEvent } from 'react'
import {
  Truck,
  Warehouse,
  CalendarClock,
  RadioTower,
  FileText,
  PackageSearch,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Service = {
  icon: LucideIcon
  title: string
  description: string
  badge?: string
}

// Two featured pillar cards — equal visual weight, rendered side by side.
const pillars: Service[] = [
  {
    icon: Truck,
    badge: 'Core Service',
    title: 'US Drayage Services',
    description:
      'Our core specialty. Smart port drayage from major US ports — Newark/Elizabeth, Savannah, Norfolk, Charleston — to Amazon Fulfillment Centers, Walmart Distribution Centers, B2B warehouses, and 3PL facilities across the United States. Real-time container intelligence, dynamic appointment management, and predictive demurrage prevention, engineered to keep every container moving and every deadline met.',
  },
  {
    icon: Warehouse,
    badge: 'Core Service',
    title: 'Warehousing & Fulfillment',
    description:
      'A digital control tower for your inventory. Flexible B2B and B2C warehousing across key US logistics hubs — short-term storage, cross-docking, and full order fulfillment, backed by live visibility, AI-powered slotting, and adaptive fulfillment. Built to turn warehousing from a black box into a system you can see straight through.',
  },
]

// Supporting capability cards — rendered in the grid below the pillars.
const services: Service[] = [
  {
    icon: CalendarClock,
    title: 'Dynamic Appointment Intelligence',
    description:
      'Live scheduling, automated coordination, and proof-of-delivery tracking built for the deadlines that actually matter — Amazon FC windows, Walmart DC compliance, and everything in between.',
  },
  {
    icon: RadioTower,
    title: 'Real-Time Shipment Intelligence',
    description:
      'Live milestone-by-milestone visibility from port pickup to final delivery. Customs release, container availability, dispatch, and POD — tracked and updated as it happens, not after the fact.',
  },
  {
    icon: FileText,
    title: 'Digital Container Lifecycle',
    description:
      'Every milestone, every document, every charge, tracked in one unified system. Bills of lading, ISF filings, and compliance records — searchable, transparent, and always current.',
  },
  {
    icon: PackageSearch,
    title: 'Smart Inventory Intelligence',
    description:
      "Predictive inventory visibility and digital SKU tracking across every warehouse location. Know what's in stock, what's moving, and what needs attention — before it becomes a problem.",
  },
]

// Tracks the cursor inside a card and exposes it as CSS vars for the spotlight.
// Direct style writes (no React state) keep it smooth — no re-render per move.
function handleSpotlight(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}

export function Services() {
  return (
    <section id="services" className="bg-sec-page py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-14">
          <span className="section-label">Our Services &amp; Solutions</span>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display max-w-xl text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-[2.625rem]">
              Drayage and Warehousing, Engineered Smarter
            </h2>
            <p className="max-w-md text-[1.0625rem] leading-[1.7] text-sec-body text-pretty">
              From the moment your container clears the port to the moment your inventory reaches its
              destination, we handle it with precision, intelligence, and full visibility — nothing
              more, nothing less.
            </p>
          </div>
        </Reveal>

        {/* Two featured pillars — equal weight, side by side */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <FeaturedCard service={pillar} />
            </Reveal>
          ))}
        </div>

        {/* Supporting capability grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        /* cursor-follow spotlight */
        .hf-spot {
          background: radial-gradient(
            220px circle at var(--spot-x, 50%) var(--spot-y, 50%),
            rgba(43, 108, 223, 0.18),
            transparent 60%
          );
        }
        .hf-spot--bright {
          background: radial-gradient(
            240px circle at var(--spot-x, 50%) var(--spot-y, 50%),
            rgba(125, 176, 255, 0.22),
            transparent 60%
          );
        }
        /* glowing corner status dot */
        .hf-dot {
          box-shadow: 0 0 0 0 rgba(43, 108, 223, 0.45);
          animation: hfDotPulse 2.6s ease-out infinite;
        }
        @keyframes hfDotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(43, 108, 223, 0.5); }
          70%  { box-shadow: 0 0 0 8px rgba(43, 108, 223, 0); }
          100% { box-shadow: 0 0 0 0 rgba(43, 108, 223, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hf-dot { animation: none; }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <div
      onMouseMove={handleSpotlight}
      className="hf-card group relative h-full overflow-hidden rounded-xl border border-sec-border bg-sec-card p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_14px_40px_rgba(20,27,52,0.16)]"
    >
      {/* cursor spotlight */}
      <span className="hf-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* electric top accent */}
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-electric transition-transform duration-300 group-hover:scale-x-100" />
      {/* glowing corner dot */}
      <span className="hf-dot pointer-events-none absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-electric/60 transition-colors duration-300 group-hover:bg-electric-bright" />

      <div className="relative">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-electric/20 bg-electric/10 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
          <Icon size={20} />
        </div>
        <h3 className="font-display mb-2 text-lg font-semibold leading-snug text-sec-heading">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-sec-body">{service.description}</p>
      </div>

      {/* animated tracking line at the base */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-electric to-electric-bright opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100" />
    </div>
  )
}

function FeaturedCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <div
      onMouseMove={handleSpotlight}
      className="hf-card group relative h-full overflow-hidden rounded-xl border border-electric/40 bg-linear-to-br from-navy to-navy-deep p-7 shadow-[0_14px_40px_rgba(20,27,52,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-electric/70"
    >
      <span className="hf-spot hf-spot--bright pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute inset-x-0 top-0 h-[3px] bg-electric" />
      {/* badge */}
      {service.badge && (
        <span className="absolute right-5 top-5 rounded-full border border-electric/40 bg-electric/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-electric-bright">
          {service.badge}
        </span>
      )}
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-electric/40 bg-electric/20 text-electric-bright">
        <Icon size={22} />
      </div>
      <h3 className="font-display relative mb-3 text-2xl font-bold leading-snug text-white">
        {service.title}
      </h3>
      <p className="relative text-[15px] leading-relaxed text-light-grey/85">{service.description}</p>

      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-linear-to-r from-electric to-electric-bright opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100" />
    </div>
  )
}
