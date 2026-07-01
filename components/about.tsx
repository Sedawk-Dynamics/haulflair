'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-sec-page-alt py-24 lg:py-32">
      {/* subtle CSS geometric texture (no image file) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(43,108,223,0.06) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal variant="left" className="relative order-2 lg:order-1">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-sec-border shadow-xl shadow-navy/10">
              <Image
                src="/deleviry.png"
                alt="Haulflair drayage truck hauling a container at a US port terminal"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 right-4 rounded-xl border border-electric/30 bg-sec-card p-5 shadow-xl shadow-navy/10 md:right-8">
              <p className="font-display text-3xl font-bold text-electric">1</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-mid-grey">
                Partner, Port to Door
              </p>
            </div>

            {/* corner accent */}
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-xl border border-electric/25 bg-electric/6" />
          </Reveal>

          {/* Content */}
          <Reveal variant="right" delay={120} className="order-1 lg:order-2">
            <span className="section-label">About Haulflair</span>

            <h2 className="font-display mb-6 mt-4 text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-[2.625rem]">
              The Last Mile, Mastered
            </h2>

            {/* Emphasised lead line — strongest line on the page */}
            <p className="font-display mb-6 text-2xl font-semibold leading-snug text-sec-heading md:text-[1.75rem]">
              Built by People Who&apos;ve Sat on the{' '}
              <span className="text-electric">Other Side of the Phone.</span>
            </p>

            <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-sec-body">
              <p>
                Before Haulflair, we were the ones chasing drayage partners for status updates,
                absorbing detention charges nobody warned us about, and explaining to customers why a
                container that should&apos;ve moved in two days took five. We built Haulflair to be the
                partner we wish we&apos;d had. Logistics fails in the details, not the headlines.
              </p>
              <p>
                Haulflair is a US drayage and warehousing specialist — not two services stitched
                together, but one operation that stays with your cargo from the moment it clears the
                port to the moment it lands on a shelf or a customer&apos;s doorstep. On the drayage
                side: container pickup, appointment scheduling, on-time delivery into Amazon FCs,
                Walmart DCs, and B2B warehouses. On the warehousing side: short-term storage,
                cross-docking, and full B2B and B2C fulfillment — all run on the same systems, by the
                same team, with the same standard of accountability.
              </p>
              <p>
                What that means in practice is simple. You&apos;re not managing one vendor for the
                truck and another for the warehouse, hoping they actually talk to each other. You get
                one partner, one point of contact, and zero finger-pointing when something needs
                fixing.
              </p>
            </div>

            <a
              href="mailto:info@haulflair.com"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-all duration-200 hover:gap-3"
            >
              Get in Touch
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
