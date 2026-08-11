'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';

const IMAGES = [
  '/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_1.jpg',
  '/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg',
  '/protech-img/swimming-pool-construction/swimming-pool-construction_1.jpg',
  '/protech-img/security-systems-physical-security/security-systems-physical-security_1.jpg',
];

const WHATSAPP_LINK = 'https://wa.me/254707526602?text=Hello%20ProTech%20Consultants%2C%20I%20would%20like%20to%20request%20a%20quote.';

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#0B1F3A' }}>
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

      <div className="container-custom" style={{ position: 'relative', zIndex: 1, padding: '80px 64px', width: '100%' }}>
        <div style={{
          maxWidth: 640,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: '48px 44px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(234,88,12,0.15)',
            border: '1px solid rgba(234,88,12,0.4)',
            borderRadius: 999,
            padding: '6px 16px',
            marginBottom: 28,
          }}>
            <CheckCircle2 size={14} color="#EA580C" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#EA580C', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              NCA &middot; EPRA &middot; NEMA Certified
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            lineHeight: 1.08,
            color: '#fff',
            marginBottom: 20,
          }}>
            Kenya&apos;s Most Trusted<br />
            <span style={{ color: '#86EFAC' }}>Multi-Service</span> Contractor
          </h1>

          <p style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.82)',
            marginBottom: 36,
            maxWidth: 540,
          }}>
            From foundations to solar power, borehole drilling to security systems &mdash; ProTech Consultants delivers <strong>17 professional services</strong> across Kenya, backed by certified engineers and over <strong>500 completed projects</strong>.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link
              href="/request-a-quote"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#EA580C',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 28px',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <ArrowRight size={16} /> Get a Quote
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#25D366',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                padding: '14px 28px',
                borderRadius: 10,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
