'use client'

import {
  Globe,
  Ship,
  Truck,
  ClipboardCheck,
  Warehouse,
  RadioTower,
  MapPin,
  Headphones,
  FileText,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

// Featured / primary services — rendered in the top 2-column row.
const featured: Service = {
  icon: Truck,
  title: 'US Drayage Services',
  description:
    'Our core speciality. We handle container drayage from major US ports — Newark/Elizabeth, Savannah, Norfolk, Charleston — to Amazon Fulfillment Centers, Walmart Distribution Centers, B2B warehouses, and 3PL facilities across the United States. Our European operations expertise spans major origin markets including Poland, Germany, France, Netherlands, and beyond — making us a natural end-to-end partner for European freight forwarders and importers moving FCL cargo into the US.',
}

const primaryPair: Service = {
  icon: Globe,
  title: 'Freight Forwarding',
  description:
    'Full-service air, ocean, and land freight forwarding for importers and exporters moving cargo across international markets. We manage carrier relationships, documentation, and end-to-end coordination so your cargo moves without surprises.',
}

// Remaining services — rendered in the 3-column grid below.
const services: Service[] = [
  {
    icon: Ship,
    title: 'Port-to-Port Shipping',
    description:
      'Efficient port-to-port logistics for businesses requiring reliable cargo transportation between global ports. We handle carrier coordination, booking management, and shipment visibility across major trade lanes worldwide.',
  },
  {
    icon: ClipboardCheck,
    title: 'Customs Clearance',
    description:
      'Fast, compliant customs clearance coordination for US-bound and international cargo. We manage documentation, classification, and customs filing coordination to ensure smooth border crossing and minimal port dwell time.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing & Storage',
    description:
      'Flexible warehousing and cargo storage solutions across key US logistics hubs. Whether you need short-term overflow storage, cross-docking, B2C order fulfillment, or inventory management support, we connect you to the right facility for your cargo type and timeline — complete with a personalised Warehouse Management System (WMS) setup to keep your inventory visible and your operations moving.',
  },
  {
    icon: RadioTower,
    title: 'Shipment Tracking',
    description:
      'Complete shipment visibility from port pickup to final delivery. We provide milestone-by-milestone updates — customs release, container availability, dispatch, and POD — so you and your customers always know where the cargo stands.',
  },
  {
    icon: MapPin,
    title: 'Last-Mile Delivery',
    description:
      'Reliable final delivery coordination from warehouse or DC to end consignee. We manage carrier dispatch, delivery appointments, and proof of delivery documentation to ensure cargo reaches its destination on time and intact.',
  },
  {
    icon: Headphones,
    title: 'Logistics Consultation',
    description:
      "Customised logistics planning and supply chain advisory for businesses looking to optimise their freight operations. Whether you're evaluating trade lanes, restructuring your US import flow, or building a new distribution model, we provide operational guidance grounded in real freight experience.",
  },
  {
    icon: FileText,
    title: 'Documentation & Compliance',
    description:
      'Accurate preparation and management of all shipping documentation — commercial invoices, packing lists, bills of lading, ISF filings, and customs declarations. We ensure compliance with US CBP and international trade regulations across every shipment.',
  },
]

export function Services() {
  return (
    <section id="services" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-14">
          <span className="section-label">Our Services &amp; Solutions</span>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display max-w-xl text-4xl font-bold tracking-tight text-ink text-balance md:text-[2.625rem]">
              End-to-End Logistics Solutions
            </h2>
            <p className="max-w-md text-[1.0625rem] leading-[1.7] text-slate text-pretty">
              From first mile to final delivery, we coordinate every stage of your supply chain with
              precision, transparency, and operational expertise.
            </p>
          </div>
        </Reveal>

        {/* Featured row — US Drayage (primary) + Freight Forwarding */}
        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <FeaturedCard service={featured} />
          </Reveal>
          <Reveal delay={80}>
            <ServiceCard service={primaryPair} />
          </Reveal>
        </div>

        {/* 3-column grid for the remaining services */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-cloud-border bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,27,52,0.12)]">
      {/* electric top accent */}
      <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-electric transition-transform duration-300 group-hover:scale-x-100" />
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-electric/20 bg-electric/10 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
        <Icon size={20} />
      </div>
      <h3 className="font-display mb-2 text-lg font-semibold leading-snug text-ink">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-slate">{service.description}</p>
    </div>
  )
}

function FeaturedCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-electric/40 bg-linear-to-br from-navy to-navy-deep p-7 shadow-[0_14px_40px_rgba(20,27,52,0.25)] transition-all duration-300 hover:-translate-y-1">
      <span className="absolute inset-x-0 top-0 h-[3px] bg-electric" />
      {/* Core Service badge */}
      <span className="absolute right-5 top-5 rounded-full border border-electric/40 bg-electric/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-electric-bright">
        Core Service
      </span>
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-electric/40 bg-electric/20 text-electric-bright">
        <Icon size={22} />
      </div>
      <h3 className="font-display mb-3 text-2xl font-bold leading-snug text-white">
        {service.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-light-grey/85">{service.description}</p>
    </div>
  )
}
