'use client';

import { useState, useRef, useEffect } from 'react';
import ArticleCard from './ArticleCard';

export default function ArticleCarousel({ posts, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.carousel-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        setCurrentIndex(index);
      }
    }
  };

  return (
    <section className="my-12">
      {title && <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">{title}</h2>}
      <div 
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {posts.map((post, index) => (
          <div key={post.slug} className="carousel-card snap-start shrink-0 w-full sm:w-[80%] lg:w-[30%]">
            <ArticleCard post={post} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-orange-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
