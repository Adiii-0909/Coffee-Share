'use client'

import React, { JSX, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Cloud, Lock, MessageCircle, Shield, Smartphone, Zap } from 'lucide-react'

const faqs = [
  {
    q: 'Do you store files on your servers?',
    a: 'No. Files stream directly between peers over WebRTC and are never staged on CoffeeShare infrastructure.',
  },
  {
    q: 'Can I lock my transfer?',
    a: 'Yes. You can add a password to any transfer and optionally enable one-time burn-after-pour links.',
  },
  {
    q: 'What if my transfer is large?',
    a: 'CoffeeShare is built for high-volume sessions. Throughput adapts to network conditions in real time.',
  },
  {
    q: 'Can I communicate with the receiver while sending?',
    a: 'Yes. Live chat and voice/video call controls stay available throughout the session.',
  },
]

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: '🤝',
    title: 'You connect',
    desc: 'Open Coffee Share and connect to a peer.',
  },
  {
    step: 2,
    icon: '📤',
    title: 'You share',
    desc: 'Send or receive files directly.',
  },
  {
    step: 3,
    icon: '🔒',
    title: 'We stay out',
    desc: 'No servers in between. Just pure P2P.',
  },
  {
    step: 4,
    icon: '✅',
    title: "It's done",
    desc: 'Fast, secure, and privacy-first.',
  },
]

