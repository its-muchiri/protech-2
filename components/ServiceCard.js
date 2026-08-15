import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, variant = 'standard' }) {
  const { slug, name, startingPrice, heroImage, description, subServices, icon } = service;

  if (variant === 'featured') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        style={{ minHeight: 380, display: 'flex', flexDirection: 'column' }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={heroImage}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 leading-snug">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{description}</p>
          {startingPrice && (
            <span className="text-primary-600 font-semibold text-sm mb-3 block">From {startingPrice}</span>
          )}
          <div className="flex flex-wrap gap-1 mb-4">
            {subServices?.slice(0, 3).map((sub, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {sub}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-primary-600 font-semibold text-sm mt-auto">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/services/${slug}`}
        className="group block p-5 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
        style={{ display: 'flex', flexDirection: 'column', minHeight: 220 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
            <icon.size={22} style={{ color: '#0F4C2C' }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 leading-snug">{name}</h3>
            <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          {startingPrice && (
            <span className="text-primary-600 font-semibold text-sm">From {startingPrice}</span>
          )}
          <span className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm">
            Details <ArrowRight size={13} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/services/${slug}`}
      className="service-glass-card group block overflow-hidden"
    >
      <div className="service-glass-card__image-wrap">
        <Image
          src={heroImage}
          alt={name}
          fill
          className="service-glass-card__image"
        />
      </div>

      <div className="service-glass-card__overlay">
        <div className="service-glass-card__content">
          <h3 className="service-glass-card__name">{name}</h3>

          {startingPrice && (
            <span className="service-glass-card__price">
              From {startingPrice}
            </span>
          )}

          <span className="service-glass-card__cta">
            View Details <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
