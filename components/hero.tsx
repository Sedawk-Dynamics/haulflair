'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import { Typewriter } from '@/components/typewriter'

const globePhrases = ['Smart Drayage Engine', 'Adaptive Fulfillment', 'AI-Optimized Container Flow']

const trustPills = [
  'AI-Optimized Container Flow',
  'Predictive Drayage Planning',
  'Warehouse Intelligence Platform',
  'Scalable Fulfillment Infrastructure',
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden pt-28 lg:pt-32">
      {/* Deep near-black hero background */}
      <div className="absolute inset-0 -z-10 bg-[#000310]" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-[12%] h-[500px] w-[500px] rounded-full bg-electric/10 blur-[140px]" />
        <div className="absolute bottom-1/4 right-[8%] h-[360px] w-[360px] rounded-full bg-electric/10 blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #4d8bff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-12 px-6 md:px-10 lg:flex-row lg:gap-10 lg:px-8">
        {/* LEFT — copy */}
        <div className="flex w-full flex-col justify-center lg:w-[46%]">
          {/* Badge */}
          <div
            className="mb-7 inline-flex items-center gap-2 self-start rounded-full border border-electric/40 bg-electric/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-electric-bright"
            style={{ animation: 'heroIn 0.6s ease-out both' }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-electric-bright" />
            Next-Generation Drayage &amp; Fulfillment Platform
          </div>

          {/* Headline */}
          <h1
            className="font-display mb-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl xl:text-[4.25rem]"
            style={{ animation: 'heroIn 0.7s ease-out 0.05s both' }}
          >
            Global Trade is Complex.
            <br />
            Moving Cargo{' '}
            <span className="text-electric-bright">Shouldn&apos;t Be.</span>
          </h1>

          {/* Subheadline */}
          <p
            className="mb-9 max-w-xl text-[1.0625rem] leading-[1.7] text-light-grey/85"
            style={{ animation: 'heroIn 0.8s ease-out 0.12s both' }}
          >
            Built for modern logistics, Haulflair is the US drayage and warehousing partner freight
            forwarders and importers can count on. From port pickup to final delivery, we blend
            operational precision with technology-driven execution to deliver reliable drayage,
            flexible B2B and B2C warehousing, and complete shipment visibility — every container,
            every step. We don&apos;t just move cargo. We move it right.
          </p>

          {/* CTAs */}
          <div
            className="mb-11 flex flex-col items-start gap-4 sm:flex-row"
            style={{ animation: 'heroIn 0.8s ease-out 0.18s both' }}
          >
            <a
              href="mailto:sales@haulflair.com"
              className="group flex items-center gap-2 rounded-xl bg-electric px-7 py-4 text-base font-semibold text-white shadow-xl shadow-electric/25 transition-all duration-300 hover:bg-electric-bright hover:glow-electric"
            >
              Get a Free Quote
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="rounded-xl border border-white/25 px-7 py-4 font-semibold text-light-grey transition-all duration-300 hover:border-electric/60 hover:text-white"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* RIGHT — animated globe (above the fold, not lazy) */}
        <div
          className="hidden w-[54%] flex-col self-start lg:-mt-16 lg:flex xl:-mt-20"
          style={{ animation: 'heroIn 1s ease-out 0.2s both' }}
        >
          {/* Globe video with typewriter label */}
          <div className="relative min-h-[560px] flex-1 xl:min-h-[640px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                src="/globe.mp4"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="h-full w-full object-contain mix-blend-screen"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 62% 62% at 50% 50%, #000 60%, transparent 82%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 62% 62% at 50% 50%, #000 60%, transparent 82%)',
                }}
              />
            </div>

            {/* Typewriter capability label over the globe */}
            <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-electric/25 bg-navy/70 px-6 py-4 shadow-xl backdrop-blur-md">
              <Typewriter
                phrases={globePhrases}
                className="font-display text-lg font-bold text-electric-bright xl:text-xl"
              />
            </div>
          </div>

          {/* Trust pills — below the globe */}
          <div
            className="grid grid-cols-2 gap-3"
            style={{ animation: 'heroIn 1s ease-out 0.35s both' }}
          >
            {trustPills.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/7 px-4 py-2 text-xs font-medium text-light-grey"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-bright" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        aria-label="Scroll to statistics"
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-light-grey/60 transition-colors hover:text-white"
        style={{ animation: 'heroIn 1s ease-out 0.5s both' }}
      >
        <ChevronDown size={22} className="animate-bounce" />
      </a>

      <style>{`@keyframes heroIn { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }`}</style>
    </section>
  )
}
