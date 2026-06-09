import type { CSSProperties } from 'react'

/**
 * "Global Logistics Network" hero visual.
 * An orthographic dotted-continents globe (real landmass projection) with a
 * curved lat/long graticule, pulsing port nodes sitting on the continents, and
 * glowing trade corridors with flowing cargo particles between them.
 * Pure SVG + CSS transforms/opacity — GPU friendly, no animation library,
 * safe for the above-the-fold hero (LCP).
 */

const C = 300
const R = 206
const LON0 = 10 // view centred over Europe/Africa
const LAT0 = 18 // slight north tilt

const sin = (d: number) => Math.sin((d * Math.PI) / 180)
const cos = (d: number) => Math.cos((d * Math.PI) / 180)

function project(lon: number, lat: number) {
  const dl = lon - LON0
  const cosc = sin(LAT0) * sin(lat) + cos(LAT0) * cos(lat) * cos(dl)
  const x = R * cos(lat) * sin(dl)
  const y = R * (cos(LAT0) * sin(lat) - sin(LAT0) * cos(lat) * cos(dl))
  return { x: C + x, y: C - y, cosc, visible: cosc > 0.02 }
}

// Coarse landmask (lon/lat boxes) — enough to read as continents when dotted.
const LAND: Array<[number, number, number, number]> = [
  // North America
  [-168, -128, 52, 72], [-140, -95, 44, 62], [-128, -70, 30, 50],
  [-118, -90, 23, 33], [-104, -83, 14, 24], [-85, -77, 8, 15],
  // Greenland
  [-52, -22, 60, 80],
  // South America
  [-80, -60, 0, 12], [-79, -46, -16, 0], [-74, -50, -34, -16], [-73, -65, -52, -34],
  // Europe
  [-10, 28, 40, 60], [2, 40, 54, 69], [-10, 2, 36, 44], [20, 44, 38, 49],
  // Africa
  [-17, 40, 13, 34], [-12, 42, -4, 13], [9, 42, -27, -4], [15, 33, -34, -27],
  // Middle East / Arabia
  [34, 60, 13, 33],
  // Asia
  [40, 88, 48, 70], [88, 150, 50, 71], [45, 74, 33, 48], [68, 90, 8, 33],
  [90, 122, 21, 45], [95, 110, 8, 21], [118, 145, 31, 45],
  // Australia
  [113, 153, -38, -12],
]

const isLand = (lon: number, lat: number) =>
  LAND.some(([a, b, c, d]) => lon >= a && lon <= b && lat >= c && lat <= d)

// Precompute land dots (static — painted once).
const DOTS: Array<{ x: number; y: number; o: number; r: number }> = []
for (let lat = -82; lat <= 82; lat += 5) {
  for (let lon = -180; lon < 180; lon += 5) {
    if (!isLand(lon, lat)) continue
    const p = project(lon, lat)
    if (!p.visible) continue
    DOTS.push({ x: p.x, y: p.y, o: 0.22 + 0.6 * p.cosc, r: 1.2 + 0.9 * p.cosc })
  }
}

// Graticule (curved lat/long grid), front hemisphere only.
// Visible points along any single parallel/meridian are contiguous, so a plain
// polyline is correct.
function polyline(pts: Array<{ x: number; y: number }>): string {
  if (pts.length < 2) return ''
  return 'M' + pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')
}
function graticule(): string[] {
  const paths: string[] = []
  for (const lat of [-60, -30, 0, 30, 60]) {
    const pts = []
    for (let lon = -180; lon <= 180; lon += 4) {
      const p = project(lon, lat)
      if (p.visible) pts.push(p)
    }
    const d = polyline(pts)
    if (d) paths.push(d)
  }
  for (let lon = -150; lon <= 150; lon += 30) {
    const pts = []
    for (let lat = -82; lat <= 82; lat += 4) {
      const p = project(lon, lat)
      if (p.visible) pts.push(p)
    }
    const d = polyline(pts)
    if (d) paths.push(d)
  }
  return paths
}
const GRID = graticule()

// Port nodes (sit on the continents).
const NODES = [
  { lon: -74, lat: 40, label: 'US East' },
  { lon: 4, lat: 51, label: 'Europe' },
  { lon: 54, lat: 25, label: 'Middle East' },
  { lon: 73, lat: 19, label: 'India' },
  { lon: 105, lat: 31, label: 'Asia' },
].map((n) => ({ ...n, ...project(n.lon, n.lat) }))

const N = Object.fromEntries(NODES.map((n) => [n.label, n])) as Record<string, (typeof NODES)[number]>

// Trade corridors (required connections + global lanes).
const ROUTES: Array<[string, string, number]> = [
  ['Europe', 'US East', 52], // Europe ↔ USA
  ['Asia', 'Europe', 64], // Asia ↔ Europe
  ['Middle East', 'India', 24], // Middle East ↔ India
  ['Europe', 'Middle East', 40], // global corridor
  ['India', 'Asia', 44], // global corridor
]

