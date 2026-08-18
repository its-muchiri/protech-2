'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  style,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : undefined,
    transition: 'opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`,
    willChange: 'opacity, transform',
  };

  const hidden = {
    fadeInUp: { transform: 'translateY(28px)' },
    fadeIn: { transform: 'none' },
    slideInLeft: { transform: 'translateX(-40px)' },
    slideInRight: { transform: 'translateX(40px)' },
    scaleIn: { transform: 'scale(0.96)' },
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...base, ...(visible ? {} : hidden[variant] || hidden.fadeInUp), ...style }}
    >
      {children}
    </Tag>
  );
}
