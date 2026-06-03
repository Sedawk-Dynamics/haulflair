'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Why Haulflair', href: '#why-us' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy/80 backdrop-blur-xl border-b border-electric/40 shadow-lg shadow-black/30'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{ animation: 'fadeNavIn 0.6s ease-out both' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="#" className="flex items-center shrink-0" aria-label="Haulflair home">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Haulflair%20logo%20without%20background-UBBXNLpkfxewBdWt7onCbHhz1hMlew.png"
                alt="Haulflair"
                width={240}
                height={70}
                priority
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-light-grey/80 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <a
                href="mailto:sales@haulflair.com"
                className="px-5 py-2.5 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-electric-bright hover:glow-electric transition-all duration-200 shadow-lg shadow-electric/25"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-light-grey hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 z-40 bg-navy/95 backdrop-blur-xl border-b border-electric/30 md:hidden"
          style={{ animation: 'fadeNavIn 0.25s ease-out both' }}
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-light-grey/85 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="mailto:sales@haulflair.com"
                onClick={() => setMenuOpen(false)}
                className="block text-center px-5 py-3 rounded-lg bg-electric text-white text-sm font-semibold hover:bg-electric-bright transition-colors duration-200"
              >
                Get a Quote
              </a>
            </div>
          </nav>
        </div>
      )}

      <style>{`@keyframes fadeNavIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: none; } }`}</style>
    </>
  )
}
