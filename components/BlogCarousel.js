'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';

const AUTOPLAY_MS = 1000;

export default function BlogCarousel({
  posts,
  title = 'From Our Blog',
  subtitle = 'Guides, insights and expert advice from ProTech Consulting',
  variant = 'default',
  limit = 12,
  showHeader = true,
}) {
  const [items, setItems] = useState(posts || []);
  const [loaded, setLoaded] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (posts && posts.length) {
      setItems(posts);
      setLoaded(true);
      return;
    }
    fetch(`/api/blog-posts?limit=${limit}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.posts) {
          setItems(data.posts);
          setLoaded(true);
        }
      })
      .catch(() => setLoaded(true));
  }, [posts, limit]);

  const isHome = variant === 'home';
  const visibleItems = items.slice(0, limit);

  const updateState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scroll = track.scrollLeft;
    const width = track.clientWidth;
    setCanPrev(scroll > 4);
    setCanNext(scroll < track.scrollWidth - width - 4);
    const perView = Math.max(1, Math.round(width / 260));
    const pages = Math.max(1, Math.ceil(visibleItems.length / perView));
    setPageCount(pages);
    setPage(Math.min(pages - 1, Math.round(scroll / width)));
  }, [visibleItems.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateState();
    const onResize = () => updateState();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [items.length, updateState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => updateState();
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [updateState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || visibleItems.length <= 3) return;
    timerRef.current = setInterval(() => {
      const width = track.clientWidth;
      const scrollWidth = track.scrollWidth;
      if (track.scrollLeft + width >= scrollWidth - 4) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: width, behavior: 'smooth' });
      }
    }, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [items.length, visibleItems.length]);

  const scrollByPage = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  };

  const goToPage = (p) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: p * track.clientWidth, behavior: 'smooth' });
  };

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    if (visibleItems.length <= 3) return;
    timerRef.current = setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const width = track.clientWidth;
      if (track.scrollLeft + width >= track.scrollWidth - 4) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: width, behavior: 'smooth' });
      }
    }, AUTOPLAY_MS);
  };

  if (!loaded) {
    return (
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container-custom text-center text-gray-500">Loading articles&hellip;</div>
      </section>
    );
  }

  if (!items.length) {
    return null;
  }

  return (
    <section className="section-padding" style={{ background: isHome ? '#F8FAFC' : '#fff' }}>
      <div className="container-custom">
        {showHeader && (
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
              The Journal
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#0B1F3A', marginBottom: 14 }}>
              {title}
            </h2>
            <p style={{ fontSize: 16, color: '#334155', maxWidth: 560, margin: '0 auto' }}>{subtitle}</p>
          </div>
        )}

        <div
          className="blog-carousel"
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <div
            className="blog-carousel__track"
            ref={trackRef}
            style={{
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              cursor: 'grab',
            }}
          >
            {visibleItems.map((post) => (
              <div
                key={post.slug}
                style={{
                  flex: '0 0 auto',
                  width: '100%',
                  padding: '0 10px',
                  scrollSnapAlign: 'start',
                }}
                className="blog-slide"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="blog-card group"
                  style={{ height: '100%', minHeight: isHome ? 360 : 320 }}
                >
                  <div className="blog-card__media">
                    {post.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="blog-card__media-img"
                      />
                    )}
                    <span className="blog-card__category">{post.categoryLabel || post.category}</span>
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <div className="blog-card__meta">
                      <span><Calendar size={12} /> {post.date}</span>
                      <span><Clock size={12} /> {post.readTime}</span>
                    </div>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <span
                      style={{
                        marginTop: 'auto',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#0F4C2C',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Read Article <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {visibleItems.length > 3 && (
            <>
              <button
                aria-label="Previous articles"
                className="blog-carousel__nav blog-carousel__nav--prev"
                onClick={() => scrollByPage(-1)}
                style={{ opacity: canPrev ? 1 : 0.35 }}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                aria-label="Next articles"
                className="blog-carousel__nav blog-carousel__nav--next"
                onClick={() => scrollByPage(1)}
                style={{ opacity: canNext ? 1 : 0.35 }}
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {pageCount > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`blog-carousel__dot ${i === page ? 'active' : ''}`}
                  onClick={() => goToPage(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
