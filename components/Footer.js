import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = {
  Services: [
    'Construction & Civil Engineering',
    'Solar Power & Renewable Energy',
    'Plumbing & Drainage Services',
    'Roofing Systems & Waterproofing',
    'Electrical Installation & Wiring',
    'Security Systems',
    'Borehole Drilling',
    'Architectural Design',
  ],
  Company: [
    'About Us',
    'Our Team',
    'Projects Portfolio',
    'Testimonials',
    'Careers',
    'Blog',
  ],
  Support: [
    'Request a Quote',
    'Contact Us',
    'FAQ',
    'Terms of Service',
    'Privacy Policy',
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">KC</span>
              </div>
              <span className="font-heading font-bold text-xl">Kenya Consultancy</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Kenya's leading multi-service consultancy. Delivering quality construction,
              solar, plumbing, security, and 15+ professional services nationwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-navy-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-navy-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-lg mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link href={link === 'Request a Quote' ? '/request-a-quote' : `/${link.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>Nairobi, Kenya<br />Servicing Countrywide</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-primary-400 transition-colors">+254 700 000 000</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <a href="mailto:sales@yourdomain.co.ke" className="hover:text-primary-400 transition-colors">sales@yourdomain.co.ke</a>
              </li>
              <li className="text-sm text-gray-400">
                <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400 flex-shrink-0" /> Mon - Sat: 8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Kenya Consultancy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}