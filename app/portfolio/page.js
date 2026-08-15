import { services } from '@/data/services';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Project Portfolio | ProTech Consulting',
  description: 'Browse our portfolio of completed projects across Kenya. Construction, solar, plumbing, security, and more.',
};

const portfolioItems = [
  { title: 'Nairobi Residential Complex', category: 'Construction', location: 'Nairobi', image: '/protech-img/construction-civil-engineering/construction-civil-engineering_2.jpg' },
  { title: 'Mombasa Hotel Solar Installation', category: 'Solar', location: 'Mombasa', image: '/protech-img/solar-power-renewable-energy/solar-power-renewable-energy_2.jpg' },
  { title: 'Kisumu Borehole Project', category: 'Borehole', location: 'Kisumu', image: '/protech-img/borehole-drilling-water-services/borehole-drilling-water-services_2.jpg' },
  { title: 'Nakuru Office Fit-Out', category: 'Interior Design', location: 'Nakuru', image: '/protech-img/interior-design-office-fitouts/interior-design-office-fitouts_2.jpg' },
  { title: 'Eldoret Shopping Mall', category: 'Construction', location: 'Eldoret', image: '/protech-img/construction-civil-engineering/construction-civil-engineering_3.jpg' },
  { title: 'Nairobi Villa Plumbing', category: 'Plumbing', location: 'Nairobi', image: '/protech-img/plumbing-drainage-services/plumbing-drainage-services_2.jpg' },
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
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
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