import type { CSSProperties } from 'react'

/**
 * Hero trade-lane visual (design brief, Hero Option A).
 * Stylised map of Haulflair's core corridors — European origin ports to
 * US East-Coast ports — with electric-blue arcs and CSS-animated pulse dots
 * travelling along each route. Pure SVG + CSS; zero JS animation library.
 */

type Node = { x: number; y: number; label: string }

const EU_NODES: Node[] = [
  { x: 150, y: 150, label: 'Gdansk' },
  { x: 120, y: 215, label: 'Hamburg' },
  { x: 110, y: 285, label: 'Rotterdam' },
  { x: 140, y: 355, label: 'Le Havre' },
]

const US_NODES: Node[] = [
  { x: 470, y: 200, label: 'Newark' },
  { x: 495, y: 285, label: 'Norfolk' },
  { x: 490, y: 360, label: 'Charleston' },
  { x: 455, y: 430, label: 'Savannah' },
]

// One arc per origin→destination corridor.
const ROUTES = [
  { from: EU_NODES[0], to: US_NODES[0], lift: 90 },
  { from: EU_NODES[1], to: US_NODES[1], lift: 70 },
  { from: EU_NODES[2], to: US_NODES[2], lift: 60 },
  { from: EU_NODES[3], to: US_NODES[3], lift: 80 },
]

function arcPath(from: Node, to: Node, lift: number) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2 - lift
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`
}

export function RouteMap() {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* soft electric glow behind the map */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[120px]" />
      </div>

      <svg
        viewBox="0 0 600 600"
        className="relative h-full w-full"
        fill="none"
        role="img"
        aria-label="Trade lanes connecting European origin ports to US East Coast ports"
      >
        <defs>
          <radialGradient id="hf-node" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4d8bff" />
            <stop offset="100%" stopColor="#2b6cdf" />
          </radialGradient>
        </defs>

        {/* faint landmass dot grid for context */}
        <g opacity="0.10" fill="#7fa8ff">
          {Array.from({ length: 13 }).map((_, r) =>
            Array.from({ length: 13 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={40 + c * 42} cy={40 + r * 42} r="1.3" />
            )),
          )}
        </g>

        {ROUTES.map((route, i) => {
          const d = arcPath(route.from, route.to, route.lift)
          const dotStyle: CSSProperties = {
            offsetPath: `path('${d}')`,
            animationDelay: `${i * 0.9}s`,
          }
          return (
            <g key={i}>
              {/* base arc */}
              <path d={d} stroke="#2b6cdf" strokeWidth="1.5" opacity="0.35" />
              {/* animated dashed overlay */}
              <path d={d} className="route-line" stroke="#4d8bff" strokeWidth="1.5" opacity="0.6" />
              {/* travelling pulse dot */}
              <circle r="4" fill="#7fb0ff" className="route-dot" style={dotStyle} />
            </g>
          )
        })}

        {/* origin + destination nodes */}
        {[...EU_NODES, ...US_NODES].map((n, i) => (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r="9"
              fill="#2b6cdf"
              opacity="0.18"
              className="route-node"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
            <circle cx={n.x} cy={n.y} r="4" fill="url(#hf-node)" />
          </g>
        ))}
      </svg>
    </div>
  )
}
