import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service }) {
  const { slug, name, startingPrice, heroImage } = service;

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
