'use client'

import { useEffect, useState } from 'react'

const LOGO_URL =
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Haulflair%20logo%20without%20background-UBBXNLpkfxewBdWt7onCbHhz1hMlew.png'

const SESSION_KEY = 'hf-splash-shown'
const HOLD_MS = 2600 // visible duration
const EXIT_MS = 700 // fade/slide-out duration

// Deterministic particle field (no Math.random → stable across renders)
const PARTICLES = [
  { left: 12, top: 28, size: 3, delay: 0.0, dur: 5.5 },
  { left: 22, top: 70, size: 2, delay: 0.8, dur: 6.2 },
  { left: 34, top: 18, size: 4, delay: 1.4, dur: 5.0 },
  { left: 44, top: 82, size: 2, delay: 0.4, dur: 6.8 },
  { left: 58, top: 24, size: 3, delay: 1.0, dur: 5.8 },
  { left: 66, top: 64, size: 2, delay: 1.8, dur: 6.0 },
  { left: 74, top: 36, size: 4, delay: 0.6, dur: 5.3 },
  { left: 84, top: 74, size: 2, delay: 1.2, dur: 6.5 },
  { left: 90, top: 30, size: 3, delay: 0.2, dur: 5.6 },
  { left: 16, top: 50, size: 2, delay: 1.6, dur: 6.3 },
]

/**
 * Premium CSS-only opening animation for Haulflair.
 * Shows once per browser session (sessionStorage), locks scroll while visible,
 * and exits with a smooth fade + slide. No animation library — keeps LCP green.
 */
export function OpeningAnimation() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Already played this session → skip instantly (no flash of splash on nav).
    let alreadyShown = false
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // sessionStorage unavailable (privacy mode) → just play once.
    }

    if (alreadyShown) {
      setVisible(false)
      return
    }

    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* ignore */
    }

    // Lock scroll while the splash is on screen.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => setExiting(true), HOLD_MS)
    const doneTimer = window.setTimeout(() => setVisible(false), HOLD_MS + EXIT_MS)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Restore scroll the moment we unmount.
  useEffect(() => {
    if (!visible) document.body.style.overflow = ''
  }, [visible])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className={`hf-splash fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#0d1220] ${
        exiting ? 'hf-splash--exit' : ''
      } ${mounted ? '' : 'hf-splash--preload'}`}
    >
      {/* Ambient glow + grid texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2b6cdf]/12 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #4d8bff 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      {/* Left → right light sweep */}
      <div className="hf-sweep pointer-events-none absolute inset-0" />

      {/* Floating particles / light specks */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hf-particle absolute rounded-full bg-[#4d8bff]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      {/* Logo cluster: ring + floating logo + shine */}
      <div className="hf-logo relative flex items-center justify-center">
        {/* Ring illuminated from top-left → bottom-right */}
        <div className="hf-ringwrap pointer-events-none absolute h-[260px] w-[260px] sm:h-[340px] sm:w-[340px]">
          <svg viewBox="0 0 300 300" className="h-full w-full" fill="none">
            <defs>
              <linearGradient id="hf-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9cc2ff" />
                <stop offset="55%" stopColor="#2b6cdf" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2b6cdf" stopOpacity="0.06" />
              </linearGradient>
            </defs>
            {/* faint base ring */}
            <circle cx="150" cy="150" r="120" stroke="#4d8bff" strokeOpacity="0.14" strokeWidth="1.5" />
            {/* travelling illumination arc, starting top-left */}
            <circle
              cx="150"
              cy="150"
              r="120"
              stroke="url(#hf-ring-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              pathLength={100}
              className="hf-ringsweep"
              transform="rotate(-135 150 150)"
            />
          </svg>
        </div>

        {/* Logo with shine pass */}
        <div className="hf-float relative overflow-hidden px-6 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            alt="Haulflair"
            width={260}
            height={76}
            fetchPriority="high"
            decoding="async"
            className="h-16 w-auto select-none sm:h-20"
            draggable={false}
          />
          <span className="hf-shine pointer-events-none absolute inset-0" />
        </div>
      </div>

      {/* Bottom loading progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
        <div className="hf-progress h-full bg-linear-to-r from-[#2b6cdf] to-[#4d8bff]" />
      </div>

      <style>{`
        /* ---- pre-paint state (avoids flash before mount) ---- */
        .hf-splash--preload .hf-logo,
        .hf-splash--preload .hf-progress { opacity: 0; }

        /* ---- container exit ---- */
        .hf-splash {
          opacity: 1;
          transition: opacity ${EXIT_MS}ms ease, transform ${EXIT_MS}ms ease;
        }
        .hf-splash--exit {
          opacity: 0;
          transform: translateY(-2%);
        }

        /* ---- logo entrance ---- */
        .hf-logo {
          animation: hfLogoIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        @keyframes hfLogoIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ---- gentle float ---- */
        .hf-float {
          animation: hfFloat 3.4s ease-in-out 1s infinite;
        }
        @keyframes hfFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-7px); }
        }

        /* ---- shine pass over logo ---- */
        .hf-shine {
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 65%
          );
          transform: translateX(-130%);
          animation: hfShine 1.6s ease-in-out 1.1s 1 forwards;
        }
        @keyframes hfShine {
          to { transform: translateX(130%); }
        }

        /* ---- left → right light sweep ---- */
        .hf-sweep {
          background: linear-gradient(
            100deg,
            transparent 30%,
            rgba(43, 108, 223, 0.16) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          animation: hfSweep 2.4s ease-in-out 0s 1 both;
        }
        @keyframes hfSweep {
          to { transform: translateX(100%); }
        }

        /* ---- glowing ring: illuminated top-left → bottom-right ---- */
        .hf-ringwrap {
          opacity: 0;
          animation: hfRingIn 0.9s ease 0.35s both;
        }
        .hf-ringsweep {
          stroke-dasharray: 42 58;
          stroke-dashoffset: 0;
          filter: drop-shadow(0 0 6px rgba(77, 139, 255, 0.55));
          animation: hfRingSweep 2.3s cubic-bezier(0.45, 0, 0.2, 1) 0.5s infinite;
        }
        @keyframes hfRingSweep {
          to { stroke-dashoffset: -100; }
        }
        @keyframes hfRingIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ---- particles ---- */
        .hf-particle {
          opacity: 0;
          box-shadow: 0 0 8px rgba(77, 139, 255, 0.8);
          animation-name: hfParticle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes hfParticle {
          0%   { opacity: 0; transform: translateY(8px) scale(0.6); }
          25%  { opacity: 0.9; }
          50%  { transform: translateY(-12px) scale(1); }
          75%  { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-24px) scale(0.7); }
        }

        /* ---- bottom progress line ---- */
        .hf-progress {
          width: 0%;
          box-shadow: 0 0 12px rgba(43, 108, 223, 0.7);
          animation: hfProgress 2.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards;
        }
        @keyframes hfProgress {
          0%   { width: 0%; }
          100% { width: 100%; }
        }

        /* ---- reduced motion: show logo, skip motion ---- */
        @media (prefers-reduced-motion: reduce) {
          .hf-logo { animation: hfLogoIn 0.4s ease both; }
          .hf-float, .hf-shine, .hf-sweep, .hf-ringsweep, .hf-particle {
            animation: none !important;
          }
          .hf-ringwrap { opacity: 1; }
          .hf-progress { animation: hfProgress 2.2s linear forwards; }
        }
      `}</style>
    </div>
  )
}
