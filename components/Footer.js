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
  padding: '28px 24px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="animate-fadeIn"
      style={{
        background: 'linear-gradient(160deg, #0B1F3A 0%, #0F4C2C 100%)',
        color: 'rgba(255,255,255,0.75)',
        paddingTop: 64,
        paddingBottom: 32,
      }}
    >
      <div className="container-custom">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
            marginBottom: 48,
          }}
        >
          {/* Col 1: Brand */}
          <div style={glassPanel}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/protech-img/protech-logo-2.png" alt="ProTech Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, color: '#fff', lineHeight: 1.1 }}>ProTech Consultants</div>
              </div>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
              Kenya&apos;s trusted multi-service contractor. NCA, EPRA, NEMA, KRA and ISO certified, delivering 17 professional services across the country.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
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
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Top Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TOP_SERVICES.map(s => (
                <Link
                  key={s}
                  href="/services"
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
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
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {COMPANY_LINKS.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.15s',
                  }}
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
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.55 }}>
                <Phone size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span>{PHONE}</span>
              </a>

              <a href="mailto:protech.ke.group@gmail.com" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.55 }}>
                <Mail size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span>protech.ke.group@gmail.com</span>
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
                <MapPin size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span>Nairobi, Kenya</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
                <Clock size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span style={{ whiteSpace: 'pre-line' }}>{'Mon-Sat: 7am-7pm\nEmergency: 24/7'}</span>
              </div>
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CERTS.map(c => (
                <span
                  key={c}
                  className="glass-badge"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.2)',
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
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            &copy; {currentYear} ProTech Consultants Ltd. All rights reserved. Nairobi, Kenya.
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            NCA Reg - EPRA Cert - ISO 9001:2015
          </span>
        </div>
      </div>
    </footer>
  );
}