export default function MarketingSections(): JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [themePreset, setThemePreset] = useState<'ember' | 'ocean' | 'neon'>('ember')

  const applyThemePreset = (preset: 'ember' | 'ocean' | 'neon'): void => {
    setThemePreset(preset)
    document.documentElement.setAttribute('data-color-theme', preset)
    window.localStorage.setItem('coffeeshare-color-theme', preset)
  }

  React.useEffect(() => {
    const storedPreset = window.localStorage.getItem('coffeeshare-color-theme') as
      | 'ember'
      | 'ocean'
      | 'neon'
      | null

    const preset = storedPreset ?? 'ember'
    setThemePreset(preset)
    document.documentElement.setAttribute('data-color-theme', preset)
  }, [])

  return (
    <div className="w-full mt-20 space-y-16 pb-6">
      {/* How CoffeeShare works */}
      <section className="surface rounded-3xl p-6 md:p-8">
        <h2 className="heading-display text-2xl md:text-3xl font-bold text-center mb-8">How Coffee Share works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <motion.div
              key={item.step}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 12 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--brand)] text-[var(--text-inverse)] text-[10px] font-bold flex items-center justify-center">
                  {item.step}
                </span>
              </div>
              <h3 className="text-primary font-semibold text-sm">{item.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="w-full">
        <div className="flex items-end justify-between mb-6">
          <h2 className="heading-display text-3xl md:text-4xl font-bold">Built for speed and trust</h2>
          <span className="text-muted text-sm hidden md:block">WebRTC native transfer pipeline</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <motion.article whileHover={{ y: -4 }} className="panel rounded-2xl p-5 md:col-span-4">
            <p className="text-xs uppercase tracking-wider text-brand mb-2">Live Transfer Preview</p>
            <h3 className="heading-display text-2xl font-semibold mb-2">Watch transfer status update in real time</h3>
            <p className="text-secondary text-sm mb-4">
              Sender and receiver are visualized as linked nodes with animated stream indicators.
            </p>
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-brand" />
                </div>
                <span className="text-secondary text-sm">Sender</span>
              </div>
              <div className="flex-1 mx-4 h-[2px] bg-[var(--border-subtle)] relative overflow-hidden">
                <span
                  className="absolute left-0 top-[-3px] w-2.5 h-2.5 rounded-full bg-[var(--brand)] shadow-[0_0_8px_var(--brand-soft)] animate-transfer-dot"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-secondary text-sm">Receiver</span>
                <div className="w-11 h-11 rounded-full bg-[var(--bg-muted)] border border-[var(--border-subtle)] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-brand" />
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article whileHover={{ y: -4 }} className="panel rounded-2xl p-5 md:col-span-2">
            <p className="text-xs uppercase tracking-wider text-brand mb-2">Social Proof</p>
            <h3 className="heading-display text-2xl font-semibold">Trusted by privacy-first teams</h3>
            <ul className="mt-4 space-y-2 text-sm text-secondary">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> No signup required</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> Cross-platform sessions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> End-to-end encrypted links</li>
            </ul>
          </motion.article>

          <motion.article whileHover={{ y: -4 }} className="panel rounded-2xl p-5 md:col-span-2">
            <Zap className="w-5 h-5 text-brand mb-3" />
            <h3 className="heading-display text-xl font-semibold mb-2">Fast startup</h3>
            <p className="text-secondary text-sm">Start transfer in seconds with direct peer negotiation.</p>
          </motion.article>
          <motion.article whileHover={{ y: -4 }} className="panel rounded-2xl p-5 md:col-span-2">
            <Lock className="w-5 h-5 text-brand mb-3" />
            <h3 className="heading-display text-xl font-semibold mb-2">Password + burn mode</h3>
            <p className="text-secondary text-sm">Control access and auto-close links after first successful download.</p>
          </motion.article>
          <motion.article whileHover={{ y: -4 }} className="panel rounded-2xl p-5 md:col-span-2">
            <MessageCircle className="w-5 h-5 text-brand mb-3" />
            <h3 className="heading-display text-xl font-semibold mb-2">Live collaboration</h3>
            <p className="text-secondary text-sm">Chat and call without breaking your transfer flow.</p>
          </motion.article>
        </div>
      </section>

      {/* How it works - legacy vs coffee */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <article className="panel rounded-2xl p-6">
          <h3 className="heading-display text-2xl font-semibold mb-4">Legacy cloud flow</h3>
          <div className="flex items-center gap-3 text-muted mb-4">
            <Smartphone className="w-5 h-5" />
            <ArrowRight className="w-4 h-4" />
            <Cloud className="w-5 h-5" />
            <ArrowRight className="w-4 h-4" />
            <Smartphone className="w-5 h-5" />
          </div>
          <p className="text-secondary text-sm">Double transfer path, cloud staging delays, and higher exposure surface.</p>
        </article>

        <article className="panel rounded-2xl p-6 border-[var(--brand)] border-opacity-40">
          <h3 className="heading-display text-2xl font-semibold mb-4">CoffeeShare flow</h3>
          <div className="flex items-center gap-3 text-brand mb-4">
            <Smartphone className="w-5 h-5" />
            <div className="h-[2px] flex-1 bg-[var(--brand-soft)]" />
            <Smartphone className="w-5 h-5" />
          </div>
          <p className="text-secondary text-sm">Direct encrypted peer channel with near-instant session startup and no cloud storage.</p>
        </article>
      </section>

      {/* Security */}
      <section id="security" className="surface rounded-3xl p-6 md:p-8">
        <h3 className="heading-display text-3xl font-semibold mb-6">Security that earns trust</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-brand mb-2">Encryption</p>
            <p className="text-secondary text-sm">WebRTC DTLS transport secures data in transit end-to-end.</p>
          </div>
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-brand mb-2">No storage</p>
            <p className="text-secondary text-sm">Files are not uploaded to persistent cloud buckets.</p>
          </div>
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-brand mb-2">Control</p>
            <p className="text-secondary text-sm">Password-protect and expire links using burn-after-pour mode.</p>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" className="panel rounded-2xl p-6">
        <h3 className="heading-display text-3xl font-semibold mb-2">Theme presets</h3>
        <p className="text-secondary text-sm mb-4">
          Switch your CoffeeShare accent mood instantly. Your choice is saved locally.
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { id: 'ember', label: 'Ember', swatch: '#c8a97e' },
            { id: 'ocean', label: 'Ocean', swatch: '#7eb8c8' },
            { id: 'neon', label: 'Neon', swatch: '#8ec87e' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyThemePreset(preset.id as 'ember' | 'ocean' | 'neon')}
              className={`btn ${themePreset === preset.id ? 'btn-hero' : 'btn-ghost'}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: preset.swatch }}
              />
              {preset.label}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="surface rounded-3xl p-6 md:p-8">
        <h3 className="heading-display text-3xl font-semibold mb-6">FAQ</h3>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div key={faq.q} className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
              <button
                className="w-full text-left p-4 min-h-[44px] flex items-center justify-between hover:bg-[var(--bg-muted)] transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="text-primary font-semibold">{faq.q}</span>
                <span className="text-brand text-lg">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-secondary text-sm">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
