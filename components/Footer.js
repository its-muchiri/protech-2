'use client';

import Link from 'next/link';
import { Building2, Phone, MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/254707526602?text=Hello%20ProTech%20Consultants%2C%20I%20would%20like%20to%20request%20a%20quote.';
const PHONE = '+254 707 526 602';

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

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#0B1F3A', color: 'rgba(255,255,255,0.75)', paddingTop: 64, paddingBottom: 32 }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>
          {/* Col 1: Brand */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, textDecoration: 'none' }}>
              <div style={{ width: 36, height: 36, background: '#EA580C', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={20} color="#fff" strokeWidth={2} />
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
                <a key={s} href="#" style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.1)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 700, textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>

          {/* Col 2: Top Services */}
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Top Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TOP_SERVICES.map(s => (
                <Link key={s} href="/services" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#86EFAC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {COMPANY_LINKS.map(l => (
                <Link key={l.label} href={l.href} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#86EFAC')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 16 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`tel:${PHONE}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.55 }}>
                <Phone size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span>{PHONE}</span>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', lineHeight: 1.55 }}>
                <MessageCircle size={14} style={{ marginTop: 2, flexShrink: 0, color: '#86EFAC' }} />
                <span>WhatsApp Us</span>
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
                <span key={c} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 4, padding: '2px 8px' }}>{c}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{currentYear} ProTech Consultants Ltd. All rights reserved. Nairobi, Kenya.</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>NCA Reg - EPRA Cert - ISO 9001:2015</span>
        </div>
      </div>
    </footer>
  );
}
