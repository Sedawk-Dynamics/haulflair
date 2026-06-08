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
                src="/images/about-logistics.png"
                alt="Haulflair logistics operations"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 right-4 rounded-xl border border-electric/30 bg-sec-card p-5 shadow-xl shadow-navy/10 md:right-8">
              <p className="font-display text-3xl font-bold text-electric">9+</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-mid-grey">
                Logistics Solutions
              </p>
            </div>

            {/* corner accent */}
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-xl border border-electric/25 bg-electric/6" />
          </Reveal>

          {/* Content */}
          <Reveal variant="right" delay={120} className="order-1 lg:order-2">
            <span className="section-label">About Haulflair</span>

            <h2 className="font-display mb-6 mt-4 text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-[2.625rem]">
              Redefining the Freight Forwarding Experience
            </h2>

            {/* Emphasised lead line — strongest line on the page */}
            <p className="font-display mb-6 text-2xl font-semibold leading-snug text-sec-heading md:text-[1.75rem]">
              Global trade is complex.{' '}
              <span className="text-electric">Moving cargo shouldn&apos;t be.</span>
            </p>

            <div className="space-y-5 text-[1.0625rem] leading-[1.7] text-sec-body">
              <p>
                Haulflair is a new-generation freight and logistics company built for the way global
                trade actually works today. We combine hands-on operational expertise with technology
                to deliver end-to-end freight solutions — from US drayage and inland delivery to
                full-service forwarding for importers and exporters worldwide.
              </p>
              <p>
                We are on a mission to make cross-border logistics as effortless and predictable as
                ordering online. We work with freight forwarders, NVOCCs, and importers and exporters
                who need a partner that moves fast, communicates clearly, and treats every shipment
                like it matters. Whether you need a reliable US drayage partner for your FCL cargo,
                customs coordination, or end-to-end supply chain support, Haulflair brings the
                operational depth and responsiveness to get it done.
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
