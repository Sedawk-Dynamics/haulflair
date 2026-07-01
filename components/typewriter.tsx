'use client'

import { useEffect, useState } from 'react'

type TypewriterProps = {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pause?: number
  className?: string
}

/**
 * Cycles through phrases with a type-in / delete-out effect and a blinking
 * cursor — inspired by the GoComet hero label. Client-only (timers), no deps.
 */
export function Typewriter({
  phrases,
  typingSpeed = 75,
  deletingSpeed = 40,
  pause = 1600,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === current) {
      // fully typed — hold, then start deleting
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      // fully deleted — advance to next phrase
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
    } else {
      timeout = setTimeout(
        () =>
          setText((prev) =>
            deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
          ),
        deleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pause])

  return (
    <span className={className}>
      {text}
      <span className="hf-caret ml-0.5 inline-block w-px">|</span>
      <style>{`
        .hf-caret { animation: hfBlink 1s step-end infinite; }
        @keyframes hfBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </span>
  )
}
