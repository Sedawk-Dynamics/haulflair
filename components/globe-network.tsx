import type { CSSProperties } from 'react'

/**
 * "Global Logistics Network" hero visual.
 * A spinning wireframe globe (animated meridians) with glowing trade corridors,
 * flowing cargo particles, pulsing port nodes and a tilted satellite orbit.
 * Pure SVG + CSS transforms/opacity — GPU friendly, no animation library,
 * safe for the above-the-fold hero (LCP).
 */

const C = 300 // center
const R = 200 // globe radius

type Pt = { x: number; y: number; label: string }

// Approximate port/hub positions on the sphere face.
const NODES: Record<string, Pt> = {
  us: { x: 150, y: 305, label: 'US East Coast' },
  eu: { x: 250, y: 232, label: 'Europe' },
  asia: { x: 408, y: 250, label: 'Asia' },
  me: { x: 356, y: 312, label: 'Middle East' },
  india: { x: 392, y: 348, label: 'India' },
  north: { x: 312, y: 150, label: 'North Hub' },
}

// Trade corridors (the brief's required connections + global lanes).
const ROUTES: Array<[keyof typeof NODES, keyof typeof NODES, number]> = [
  ['eu', 'us', 95], // Europe ↔ USA
  ['asia', 'eu', 80], // Asia ↔ Europe
  ['me', 'india', 38], // Middle East ↔ India
  ['asia', 'north', 70], // Asia ↔ global north lane
  ['us', 'north', 60], // USA ↔ global north lane
]

// Quadratic arc that bulges outward (away from globe center).
function arc(a: Pt, b: Pt, lift: number) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = mx - C
  const dy = my - C
  const len = Math.hypot(dx, dy) || 1
  const cx = mx + (dx / len) * lift
  const cy = my + (dy / len) * lift
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`
}

const MERIDIANS = Array.from({ length: 7 })
const LATITUDES = [-130, -65, 0, 65, 130]
const ORBIT = 'M 70 300 A 230 92 0 1 1 530 300 A 230 92 0 1 1 70 300'

export function GlobeNetwork() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[120px]" />
      </div>

      <svg
        viewBox="0 0 600 600"
        className="relative h-full w-full"
        fill="none"
        role="img"
        aria-label="Animated global logistics network connecting major trade corridors"
      >
        <defs>
          <radialGradient id="g-sphere" cx="42%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#1b2a52" />
            <stop offset="55%" stopColor="#111a36" />
            <stop offset="100%" stopColor="#0a1024" />
          </radialGradient>
          <linearGradient id="g-merid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4d8bff" stopOpacity="0" />
            <stop offset="50%" stopColor="#4d8bff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4d8bff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="g-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#bcd4ff" />
            <stop offset="100%" stopColor="#2b6cdf" />
          </radialGradient>
          <radialGradient id="g-atmo" cx="50%" cy="50%" r="50%">
            <stop offset="72%" stopColor="#2b6cdf" stopOpacity="0" />
            <stop offset="92%" stopColor="#2b6cdf" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#2b6cdf" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* atmosphere halo */}
        <circle cx={C} cy={C} r={R + 26} fill="url(#g-atmo)" className="hf-g-breathe" />

        {/* sphere body */}
        <circle cx={C} cy={C} r={R} fill="url(#g-sphere)" />
        <circle cx={C} cy={C} r={R} fill="none" stroke="#4d8bff" strokeOpacity="0.45" strokeWidth="1.2" />

        {/* clip wireframe + routes to the globe-ish area */}
        <g>
          {/* latitudes (static slices) */}
          {LATITUDES.map((off, i) => {
            const rx = Math.sqrt(Math.max(R * R - off * off, 0))
            const ry = 10 + 18 * (1 - Math.abs(off) / R)
            return (
              <ellipse
                key={`lat-${i}`}
                cx={C}
                cy={C + off}
                rx={rx}
                ry={ry}
                stroke="#3f6bc4"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            )
          })}

          {/* meridians (animated → spinning globe) */}
          {MERIDIANS.map((_, i) => (
            <ellipse
              key={`mer-${i}`}
              cx={C}
              cy={C}
              rx={R}
              ry={R}
              stroke="url(#g-merid)"
              strokeWidth="1"
              className="hf-g-meridian"
              style={{ animationDelay: `${(-i * 16) / MERIDIANS.length}s` } as CSSProperties}
            />
          ))}
        </g>

        {/* trade corridors + cargo particles */}
        {ROUTES.map(([fromKey, toKey, lift], i) => {
          const d = arc(NODES[fromKey], NODES[toKey], lift)
          return (
            <g key={`route-${i}`}>
              <path d={d} stroke="#2b6cdf" strokeOpacity="0.25" strokeWidth="1.4" />
              <path
                d={d}
                stroke="#7fb0ff"
                strokeWidth="1.4"
                strokeOpacity="0.6"
                strokeDasharray="3 7"
                className="hf-g-flow"
              />
              <circle
                r="3.2"
                fill="#bcd4ff"
                className="hf-g-cargo"
                style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.7}s` } as CSSProperties}
              />
            </g>
          )
        })}

        {/* pulsing port nodes */}
        {Object.entries(NODES).map(([key, n], i) => (
          <g key={key}>
            <circle
              cx={n.x}
              cy={n.y}
              r="12"
              fill="#2b6cdf"
              fillOpacity="0.18"
              className="hf-g-pulse"
              style={{ animationDelay: `${i * 0.4}s` } as CSSProperties}
            />
            <circle cx={n.x} cy={n.y} r="3.4" fill="url(#g-node)" />
          </g>
        ))}

        {/* tilted satellite orbit */}
        <g transform={`rotate(-18 ${C} ${C})`}>
          <path d={ORBIT} stroke="#4d8bff" strokeOpacity="0.18" strokeWidth="1" />
          <circle r="3.4" fill="#7fb0ff" className="hf-g-orbit" style={{ offsetPath: `path('${ORBIT}')` }} />
        </g>
      </svg>

      <style>{`
        .hf-g-meridian {
          transform-box: fill-box;
          transform-origin: center;
          animation: hfGMerid 16s linear infinite;
        }
        @keyframes hfGMerid {
          0%   { transform: scaleX(1); }
          25%  { transform: scaleX(0.04); }
          50%  { transform: scaleX(-1); }
          75%  { transform: scaleX(0.04); }
          100% { transform: scaleX(1); }
        }
        .hf-g-flow {
          animation: hfGFlow 1.1s linear infinite;
        }
        @keyframes hfGFlow {
          to { stroke-dashoffset: -10; }
        }
        .hf-g-cargo {
          offset-rotate: 0deg;
          animation: hfGCargo 4.2s linear infinite;
        }
        @keyframes hfGCargo {
          0%   { offset-distance: 0%; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .hf-g-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: hfGPulse 2.8s ease-out infinite;
        }
        @keyframes hfGPulse {
          0%   { transform: scale(0.5); opacity: 0.5; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .hf-g-orbit {
          offset-rotate: 0deg;
          animation: hfGOrbit 14s linear infinite;
        }
        @keyframes hfGOrbit {
          to { offset-distance: 100%; }
        }
        .hf-g-breathe {
          transform-box: fill-box;
          transform-origin: center;
          animation: hfGBreathe 6s ease-in-out infinite;
        }
        @keyframes hfGBreathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hf-g-meridian, .hf-g-flow, .hf-g-cargo, .hf-g-pulse, .hf-g-orbit, .hf-g-breathe {
            animation: none !important;
          }
          .hf-g-meridian:nth-of-type(odd) { transform: scaleX(0.5); }
        }
      `}</style>
    </div>
  )
}