function arc(a: { x: number; y: number }, b: { x: number; y: number }, lift: number) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = mx - C
  const dy = my - C
  const len = Math.hypot(dx, dy) || 1
  return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${(mx + (dx / len) * lift).toFixed(1)} ${(
    my +
    (dy / len) * lift
  ).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
}

const ORBIT = 'M 74 300 A 226 90 0 1 1 526 300 A 226 90 0 1 1 74 300'

export function GlobeNetwork() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[120px]" />
      </div>

      <svg
        viewBox="0 0 600 600"
        className="relative h-full w-full"
        fill="none"
        role="img"
        aria-label="Animated global logistics network: continents connected by glowing trade corridors"
      >
        <defs>
          <radialGradient id="gb-sphere" cx="40%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#16203f" />
            <stop offset="58%" stopColor="#0f1730" />
            <stop offset="100%" stopColor="#090f22" />
          </radialGradient>
          <radialGradient id="gb-atmo" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#2b6cdf" stopOpacity="0" />
            <stop offset="92%" stopColor="#2b6cdf" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#2b6cdf" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gb-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#cfe0ff" />
            <stop offset="100%" stopColor="#2b6cdf" />
          </radialGradient>
          <clipPath id="gb-clip">
            <circle cx={C} cy={C} r={R} />
          </clipPath>
        </defs>

        {/* atmosphere */}
        <circle cx={C} cy={C} r={R + 24} fill="url(#gb-atmo)" className="gb-breathe" />
        {/* sphere body + limb */}
        <circle cx={C} cy={C} r={R} fill="url(#gb-sphere)" />
        <circle cx={C} cy={C} r={R} stroke="#4d8bff" strokeOpacity="0.4" strokeWidth="1.1" />

        <g clipPath="url(#gb-clip)">
          {/* graticule */}
          {GRID.map((d, i) => (
            <path key={`g-${i}`} d={d} stroke="#3f6bc4" strokeOpacity="0.22" strokeWidth="0.8" />
          ))}
          {/* dotted continents */}
          {DOTS.map((dot, i) => (
            <circle key={`d-${i}`} cx={dot.x} cy={dot.y} r={dot.r} fill="#4d8bff" fillOpacity={dot.o} />
          ))}
        </g>

        {/* trade corridors + cargo particles */}
        {ROUTES.map(([from, to, lift], i) => {
          const d = arc(N[from], N[to], lift)
          return (
            <g key={`r-${i}`}>
              <path d={d} stroke="#2b6cdf" strokeOpacity="0.25" strokeWidth="1.3" />
              <path
                d={d}
                stroke="#7fb0ff"
                strokeWidth="1.3"
                strokeOpacity="0.6"
                strokeDasharray="3 7"
                className="gb-flow"
              />
              <circle
                r="3"
                fill="#cfe0ff"
                className="gb-cargo"
                style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 0.7}s` } as CSSProperties}
              />
            </g>
          )
        })}

        {/* pulsing port nodes */}
        {NODES.map((n, i) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r="11"
              fill="#2b6cdf"
              fillOpacity="0.18"
              className="gb-pulse"
              style={{ animationDelay: `${i * 0.45}s` } as CSSProperties}
            />
            <circle cx={n.x} cy={n.y} r="3.2" fill="url(#gb-node)" />
          </g>
        ))}

        {/* tilted satellite orbit */}
        <g transform={`rotate(-18 ${C} ${C})`}>
          <path d={ORBIT} stroke="#4d8bff" strokeOpacity="0.16" strokeWidth="1" />
          <circle r="3.2" fill="#7fb0ff" className="gb-orbit" style={{ offsetPath: `path('${ORBIT}')` }} />
        </g>
      </svg>

      <style>{`
        .gb-flow { animation: gbFlow 1.1s linear infinite; }
        @keyframes gbFlow { to { stroke-dashoffset: -10; } }
        .gb-cargo { offset-rotate: 0deg; animation: gbCargo 4.2s linear infinite; }
        @keyframes gbCargo {
          0% { offset-distance: 0%; opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .gb-pulse { transform-box: fill-box; transform-origin: center; animation: gbPulse 2.8s ease-out infinite; }
        @keyframes gbPulse {
          0% { transform: scale(0.5); opacity: 0.5; }
          70% { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .gb-orbit { offset-rotate: 0deg; animation: gbOrbit 15s linear infinite; }
        @keyframes gbOrbit { to { offset-distance: 100%; } }
        .gb-breathe { transform-box: fill-box; transform-origin: center; animation: gbBreathe 6s ease-in-out infinite; }
        @keyframes gbBreathe {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gb-flow, .gb-cargo, .gb-pulse, .gb-orbit, .gb-breathe { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
