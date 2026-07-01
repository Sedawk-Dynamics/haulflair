'use client'

import { Eye, ShieldCheck, Zap, Heart, Crosshair, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Value = { icon: LucideIcon; title: string; description: string }

const values: Value[] = [
  {
    icon: Eye,
    title: 'Visibility',
    description:
      "Most logistics companies treat visibility as a dashboard feature. We treat it as a promise. You will never wonder where your cargo is, what it's costing you, or what happens next — because guessing isn't a service we offer.",
  },
  {
    icon: ShieldCheck,
    title: 'Accountability',
    description:
      'When something goes wrong — and in freight, something eventually does — we don’t disappear behind a support ticket. We call you first, we own it, and we fix it. No excuses dressed up as explanations.',
  },
  {
    icon: Zap,
    title: 'Reliability',
    description:
      'Anyone can deliver once. We’re building the kind of operation that delivers the same way on shipment one thousand as it did on shipment one — because consistency isn’t a milestone, it’s the entire business model.',
  },
  {
    icon: Heart,
    title: 'Customer Commitment',
    description:
      'We will never be the company managing a thousand accounts and remembering none of them. We chose depth over scale on purpose — so every partner gets attention, not a ticket number in a queue.',
  },
  {
    icon: Crosshair,
    title: 'Precision',
    description:
      'Drayage isn’t won or lost in the big decisions. It’s won in the details everyone else treats as fine print — appointment windows, LFD deadlines, accessorial charges nobody warned you about. We treat precision as the job, not the afterthought.',
  },
]

export function Values() {
  return (
    <section className="bg-sec-page py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="section-label is-centered">What We Stand For</span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-[2.625rem]">
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
                <div className="group h-full rounded-xl border border-sec-border bg-sec-card p-7 shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-electric/30 hover:bg-sec-card-hover hover:shadow-[0_14px_40px_rgba(20,27,52,0.10)]">
                  <div className="flex items-start gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-electric/20 bg-electric/10 text-electric transition-colors duration-300 group-hover:bg-electric group-hover:text-white">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display mb-2 text-lg font-semibold text-sec-heading">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-sec-body">{value.description}</p>
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
