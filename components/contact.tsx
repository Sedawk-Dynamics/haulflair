'use client'

import { useState } from 'react'
import { Mail, Phone, Send, CheckCircle, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/reveal'

// Web3Forms access key — public by design; it maps submissions to the
// destination inbox configured on web3forms.com.
const WEB3FORMS_ACCESS_KEY = '6997c147-a467-4076-86ee-dccec9588ca5'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New inquiry from the Haulflair website',
          from_name: 'Haulflair Website',
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-sec-page-alt py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-electric/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto mb-16 max-w-xl text-center">
          <span className="section-label is-centered">Get in Touch</span>
          <h2 className="font-display mb-4 mt-4 text-4xl font-bold tracking-tight text-sec-heading text-balance md:text-5xl">
            Ready to Move Cargo?
          </h2>
          <p className="text-[1.0625rem] leading-[1.7] text-sec-body text-pretty">
            Tell us about your shipment or partnership requirements. Our team reviews every inquiry
            and responds within one business day with a clear, transparent plan.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Contact info */}
          <Reveal variant="left" delay={120} className="space-y-6 lg:col-span-2">
            <div>
              <h3 className="font-display mb-6 text-xl font-bold text-sec-heading">Contact Details</h3>
              <div className="space-y-5">
                <ContactItem
                  icon={Phone}
                  label="Phone"
                  lines={[
                    <a key="p1" href="tel:7259963859" className="transition-colors hover:text-sec-heading">
                      +91 7259963859
                    </a>,
                    <a key="p2" href="tel:8310172085" className="transition-colors hover:text-sec-heading">
                      +91 8310172085
                    </a>,
                  ]}
                />
                <ContactItem
                  icon={Mail}
                  label="Email"
                  lines={[
                    <a
                      key="e1"
                      href="mailto:info@haulflair.com"
                      className="transition-colors hover:text-sec-heading"
                    >
                      info@haulflair.com
                    </a>,
                    <a
                      key="e2"
                      href="mailto:sales@haulflair.com"
                      className="transition-colors hover:text-sec-heading"
                    >
                      sales@haulflair.com
                    </a>,
                  ]}
                />
              </div>
            </div>

            <div className="rounded-xl border border-electric/25 bg-electric/8 p-5">
              <p className="text-sm leading-relaxed text-sec-body">
                <span className="font-semibold text-electric">
                  Every inquiry receives a personalised response within one business day.
                </span>{' '}
                No automated replies, no generic quotes.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal variant="right" delay={200} className="lg:col-span-3">
            {submitted ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border border-sec-border bg-sec-card p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-electric/30 bg-electric/15">
                  <CheckCircle size={28} className="text-electric-bright" />
                </div>
                <h3 className="font-display text-xl font-bold text-sec-heading">Message Sent!</h3>
                <p className="max-w-sm text-sm leading-relaxed text-sec-body">
                  Thank you for reaching out. The Haulflair team will review your inquiry and respond
                  within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-sec-border bg-sec-card p-8"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label="Your Name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="John Smith" required />
                  <FormField label="Company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Acme Corp" />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
                  <FormField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sec-body"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your shipment requirements, origin, destination, cargo type..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-lg border border-sec-border bg-sec-card px-4 py-3 text-sm text-sec-heading placeholder:text-mid-grey transition focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric/40"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500">
                    Something went wrong while sending your message. Please try again, or email us
                    directly at{' '}
                    <a href="mailto:sales@haulflair.com" className="font-semibold underline">
                      sales@haulflair.com
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-electric px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-electric/25 transition-all duration-200 hover:bg-electric-bright hover:glow-electric disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                  <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactItem({
  icon: Icon,
  label,
  lines,
}: {
  icon: LucideIcon
  label: string
  lines: React.ReactNode[]
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-electric/30 bg-electric/10">
        <Icon size={15} className="text-electric-bright" />
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-mid-grey">{label}</p>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-sec-body">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-sec-body"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-sec-border bg-sec-card px-4 py-3 text-sm text-sec-heading placeholder:text-mid-grey transition focus:border-electric focus:outline-none focus:ring-1 focus:ring-electric/40"
      />
    </div>
  )
}
