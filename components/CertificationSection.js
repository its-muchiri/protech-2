'use client';

import Link from 'next/link';
import { ShieldCheck, Award, FileCheck2, BadgeCheck, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionBG from './SectionBG';

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
    <SectionBG className="section-padding" image="/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg" overlay="dark" style={{ padding: '64px 0' }}>
      <div className="container-custom">
        <Reveal style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Why Certification Matters
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: '#fff', marginBottom: 16 }}>
            Fully Certified. Fully Accountable.
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
            Certifications aren&apos;t badges on a wall — they&apos;re a promise. Here&apos;s what each one means for you.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 24,
        }}>
          {CERTS.map(({ icon: Icon, acronym, name, description, benefit }, idx) => (
            <Reveal key={acronym} delay={idx * 100}>
              <div className="glass-dark" style={{
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.14)',
                borderTop: '4px solid #D4AF37',
                background: 'rgba(13,71,161,0.35)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s',
              }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(13,71,161,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(13,71,161,0.35)'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={24} style={{ color: '#D4AF37' }} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', lineHeight: 1.2 }}>{acronym}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.35 }}>{name}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
                  {description}
                </p>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.02em' }}>
                  {benefit}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ textAlign: 'center', marginTop: 40 }}>
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
        </Reveal>
      </div>
    </SectionBG>
  );
}
