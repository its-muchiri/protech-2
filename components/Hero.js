'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';

const IMAGES = [
  '/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_1.jpg',
  '/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg',
  '/protech-img/swimming-pool-construction/swimming-pool-construction_1.jpg',
  '/protech-img/security-systems-physical-security/security-systems-physical-security_1.jpg',
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section safe-area-top safe-area-bottom" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0B1F3A' }}>
      {IMAGES.map((src, i) => (
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
            opacity: i === active ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out',
          }}
          aria-hidden="true"
        />
      ))}

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(11,31,58,0.88) 0%, rgba(15,76,44,0.72) 50%, rgba(11,31,58,0.85) 100%)',
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, padding: 'var(--space-10) var(--space-6)', width: '100%' }}>
        <div className="hero-content-card" style={{
          maxWidth: 640,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 16,
          padding: 'var(--space-6) var(--space-5)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(234,88,12,0.15)',
            border: '1px solid rgba(234,88,12,0.4)',
            borderRadius: 999,
            padding: 'var(--space-1) var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}>
            <CheckCircle2 size={13} color="#EA580C" />
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: '#EA580C', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              NCA &middot; EPRA &middot; NEMA Certified
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(26px, 4.5vw, 48px)',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 'var(--space-3)',
          }}>
            Kenya&apos;s Most Trusted<br />
            <span style={{ color: '#86EFAC' }}>Multi-Service</span> Contractor
          </h1>

          <p style={{
            fontSize: 'var(--font-size-lg)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.82)',
            marginBottom: 'var(--space-5)',
            maxWidth: 540,
          }}>
            From foundations to solar power, borehole drilling to security systems &mdash; ProTech Consultants delivers <strong>17 professional services</strong> across Kenya, backed by certified engineers and over <strong>500 completed projects</strong>.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Link
              href="/request-a-quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#EA580C',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'var(--font-size-base)',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                minHeight: '48px',
              }}
            >
              <ArrowRight size={15} /> Get a Quote
            </Link>
            <a
              href="tel:0725310112"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#0F4C2C',
                color: '#fff',
                fontWeight: 600,
                fontSize: 'var(--font-size-base)',
                padding: 'var(--space-3) var(--space-5)',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.15s',
                minHeight: '48px',
              }}
            >
              <Phone size={15} /> Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
