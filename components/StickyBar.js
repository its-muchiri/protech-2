'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ChevronUp } from 'lucide-react';

export default function StickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-bottom-bar">
      <div className="container-custom flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <a
            href="tel:+254700000000"
            className="flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-primary-600 transition-colors"
          >
            <Phone className="w-5 h-5 text-primary-600" />
            <span className="hidden sm:inline">+254 700 000 000</span>
          </a>
          <a
            href="https://wa.me/254700000000?text=Hello%2C%20I%20need%20a%20quote"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/request-a-quote" className="btn-primary text-sm !py-2 !px-4">
            Get Free Quote
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}