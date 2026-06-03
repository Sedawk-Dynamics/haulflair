'use client'

import { Target, Eye } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function MissionVision() {
  return (
    <section className="bg-off-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="section-label is-centered">Our Purpose</span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ink text-balance md:text-[2.625rem]">
            Mission &amp; Vision
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Mission */}
          <Reveal variant="left" delay={120}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-cloud-border bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,27,52,0.10)] lg:p-10">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-electric" />
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-electric/20 bg-electric/10 text-electric">
                <Target size={22} />
              </div>
              <h3 className="font-display mb-4 text-2xl font-bold text-ink">Our Mission</h3>
              <p className="text-[1.0625rem] leading-[1.7] text-slate">
                To simplify global freight by combining operational expertise, honest communication,
                and technology-enabled coordination. We exist to make moving cargo across borders as
                effortless and predictable as ordering online — for freight forwarders and importers
                and exporters alike.
              </p>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal variant="right" delay={200}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-cloud-border bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(20,27,52,0.10)] lg:p-10">
              <span className="absolute inset-x-0 top-0 h-[3px] bg-electric" />
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-electric/20 bg-electric/10 text-electric">
                <Eye size={22} />
              </div>
              <h3 className="font-display mb-4 text-2xl font-bold text-ink">Our Vision</h3>
              <p className="text-[1.0625rem] leading-[1.7] text-slate">
                To build Haulflair into a globally trusted freight forwarding and logistics company
                known for operational reliability, transparent pricing, and genuine partnership. We
                are building toward a future where Haulflair manages end-to-end supply chains for
                importers and exporters across all major trade corridors — powered by technology and
                grounded in real operational experience.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
