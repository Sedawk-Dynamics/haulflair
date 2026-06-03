'use client'

import { CountUp } from '@/components/count-up'

type Stat = { value?: number; suffix?: string; text?: string; label: string }

const stats: Stat[] = [
  { value: 9, suffix: '+', label: 'Logistics Solutions' },
  { value: 48, suffix: 'hrs', label: 'Quote Turnaround' },
  { text: 'Multi-Region', label: 'Global Coverage' },
  { text: 'FCL', label: 'Container Specialists' },
  { text: 'Zero', label: 'Hidden Charges' },
]

export function TrustBar() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden border-y border-white/10 bg-linear-to-b from-navy-deep to-navy py-14"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-32 w-[480px] bg-electric/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-32 w-[480px] bg-electric/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-8 divide-white/10 md:grid-cols-5 md:divide-x">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center justify-center text-center md:px-4 first:col-span-2 first:md:col-span-1"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-electric-bright md:text-[2.75rem] md:leading-none">
                {stat.value != null ? (
                  <CountUp value={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.text
                )}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-widest text-light-grey/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
