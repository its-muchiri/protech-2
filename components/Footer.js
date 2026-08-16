'use client';

import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, Clock } from 'lucide-react';

const PHONE = '0725310112';

const TOP_SERVICES = [
  'Construction & Building',
  'Solar Power Installation',
  'Plumbing Services',
  'Borehole Drilling',
  'Security Systems',
  'Electrical Works',
  'Interior Design',
  'Roofing Works',
];

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'All Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Request a Quote', href: '/request-a-quote' },
];

const CERTS = ['NCA', 'EPRA', 'NEMA', 'KRA', 'ERC', 'ISO'];

const glassPanel = {
  background: 'rgba(15,76,44,0.85)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 16,
  padding: '24px 20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
};

const linkStyle = {
  fontSize: '13px',
  color: 'rgba(255,255,255,0.65)',
  textDecoration: 'none',
  transition: 'color 0.15s',
  display: 'block',
  padding: '6px 0',
  minHeight: '40px',
  display: 'flex',
  alignItems: 'center',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="animate-fadeIn safe-area-bottom"
      style={{
        background: 'linear-gradient(160deg, #0B1F3A 0%, #0F4C2C 100%)',
        color: 'rgba(255,255,255,0.75)',
        paddingTop: 48,
        paddingBottom: 'calc(32px + env(safe-area-inset-bottom))',
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {/* Col 1: Brand */}
          <div style={glassPanel}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, textDecoration: 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/protech-img/protech-logo-2.png" alt="ProTech Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', lineHeight: 1.1 }}>ProTech Consultants</div>
              </div>
            </Link>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
              Kenya&apos;s trusted multi-service contractor. NCA, EPRA, NEMA, KRA and ISO certified, delivering 17 professional services across the country.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Fb', 'Tw', 'Li', 'Yt'].map(s => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 11,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    minWidth: '36px',
                    minHeight: '36px',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(14,78,44,0.5)';
                    e.currentTarget.style.borderColor = 'rgba(14,78,44,0.7)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Top Services */}
          <div style={glassPanel}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 12 }}>Top Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {TOP_SERVICES.map(s => (
                <Link
                  key={s}
                  href="/services"
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#86EFAC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div style={glassPanel}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 12 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {COMPANY_LINKS.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.currentTarget.style.color = '#86EFAC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div style={glassPanel}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 12 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.5, minHeight: '44px' }}>
                <Phone size={14} style={{ flexShrink: 0, color: '#86EFAC' }} />
                <span>{PHONE}</span>
              </a>

              <a href="mailto:protech.ke.group@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.5, minHeight: '44px' }}>
                <Mail size={14} style={{ flexShrink: 0, color: '#86EFAC' }} />
                <span>protech.ke.group@gmail.com</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, minHeight: '44px' }}>
                <MapPin size={14} style={{ flexShrink: 0, color: '#86EFAC' }} />
                <span>Nairobi, Kenya</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, minHeight: '44px' }}>
                <Clock size={14} style={{ flexShrink: 0, color: '#86EFAC' }} />
                <span style={{ whiteSpace: 'pre-line' }}>{'Mon-Sat: 7am-7pm\nEmergency: 24/7'}</span>
              </div>
            </div>

            <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CERTS.map(c => (
                <span
                  key={c}
                  className="glass-badge"
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#fff',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    minHeight: '28px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', maxWidth: 'calc(100% - 120px)' }}>
            &copy; {currentYear} ProTech Consultants Ltd. All rights reserved. Nairobi, Kenya.
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>
            NCA Reg - EPRA Cert - ISO 9001:2015
          </span>
        </div>
      </div>
    </footer>
  );
}
