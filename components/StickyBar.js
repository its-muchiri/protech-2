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
        gap: 3,
        padding: '10px 0',
        background: bg,
        color: '#fff',
        textDecoration: 'none',
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'Poppins', sans-serif",
        minHeight: 56,
      }}
    >
      <Icon size={18} />
      <span>{label}</span>
    </a>
  );
}

export default function StickyBar() {
  return (
    <div className="sticky-bottom-bar">
      <StickyBtn bg="#0F4C2C" href={`tel:${PHONE}`} icon={Phone} label="Call" />
      <StickyBtn bg="#EA580C" href="/request-a-quote" icon={ArrowRight} label="Get Quote" />
    </div>
  );
}
