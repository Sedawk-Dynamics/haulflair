'use client'

import { Reveal } from '@/components/reveal'

// Themed to Haulflair (freight/logistics). Swap these two arrays for any words.
const TOP_WORDS = ['PORT', 'DRAYAGE', 'WAREHOUSE', 'DISPATCHED', 'DELIVERED', 'FULFILLED', 'TRACKED']
const BOTTOM_WORDS = ['track', 'deliver', 'store', 'dispatch', 'move', 'fulfill', 'secure']

/**
 * Cinematic infinite marquee band.
 * Two layers scroll in opposite directions at different speeds (parallax feel),
 * with a seamless duplicate-content loop, edge fade masks, a faint grid,
 * and glowing separators. Pure transform animation — GPU friendly, no library.
 */
export function MovingTextSection() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-16 sm:py-20 lg:py-24">
      {/* faint background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(77,139,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(77,139,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 85%)',
        }}
      />
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-70 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b6cdf]/10 blur-[120px]" />

      {/* edge fade mask wrapper */}
      <Reveal
        className="relative flex flex-col gap-3 sm:gap-5"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        {/* Top row — bold uppercase, scrolls left */}
        <div
          className="group flex w-max hf-marquee hf-marquee--left"
          style={{ '--dur': '34s' } as React.CSSProperties}
        >
          <MarqueeGroup words={TOP_WORDS} variant="top" />
          <MarqueeGroup words={TOP_WORDS} variant="top" ariaHidden />
        </div>

        {/* Bottom row — italic serif, scrolls right (parallax) */}
        <div
          className="group flex w-max hf-marquee hf-marquee--right"
          style={{ '--dur': '46s' } as React.CSSProperties}
        >
          <MarqueeGroup words={BOTTOM_WORDS} variant="bottom" />
          <MarqueeGroup words={BOTTOM_WORDS} variant="bottom" ariaHidden />
        </div>
      </Reveal>

      <style>{`
        .hf-marquee {
          will-change: transform;
          animation: hfMarquee var(--dur, 36s) linear infinite;
        }
        .hf-marquee--right {
          animation-direction: reverse;
        }
        .hf-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes hfMarquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hf-marquee { animation: none; transform: translate3d(-12%, 0, 0); }
        }
      `}</style>
    </section>
  )
}

function MarqueeGroup({
  words,
  variant,
  ariaHidden = false,
}: {
  words: string[]
  variant: 'top' | 'bottom'
  ariaHidden?: boolean
}) {
  const isTop = variant === 'top'
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="flex shrink-0 items-center">
          {isTop ? (
            <span
              className="font-display select-none px-6 font-extrabold uppercase leading-none tracking-tight text-white/90 transition-[filter,color] duration-300 [text-shadow:0_0_40px_rgba(43,108,223,0.25)] hover:text-white hover:filter-[blur(0.4px)] sm:px-9"
              style={{ fontSize: 'clamp(3rem, 11vw, 10rem)' }}
            >
              {word}
            </span>
          ) : (
            <span
              className="select-none px-5 font-serif italic leading-none text-[#9fb4e6] transition-colors duration-300 hover:text-electric-bright sm:px-8"
              style={{ fontSize: 'clamp(1.5rem, 5vw, 4rem)' }}
            >
              {word}
            </span>
          )}
          {/* glowing separator */}
          <span
            className={`shrink-0 ${isTop ? 'px-6 sm:px-9' : 'px-5 sm:px-8'}`}
            aria-hidden="true"
          >
            <span
              className="inline-block rounded-full bg-electric-bright align-middle [box-shadow:0_0_12px_3px_rgba(77,139,255,0.6)]"
              style={
                isTop
                  ? { width: 'clamp(6px, 0.9vw, 12px)', height: 'clamp(6px, 0.9vw, 12px)' }
                  : { width: '6px', height: '6px' }
              }
            />
          </span>
        </span>
      ))}
    </div>
  )
}
