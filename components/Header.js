'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/254707526602?text=Hello%20ProTech%20Consultants%2C%20I%20would%20like%20to%20request%20a%20quote.';
const PHONE = '+254 707 526 602';

const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: scrolled ? 'rgba(15,76,44,0.88)' : 'rgba(15,76,44,0.55)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.18)' : 'none',
      transition: 'background 0.3s, box-shadow 0.3s',
    }}>
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/protech-img/protech-logo-2.png"
            alt="ProTech Consultants"
            width={140}
            height={40}
            style={{ height: 'auto', width: 'auto', maxHeight: 40 }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href={`tel:${PHONE}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}
            className="desktop-only"
          >
            <Phone size={14} />
            {PHONE}
          </a>
          <Link
            href="/request-a-quote"
            style={{
              background: '#EA580C',
              color: '#fff',
              fontWeight: 600,
              fontSize: 13,
              padding: '9px 20px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none' }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(10,56,32,0.92)',
          padding: '16px 24px 24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.9)',
                fontSize: 15,
                fontWeight: 500,
                padding: '12px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <a
              href={`tel:${PHONE}`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: '#0F4C2C',
                color: '#fff',
                fontWeight: 600,
                fontSize: 13,
                padding: '10px 0',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              <Phone size={14} /> Call Us
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: '#25D366',
                color: '#fff',
                fontWeight: 600,
                fontSize: 13,
                padding: '10px 0',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
