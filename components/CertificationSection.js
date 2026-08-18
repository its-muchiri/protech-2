'use client';

import Link from 'next/link';
import { ShieldCheck, Award, FileCheck2, BadgeCheck, ArrowRight } from 'lucide-react';

const CERTS = [
  {
    icon: ShieldCheck,
    acronym: 'NCA',
    name: 'National Construction Authority',
    description: 'Fully registered with the NCA, so every build meets Kenya\'s construction standards and your investment is legally protected.',
    benefit: 'Legally compliant, insured projects',
  },
  {
    icon: Award,
    acronym: 'EPRA',
    name: 'Energy & Petroleum Regulatory Authority',
    description: 'Licensed for solar and electrical work, guaranteeing safe, certified installations that comply with national energy regulations.',
    benefit: 'Safe, compliant energy systems',
  },
  {
    icon: FileCheck2,
    acronym: 'NEMA',
    name: 'National Environment Management Authority',
    description: 'NEMA-compliant for boreholes, water extraction, and environmental works — approvals handled end-to-end, so you never chase permits.',
    benefit: 'Environmental permits handled for you',
  },
  {
    icon: BadgeCheck,
    acronym: 'ISO 9001:2015',
    name: 'Quality Management System',
    description: 'Our certified quality management system means documented processes, consistent quality, and accountable delivery on every project.',
    benefit: 'Consistent, audited quality',
  },
];

export default function CertificationSection() {
  return (
    <section style={{ background: '#F5F7FA', padding: '80px 0' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Why Certification Matters
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: '#1A1A1A', marginBottom: 16 }}>
            Fully Certified. Fully Accountable.
          </h2>
          <p style={{ fontSize: 16, color: '#5A6C7D', lineHeight: 1.7 }}>
            Certifications aren&apos;t badges on a wall — they&apos;re a promise. Here&apos;s what each one means for you.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 24,
        }}>
          {CERTS.map(({ icon: Icon, acronym, name, description, benefit }) => (
            <div key={acronym} className="bg-white" style={{
              borderRadius: 12,
              border: '1px solid #E8EBF0',
              borderTop: '4px solid #0D47A1',
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              transition: 'box-shadow 0.3s, transform 0.3s',
            }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(13,71,161,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(13,71,161,0.08)', border: '1px solid rgba(13,71,161,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={24} style={{ color: '#0D47A1' }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: '#1A1A1A', lineHeight: 1.2 }}>{acronym}</div>
                  <div style={{ fontSize: 12, color: '#5A6C7D', lineHeight: 1.35 }}>{name}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: '#5A6C7D', lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
                {description}
              </p>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.02em' }}>
                {benefit}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <Link href="/about" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#6A1B9A',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 10,
            textDecoration: 'none',
            minHeight: '48px',
          }}>
            Learn More About Our Standards <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
