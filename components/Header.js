'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react';

const topBarItems = [
  { icon: Phone, text: '+254 700 000 000', href: 'tel:+254700000000' },
  { icon: Mail, text: 'sales@yourdomain.co.ke', href: 'mailto:sales@yourdomain.co.ke' },
  { icon: MapPin, text: 'Nairobi, Kenya - Servicing Countrywide', href: '#' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const serviceCategories = [
  'Construction & Civil Engineering',
  'Swimming Pool Construction',
  'Medical Equipment & Supplies',
  'Logistics & Freight Services',
  'Technical Repairs & Appliance Servicing',
  'Water Filtration & Purification',
  'Solar Power & Renewable Energy',
  'Roofing Systems & Waterproofing',
  'Plumbing & Drainage Services',
  'Security Systems & Physical Security',
  'Garage & Automotive Services',
  'Borehole Drilling & Water Services',
  'Architectural Design & House Plans',
  'Generator Sales & Repair',
  'Electrical Installation & Wiring',
  'Interior Design & Office Fit-Outs',
  'Office Partitions & Glass Works',
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="hidden md:block bg-navy-900 text-white text-xs">
        <div className="container-custom flex flex-wrap items-center justify-between py-2 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {topBarItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-1.5 hover:text-primary-400 transition-colors"
              >
                <item.icon className="w-3 h-3" />
                <span>{item.text}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/254700000000?text=Hello%2C%20I%20am%20interested%20in%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/5' : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KC</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-navy-900 text-lg leading-tight">Kenya Consultancy</span>
                <span className="block text-xs text-gray-500">Multi-Service Solutions</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-navy-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="px-4 py-2 text-sm font-medium text-navy-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all flex items-center gap-1">
                  All Services
                  <ChevronDown className="w-4 h-4" />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl shadow-navy-900/10 border border-gray-100 py-2 min-w-[280px] z-50">
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/services/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+254700000000"
                className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link href="/request-a-quote" className="btn-primary text-sm !px-5 !py-2.5">
                Free Quote
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-navy-700 hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container-custom py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-navy-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/request-a-quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center btn-primary text-sm mt-2"
                >
                  Request Free Quote
                </Link>
                <a
                  href="https://wa.me/254700000000?text=Hello%2C%20I%20am%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center mt-2 text-sm font-semibold text-green-600 hover:text-green-700"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}