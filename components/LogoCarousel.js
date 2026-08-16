'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function LogoCarousel({ 
  items, 
  title, 
  subtitle,
  autoplay = true,
  interval = 2000,
  showArrows = true,
  showDots = true,
  itemsPerView = 5,
  pauseOnHover = true,
  animationDuration = 400,
  className = ''
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  const itemWidth = 100 / itemsPerView;
  const maxIndex = Math.max(0, items.length - itemsPerView);

  const goToSlide = useCallback((index) => {
    if (isAnimating) return;
    const targetIndex = Math.max(0, Math.min(index, maxIndex));
    if (targetIndex === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(targetIndex);
    animationRef.current = setTimeout(() => setIsAnimating(false), animationDuration);
  }, [currentIndex, maxIndex, isAnimating, animationDuration]);

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, nextSlide, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prevSlide, nextSlide]);

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className={`logo-carousel ${className}`} 
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      ref={containerRef}
    >
      {(title || subtitle) && (
        <div className="carousel-header mb-8 text-center">
          {title && <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="carousel-container relative" style={{ overflow: 'hidden' }}>
        <div 
          className="carousel-track flex gap-6"
          style={{ 
            transform: `translateX(-${(currentIndex / Math.max(1, items.length - itemsPerView + 0.001)) * 100}%)`,
            transition: isAnimating ? `transform ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
            willChange: 'transform'
          }}
          role="list"
          aria-label={title || 'Logo carousel'}
        >
          {items.map((item, index) => (
            <div 
              key={item.id || index}
              className="carousel-item flex-shrink-0"
              style={{ flex: `0 0 ${100 / itemsPerView}%`, maxWidth: `100%` }}
              role="listitem"
            >
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="logo-link block group"
                aria-label={`Visit ${item.name}`}
              >
                <div className="logo-card glass-card-hover p-6 md:p-8 text-center h-full transition-all duration-500 hover:shadow-xl">
                  <div className="logo-wrapper mb-4 relative">
                    {item.altLogo && (
                      <img 
                        src={item.altLogo} 
                        alt={`${item.name} (alternate)`}
                        className="logo-image absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                      />
                    )}
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="logo-image relative w-full h-20 md:h-24 object-contain mx-auto transition-all duration-500 group-hover:scale-110 filter grayscale hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="logo-info">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">{item.name}</h3>
                    {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                    <span className="inline-flex items-center gap-1 text-xs text-orange-600 font-medium mt-2 group-hover:gap-2 transition-all">
                      Visit <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {showArrows && items.length > itemsPerView && (
          <>
            <button
              onClick={prevSlide}
              disabled={isAnimating}
              className="carousel-arrow prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 p-3 rounded-full glass-card-hover text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={isAnimating}
              className="carousel-arrow next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 p-3 rounded-full glass-card-hover text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </>
        )}

        {showDots && items.length > itemsPerView && (
          <div className="carousel-dots flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.max(1, items.length - itemsPerView + 1) }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`carousel-dot w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-orange-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}