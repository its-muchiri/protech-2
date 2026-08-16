'use client';

import { Phone, ArrowRight } from 'lucide-react';

const PHONE = '0725310112';

function StickyBtn({ bg, href, icon: Icon, label, target }) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: '8px 4px',
        background: bg,
        color: '#fff',
        textDecoration: 'none',
        fontSize: 10,
        fontWeight: 600,
        fontFamily: "'Poppins', sans-serif",
        minHeight: '48px',
        minWidth: '48px',
      }}
    >
      <Icon size={16} />
      <span style={{ lineHeight: 1, whiteSpace: 'nowrap' }}>{label}</span>
    </a>
  );
}

export default function StickyBar() {
  return (
    <div className="sticky-bottom-bar safe-area-bottom" style={{
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <StickyBtn bg="#0F4C2C" href={`tel:${PHONE}`} icon={Phone} label="Call" />
      <StickyBtn bg="#EA580C" href="/request-a-quote" icon={ArrowRight} label="Get Quote" />
    </div>
  );
}
