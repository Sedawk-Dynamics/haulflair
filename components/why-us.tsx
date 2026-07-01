'use client'

import { Truck, DollarSign, MessagesSquare, Handshake, Cpu, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Point = {
  icon: LucideIcon
  title: string
  description: string
  ai?: boolean
}

const points: Point[] = [
  {
    icon: Truck,
    title: 'US Drayage Expertise',
    description:
      'We specialise in the part of the supply chain most forwarders find hardest to control — the final mile inside the US. From port pickup to Amazon FC appointment compliance, we know the operational requirements, the carriers, and the timelines that matter.',
  },
  {
    icon: DollarSign,
    title: 'Transparent, Predictable Pricing',
    description:
      'The rate we quote is the rate you pay. No surprise surcharges, no hidden fees after delivery. We build margin into our rates honestly and communicate cost changes before they happen — not after.',
  },
  {
    icon: MessagesSquare,
    title: 'Fast, Responsive Communication',
    description:
      "We respond to rate requests, booking confirmations, and operational queries within one business day. When something goes wrong with a shipment — and in freight, it sometimes does — you hear from us first, not after you've followed up twice.",
  },
  {
    icon: Handshake,
    title: 'One Lane. Mastered.',
    description:
      'Every freight company claims to do everything — ocean, air, customs, warehousing, trucking. We picked two: US drayage and warehousing. No distractions, no subcontracted guesswork, no scope creep. Just the partner forwarders call when the work actually has to get done.',
  },
  {
    icon: Cpu,
    title: 'The Brain Behind the Boxes',
    ai: true,
    description:
      "Spreadsheets miss things. Group chats lose context. Hope isn't a strategy. So we built systems that watch every shipment in real time, catch problems before they escalate, and flag risk while you can still do something about it. This isn't tech for tech's sake — it's the difference between finding out about a problem and never having one in the first place.",
  },
]

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-sec-page-alt py-24 lg:py-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-electric/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-electric/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="section-label is-centered">Why Choose Haulflair</span>
          <h2 className="font-display mb-4 mt-4 text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-[2.625rem]">
            Built to Be the Partner You Don&apos;t Have to Worry About
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => {
            const Icon = point.icon
            const isLast = i === points.length - 1
            return (
              <Reveal
                key={point.title}
                delay={(i % 3) * 90}
                className={isLast ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <div className="group relative h-full overflow-hidden rounded-xl border border-sec-border border-l-2 border-l-electric/60 bg-sec-card p-7 transition-all duration-300 hover:border-l-electric hover:bg-sec-card-hover">
                  {/* big background accent number */}
                  <span className="font-display pointer-events-none absolute -top-3 right-3 select-none text-7xl font-extrabold leading-none text-electric/10">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {point.ai && (
                    <span className="absolute right-5 top-5 rounded-full border border-electric/40 bg-electric/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-electric-bright">
                      AI
                    </span>
                  )}

                  <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-electric/40 bg-electric/15 text-electric-bright">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display relative mb-3 text-lg font-semibold leading-snug text-sec-heading">
                    {point.title}
                  </h3>
                  <p className="relative text-sm leading-relaxed text-sec-body">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
