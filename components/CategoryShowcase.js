'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import IconRenderer from './IconRenderer';
import Reveal from './Reveal';

const CATEGORIES = [
  {
    id: 'construction',
    label: 'Construction & Infrastructure',
    icon: 'Building2',
    image: '/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg',
    description: 'Commercial & residential builds, roofing, architectural design, fit-outs, and partitions.',
  },
  {
    id: 'energy',
    label: 'Energy & Sustainability',
    icon: 'Sun',
    image: '/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_1.jpg',
    description: 'EPRA-certified solar, generators, electrical installation, and appliance servicing.',
  },
  {
    id: 'water',
    label: 'Water Systems & Drilling',
    icon: 'Droplets',
    image: '/protech-img/borehole-drilling-water-services/borehole-drilling-water-services_1.jpg',
    description: 'Borehole drilling, purification, plumbing & drainage, and pool construction.',
  },
  {
    id: 'specialized',
    label: 'Specialized Services',
    icon: 'Shield',
    image: '/protech-img/security-systems-physical-security/security-systems-physical-security_1.jpg',
    description: 'Security systems, medical equipment, logistics & freight, and automotive care.',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="section-padding" style={{ background: '#F5F7FA' }}>
      <div className="container-custom">
        <Reveal style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              Explore by Category
            </p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', color: '#1A1A1A' }}>
              Four Categories. One Standard.
            </h2>
          </div>
          <Link href="/services" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#0D47A1',
            color: '#fff',
            fontWeight: 600,
            fontSize: 13,
            padding: '12px 22px',
            borderRadius: 10,
            textDecoration: 'none',
            minHeight: '44px',
          }}>
            View All Services <ArrowRight size={14} />
          </Link>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
        }}>
          {CATEGORIES.map((cat, idx) => (
            <Reveal key={cat.id} delay={idx * 100} variant="scaleIn">
              <Link
                href="/services"
                className="group category-card"
                style={{
                  position: 'relative',
                  borderRadius: 16,
                  overflow: 'hidden',
                  minHeight: 300,
                  display: 'flex',
                  alignItems: 'flex-end',
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,71,161,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(26,26,26,0.15) 0%, rgba(13,71,161,0.75) 70%, rgba(13,71,161,0.9) 100%)' }} />

                <div className="category-card-body" style={{
                  position: 'relative',
                  width: '100%',
                  padding: 20,
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  background: 'rgba(255,255,255,0.1)',
                  borderTop: '1px solid rgba(255,255,255,0.18)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(212,175,55,0.18)', border: '1px solid rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconRenderer name={cat.icon} size={19} style={{ color: '#D4AF37' }} />
                    </div>
                    <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: '#fff', margin: 0 }}>
                      {cat.label}
                    </h3>
                  </div>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, marginBottom: 8 }}>
                    {cat.description}
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#D4AF37' }}>
                    VIEW DETAILS <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}