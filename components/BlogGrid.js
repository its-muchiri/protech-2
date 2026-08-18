'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const ALL = 'All';

export default function BlogGrid({ posts }) {
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.categoryLabel).filter(Boolean));
    return [ALL, ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    if (active === ALL) return posts;
    return posts.filter((p) => p.categoryLabel === active);
  }, [posts, active]);

  const shown = filtered.slice(0, visibleCount);

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`blog-filter-pill ${active === cat ? 'active' : ''}`}
            onClick={() => { setActive(cat); setVisibleCount(12); }}
          >
            {cat}
            <span style={{ opacity: 0.7, fontSize: 12, marginLeft: 6 }}>
              {cat === ALL ? posts.length : posts.filter((p) => p.categoryLabel === cat).length}
            </span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-center text-gray-500">No articles in this category yet. Check back soon.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
          {shown.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card group">
              <div className="blog-card__media">
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt={post.title} loading="lazy" className="blog-card__media-img" />
                )}
                <span className="blog-card__category">{post.categoryLabel}</span>
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
                    color: '#0D47A1',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Read Article <ArrowRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {visibleCount < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            className="btn-outline"
            onClick={() => setVisibleCount((c) => c + 12)}
          >
            Load More Articles ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </>
  );
}
