'use client';

import Link from 'next/link';
import { ArrowRight, ShieldCheck, Award, FileCheck2, BadgeCheck } from 'lucide-react';

const IMAGES = [
  '/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg',
  '/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_1.jpg',
  '/protech-img/borehole-drilling-water-services/borehole-drilling-water-services_1.jpg',
  '/protech-img/security-systems-physical-security/security-systems-physical-security_1.jpg',
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'NCA Certified' },
  { icon: Award, label: 'EPRA Licensed' },
  { icon: FileCheck2, label: 'NEMA Compliant' },
  { icon: BadgeCheck, label: 'ISO 9001:2015' },
];

export default function Hero() {
  return (
    <section className="hero-section safe-area-top" style={{ position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#1A1A1A' }}>
      {IMAGES.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Brand gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(120deg, rgba(13,71,161,0.92) 0%, rgba(26,26,26,0.7) 55%, rgba(26,26,26,0.55) 100%)',
      }} />

      {/* Gold accent glow */}
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '-8%',
        width: 380,
        height: 380,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(212,175,55,0) 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, padding: 'var(--space-8) var(--space-6)', width: '100%' }}>
        <div className="hero-content-card" style={{
          maxWidth: 620,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.16)',
          borderRadius: 20,
          padding: 'var(--space-6) var(--space-5)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.35)',
            borderRadius: 999,
            padding: '6px 16px',
            marginBottom: 'var(--space-4)',
          }}>
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Kenya&apos;s Premium Multi-Service Contractor
            </span>
          </div>

          <div style={{
            width: 60,
            height: 4,
            borderRadius: 2,
            background: 'linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15))',
            marginBottom: 'var(--space-4)',
          }} />

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(26px, 4.5vw, 48px)',
            lineHeight: 1.12,
            color: '#fff',
            marginBottom: 'var(--space-3)',
          }}>
            Built Right. Delivered Once.<br />
            <span style={{ color: '#D4AF37' }}>Every Time.</span>
          </h1>

          <p style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: 'var(--space-5)',
            maxWidth: 520,
          }}>
            From construction and solar power to boreholes and security systems &mdash;
            one certified partner for every engineering need across Kenya.
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
                padding: '14px 28px',
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

          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            marginTop: 'var(--space-5)',
            alignItems: 'center',
          }}>
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 10,
                padding: '8px 14px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}>
                <Icon size={15} color="#D4AF37" strokeWidth={2} />
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.04em' }}>
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