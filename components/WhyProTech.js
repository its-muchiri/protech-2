'use client';

import Link from 'next/link';
import { Layers, ShieldCheck, MapPin, PackageCheck, IndianRupee, LifeBuoy, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const POINTS = [
  {
    icon: Layers,
    title: 'Multi-Disciplinary Expertise',
    description: 'One certified partner for construction, energy, water, and security — no vendor fragmentation.',
  },
  {
    icon: ShieldCheck,
    title: 'NCA, EPRA & NEMA Certified',
    description: 'Fully licensed and compliant, with every project executed to national regulatory standards.',
  },
  {
    icon: MapPin,
    title: 'Countrywide Coverage',
    description: 'Dedicated teams across all 47 counties with local supply chains for rapid deployment.',
  },
  {
    icon: PackageCheck,
    title: 'Turnkey Delivery',
    description: 'From design and approvals through installation and maintenance — all handled in-house.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Pricing',
    description: 'Detailed BOQs, no hidden costs, milestone-based payments, and fixed-price options.',
  },
  {
    icon: LifeBuoy,
    title: '24/7 Support',
    description: 'Emergency response for power, water, security, and medical equipment — SLA-backed.',
  },
];

export default function WhyProTech() {
  return (
    <section className="section-padding" style={{ background: '#ffffff' }}>
      <div className="container-custom">
        <Reveal style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Why ProTech
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: '#1A1A1A', marginBottom: 16 }}>
            Built on Certification, Delivered with Accountability
          </h2>
          <p style={{ fontSize: 16, color: '#5A6C7D', lineHeight: 1.7 }}>
            We don&apos;t just deliver services — we build lasting partnerships through expertise, transparency, and accountability.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {POINTS.map(({ icon: Icon, title, description }, idx) => (
            <Reveal key={title} delay={(idx % 3) * 100}>
              <div className="bg-white" style={{
                borderRadius: 12,
                border: '1px solid #E8EBF0',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'box-shadow 0.3s, transform 0.3s',
              }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(106,27,154,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(106,27,154,0.08)', border: '1px solid rgba(106,27,154,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={24} style={{ color: '#6A1B9A' }} strokeWidth={2} />
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, color: '#1A1A1A', marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14.5, color: '#5A6C7D', lineHeight: 1.65 }}>
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ textAlign: 'center', marginTop: 40 }}>
          <Link href="/services" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#0D47A1',
            color: '#fff',
            fontWeight: 600,
            fontSize: 14,
            padding: '14px 28px',
            borderRadius: 10,
            textDecoration: 'none',
            minHeight: '48px',
          }}>
            Explore All Services <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
