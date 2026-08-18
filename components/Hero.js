'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, BadgeCheck, Award, FileCheck2 } from 'lucide-react';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'NCA Certified' },
  { icon: Award, label: 'EPRA Licensed' },
  { icon: FileCheck2, label: 'NEMA Compliant' },
  { icon: BadgeCheck, label: 'ISO 9001:2015' },
];

export default function Hero() {
  return (
    <section className="hero-section safe-area-top safe-area-bottom" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#1A1A1A' }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #0D47A1 0%, #1A1A1A 100%)',
      }} />

      {/* Subtle gold accent glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '-10%',
        width: 420,
        height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-8%',
        width: 480,
        height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(106,27,154,0.25) 0%, rgba(106,27,154,0) 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, padding: 'var(--space-10) var(--space-6)', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.35)',
            borderRadius: 999,
            padding: '8px 18px',
            marginBottom: 'var(--space-5)',
          }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Kenya&apos;s Premium Multi-Service Contractor
            </span>
          </div>

          {/* Gold accent line */}
          <div style={{
            width: 72,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15))',
            marginBottom: 'var(--space-5)',
          }} />

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 54px)',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 'var(--space-4)',
          }}>
            Built Right.<br />
            Delivered <span style={{ color: '#D4AF37' }}>Once.</span><br />
            Every Time.
          </h1>

          <p style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.82)',
            marginBottom: 'var(--space-6)',
            maxWidth: 540,
          }}>
            From construction and solar power to boreholes and security systems &mdash;
            ProTech Consultants is Kenya&apos;s certified, accountable partner for every
            engineering need. Four service categories. One standard of excellence.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link
              href="/request-a-quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#D4AF37',
                color: '#1A1A1A',
                fontWeight: 700,
                fontSize: 'var(--font-size-base)',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                minHeight: '48px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EFBF47'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; }}
            >
              GET YOUR FREE ASSESSMENT <ArrowRight size={16} />
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            flexWrap: 'wrap',
            marginTop: 'var(--space-6)',
            alignItems: 'center',
          }}>
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 10,
                padding: '10px 16px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}>
                <Icon size={16} color="#D4AF37" strokeWidth={2} />
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
