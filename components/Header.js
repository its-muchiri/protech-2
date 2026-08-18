'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';

const PHONE = '0725310112';

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
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <header className="animate-fadeIn glass-nav safe-area-top" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'box-shadow 0.3s, background 0.3s',
      boxShadow: scrolled ? '0 4px 24px rgba(13,71,161,0.25)' : 'none',
    }}>
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0 }}>
          <Image
            src="/protech-img/protech-logo-2.png"
            alt="ProTech Consultants"
            width={120}
            height={36}
            style={{ height: 'auto', width: 'auto', maxHeight: 36 }}
            priority
            sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 140px"
          />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">
          {NAV_LINKS.map(l => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: active ? '#fff' : 'rgba(255,255,255,0.85)',
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  padding: '8px 4px',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = active ? '#fff' : 'rgba(255,255,255,0.85)')}
              >
                {l.label}
                <span style={{
                  position: 'absolute',
                  bottom: 2,
                  left: 4,
                  right: 4,
                  height: 2,
                  borderRadius: 2,
                  background: active ? 'linear-gradient(90deg, #6A1B9A, #D4AF37)' : 'transparent',
                }} />
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={`tel:${PHONE}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: 500, textDecoration: 'none', padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', minHeight: '40px' }}
            className="desktop-only"
          >
            <Phone size={13} />
            {PHONE}
          </a>
          <Link
            href="/request-a-quote"
            style={{
              background: '#D4AF37',
              color: '#fff',
              fontWeight: 600,
              fontSize: 12,
              padding: '8px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.15s',
              minHeight: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Get a Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'none', padding: '8px', borderRadius: 8, minWidth: '40px', minHeight: '40px', background: 'rgba(255,255,255,0.1)' }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'rgba(26,26,26,0.97)',
          padding: '16px 20px 24px',
          borderTop: '1px solid rgba(212,175,55,0.25)',
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
        }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'block',
                color: isActive(l.href) ? '#D4AF37' : 'rgba(255,255,255,0.95)',
                fontSize: 16,
                fontWeight: 500,
                padding: '14px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={`tel:${PHONE}`}
              style={{
                flex: 1,
                minWidth: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#6A1B9A',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '14px 16px',
                borderRadius: 10,
                textDecoration: 'none',
                minHeight: '48px',
              }}
            >
              <Phone size={15} /> Call Us
            </a>
            <Link
              href="/request-a-quote"
              style={{
                flex: 1,
                minWidth: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: '#D4AF37',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '14px 16px',
                borderRadius: 10,
                textDecoration: 'none',
                minHeight: '48px',
              }}
            >
              <MessageCircle size={15} /> Get Quote
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; justify-content: center; }
        }
        @media (max-width: 375px) {
          .container-custom { padding: 0 12px !important; }
        }
      `}
      </style>
    </header>
  );
}
