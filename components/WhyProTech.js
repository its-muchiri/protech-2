'use client';

import Link from 'next/link';
import { Layers, ShieldCheck, MapPin, PackageCheck, IndianRupee, LifeBuoy, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';
import SectionBG from './SectionBG';

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
    <SectionBG className="section-padding" image="/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_2.jpg" overlay="dark" style={{ padding: '64px 0' }}>
      <div className="container-custom">
        <Reveal style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Why ProTech
          </p>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: '#fff', marginBottom: 16 }}>
            Built on Certification, Delivered with Accountability
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
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
              <div className="glass-dark" style={{
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(13,71,161,0.35)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'box-shadow 0.3s, transform 0.3s, background 0.3s',
              }} onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = 'rgba(13,71,161,0.5)'; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(13,71,161,0.35)'; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(106,27,154,0.3)', border: '1px solid rgba(106,27,154,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={24} style={{ color: '#D4AF37' }} strokeWidth={2} />
                </div>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 18, color: '#fff', marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
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
            background: '#6A1B9A',
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
    </SectionBG>
  );
}
