'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import IconRenderer from './IconRenderer';

export default function ServiceCard({ service, variant = 'standard' }) {
  const { slug, name, startingPrice, description, subServices, icon: iconName, stat } = service;

  if (variant === 'featured') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block transition-all duration-300"
        style={{ borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.55)', textDecoration: 'none', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)', transition: 'box-shadow 0.3s ease, transform 0.3s ease' }}
      >
        <div style={{ height: 4, background: 'linear-gradient(90deg, #6A1B9A, #D4AF37)' }} />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start gap-4 mb-4">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(106,27,154,0.08)', border: '1px solid rgba(106,27,154,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <IconRenderer name={iconName} size={24} style={{ color: '#6A1B9A' }} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-gray-900 mb-1 leading-snug" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18 }}>{name}</h3>
              {stat && <span style={{ fontSize: 12, fontWeight: 600, color: '#0D47A1', letterSpacing: '0.03em' }}>{stat}</span>}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4" style={{ color: '#5A6C7D', lineHeight: 1.65 }}>{description}</p>
          <div className="flex flex-col gap-2 mb-4">
            {subServices?.slice(0, 3).map((sub, i) => (
              <span key={i} className="flex items-start gap-2 text-sm" style={{ color: '#1A1A1A', fontSize: 13.5 }}>
                <Check size={15} style={{ color: '#D4AF37', marginTop: 2, flexShrink: 0 }} strokeWidth={3} />
                {sub}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {startingPrice ? (
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0D47A1' }}>From {startingPrice}</span>
            ) : <span />}
            <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: '#6A1B9A' }}>
              VIEW DETAILS <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block p-6 transition-all duration-300"
        style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.55)', display: 'flex', flexDirection: 'column', minHeight: 240, textDecoration: 'none', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)' }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(106,27,154,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <div style={{ height: 3, background: 'linear-gradient(90deg, #6A1B9A, #D4AF37)', borderRadius: 2, marginBottom: 20 }} />
        <div className="flex items-start gap-4">
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(106,27,154,0.08)', border: '1px solid rgba(106,27,154,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconRenderer name={iconName} size={22} style={{ color: '#6A1B9A' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 leading-snug" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, color: '#1A1A1A' }}>{name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2" style={{ color: '#5A6C7D' }}>{description}</p>
          </div>
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          {startingPrice ? (
            <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0D47A1' }}>From {startingPrice}</span>
          ) : <span />}
          <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: '#6A1B9A' }}>
            VIEW DETAILS <ArrowRight size={13} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/services/${slug}`}
      className="group block p-6 transition-all duration-300"
      style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.55)', display: 'flex', flexDirection: 'column', minHeight: 260, textDecoration: 'none', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 32px rgba(106,27,154,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ height: 3, background: 'linear-gradient(90deg, #6A1B9A, #D4AF37)', borderRadius: 2, marginBottom: 20 }} />
      <div className="flex items-start gap-4">
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(106,27,154,0.08)', border: '1px solid rgba(106,27,154,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <IconRenderer name={iconName} size={24} style={{ color: '#6A1B9A' }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1 leading-snug" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 17, color: '#1A1A1A' }}>{name}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2" style={{ color: '#5A6C7D', lineHeight: 1.6 }}>{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {subServices?.slice(0, 3).map((sub, i) => (
          <span key={i} className="flex items-start gap-2 text-sm" style={{ color: '#1A1A1A', fontSize: 13 }}>
            <Check size={14} style={{ color: '#D4AF37', marginTop: 2, flexShrink: 0 }} strokeWidth={3} />
            {sub}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-3 flex items-center justify-between">
        {startingPrice ? (
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0D47A1' }}>From {startingPrice}</span>
        ) : <span />}
        <span className="inline-flex items-center gap-1 font-semibold text-sm" style={{ color: '#6A1B9A' }}>
          VIEW DETAILS <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}
