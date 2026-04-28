'use client'

import React, { JSX } from 'react'

export function Footer(): JSX.Element {
  return (
    <footer className="w-full z-40 border-t border-[var(--border-subtle)] bg-[rgba(26,20,16,0.85)] backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center gap-4">
        {/* CTA row */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => document.getElementById('drop-zone-button')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-hero text-sm"
          >
            Start a secure share
          </button>
          <button
            onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-ghost text-sm"
          >
            Read FAQ
          </button>
        </div>

        {/* Tagline */}
        <p className="text-secondary text-sm text-center leading-relaxed">
          ☕{' '}
          <span className="font-semibold text-brand">CoffeeShare</span>
          {' '}is open source. Built with{' '}
          <span className="text-[#c96050]">❤️</span>
          {' '}for a better way to share.
        </p>

        {/* Tech stack */}
        <p className="text-muted text-xs tracking-wider uppercase">
          next.js · peerjs · webrtc
        </p>
      </div>
    </footer>
  )
}

export default Footer
