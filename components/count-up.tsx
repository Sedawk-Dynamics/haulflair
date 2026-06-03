'use client'

import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  /** Numeric target. If the stat is non-numeric (e.g. "Multi-Region"), pass `text` instead. */
  value?: number
  /** Static text to show for non-numeric stats. */
  text?: string
  prefix?: string
  suffix?: string
  durationMs?: number
  className?: string
}

/**
 * Counts up from 0 to `value` once, when scrolled into view.
 * Minimal vanilla JS + requestAnimationFrame — no animation library.
 */
export function CountUp({
  value,
  text,
  prefix = '',
  suffix = '',
  durationMs = 1400,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value != null ? 0 : text ?? '')

  useEffect(() => {
    if (value == null) return
    const el = ref.current
    if (!el) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    let raf = 0
    let started = false

    const animate = () => {
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * value))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true
            animate()
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, durationMs])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
