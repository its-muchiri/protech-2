import { services } from '@/data/services';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Droplets,
  Truck,
  Wrench,
  Sun,
  Home,
  Shield,
  Car,
  Drill,
  Ruler,
  Zap,
  Lightbulb,
  Sofa,
  Frame,
  Heart,
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  Droplets,
  Truck,
  Wrench,
  Sun,
  Home,
  Shield,
  Car,
  Drill,
  Ruler,
  Zap,
  Lightbulb,
  Sofa,
  Frame,
  Heart,
};

export const metadata = {
  title: 'All Services | ProTech Consulting Kenya',
  description: 'Browse all 17+ professional services offered by ProTech Consulting. Construction, Solar, Plumbing, Security, Borehole Drilling and more.',
};

export default function ServicesPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">All Services</h1>
          <p className="section-subtitle">
            Comprehensive multi-service solutions for your construction, commercial, and residential needs across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const ServiceIcon = ICON_MAP[service.icon] || Building2;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card group"
              >
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <ServiceIcon size={28} color="#0F4C2C" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading font-semibold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
