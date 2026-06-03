'use client'

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Direction of the entrance translation */
  variant?: 'up' | 'left' | 'right'
  /** Stagger delay in milliseconds */
  delay?: number
  /** Element to render as (default: div) */
  as?: ElementType
  className?: string
  /** Trigger margin — how far into the viewport before revealing */
  rootMargin?: string
} & Record<string, unknown>

/**
 * Lightweight scroll-reveal wrapper. Pure CSS animation toggled by a single
 * IntersectionObserver — no animation library, negligible INP impact.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as,
  className = '',
  rootMargin = '0px 0px -80px 0px',
  ...rest
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin, threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shown, rootMargin])

  const variantClass = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${shown ? 'in-view' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
