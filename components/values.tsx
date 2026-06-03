'use client'

import { Eye, ShieldCheck, Zap, Heart, Lightbulb, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Value = { icon: LucideIcon; title: string; description: string }

const values: Value[] = [
  {
    icon: Eye,
    title: 'Visibility',
    description:
      "We believe every customer deserves complete clarity — on pricing, shipment status, and what's happening with their cargo at every stage. Full visibility is not a feature, it's a baseline.",
  },
  {
    icon: ShieldCheck,
    title: 'Accountability',
    description:
      'We take ownership of every shipment we handle. When things go wrong, we communicate immediately and work on solutions — not excuses.',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description:
      'Operational consistency is not a differentiator, it’s a baseline commitment. We build processes and partnerships that deliver the same quality on the hundredth shipment as the first.',
  },
  {
    icon: Heart,
    title: 'Customer Commitment',
    description:
      'We work with a limited number of partners and customers by design — so every relationship gets the attention it deserves, not a ticket number.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We invest in technology and operational systems that give our customers visibility and efficiency that legacy freight companies cannot match.',
  },
]

export function Values() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="section-label is-centered">What We Stand For</span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-ink text-balance md:text-[2.625rem]">
            Our Core Values
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <Reveal
                key={value.title}
                delay={(i % 3) * 80}
                className={i === 3 ? 'lg:col-start-1' : ''}
              >
                <div className="group h-full rounded-xl border border-cloud-border bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:bg-[#F0F4FF] hover:shadow-[0_14px_40px_rgba(20,27,52,0.10)]">
                  <div className="flex items-start gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-electric/20 bg-electric/10 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display mb-2 text-lg font-semibold text-ink">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate">{value.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
