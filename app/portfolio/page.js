import { metadata } from '@/app/layout';
import { services } from '@/data/services';
import Link from 'next/link';
import { ArrowRight, ImageIcon } from 'lucide-react';

export const metadata = {
  title: 'Project Portfolio | Kenya Consultancy',
  description: 'Browse our portfolio of completed projects across Kenya. Construction, solar, plumbing, security, and more.',
};

const portfolioItems = [
  { title: 'Nairobi Residential Complex', category: 'Construction', location: 'Nairobi' },
  { title: 'Mombasa Hotel Solar Installation', category: 'Solar', location: 'Mombasa' },
  { title: 'Kisumu Borehole Project', category: 'Borehole', location: 'Kisumu' },
  { title: 'Nakuru Office Fit-Out', category: 'Interior Design', location: 'Nakuru' },
  { title: 'Eldoret Shopping Mall', category: 'Construction', location: 'Eldoret' },
  { title: 'Nairobi Villa Plumbing', category: 'Plumbing', location: 'Nairobi' },
];

export default function PortfolioPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Our Portfolio</h1>
          <p className="section-subtitle">
            Explore our completed projects across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-3">
                  {item.category}
                </span>
                <h3 className="font-heading font-semibold text-lg text-navy-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">More projects coming soon. Follow us on social media for updates.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">Facebook</a>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">Instagram</a>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}