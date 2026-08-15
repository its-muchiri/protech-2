import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-content';
import BlogGrid from '@/components/BlogGrid';

export const metadata = {
  title: 'Blog & Knowledge Hub | ProTech Consulting',
  description: 'Read our latest articles and guides on construction, solar, plumbing, security, medical equipment, safaris and professional services in Kenya.',
};

export default function BlogPage() {
  const blogPosts = getAllPosts();
  const featured = blogPosts[0];

  return (
    <div>
      {/* Editorial Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #0B1F3A 0%, #0F4C2C 100%)',
        padding: '76px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 78% 22%, rgba(234,88,12,0.2) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(134,239,172,0.12) 0%, transparent 50%)',
        }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <p className="article-eyebrow" style={{ color: '#86EFAC', marginBottom: 16 }}>The Journal</p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            fontSize: 'clamp(34px, 5.5vw, 60px)',
            lineHeight: 1.1,
            color: '#fff',
            maxWidth: 720,
            marginBottom: 18,
          }}>
            Ideas, Guides &amp; Insights from ProTech
          </h1>
          <p style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 560,
            marginBottom: 32,
          }}>
            Expert advice on medical equipment, construction, solar, safaris and professional services across Kenya — written in plain language.
          </p>

          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '13px 28px',
                borderRadius: 8,
                background: '#EA580C',
                color: '#fff',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              <span>Read the Latest Feature</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </section>

      {/* Featured editorial card */}
      {featured && (
        <section className="section-padding" style={{ background: '#fff', paddingBottom: 40 }}>
          <div className="container-custom">
            <Link href={`/blog/${featured.slug}`} className="blog-featured-card group" style={{ display: 'block' }}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.coverImage} alt={featured.title} className="blog-featured-card__bg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.4) 60%, rgba(11,31,58,0.15) 100%)' }} />
              </div>
              <div className="blog-featured-card__content">
                <span className="blog-card__category">{featured.categoryLabel}</span>
                <h2 className="blog-featured-card__title">{featured.title}</h2>
                <p className="blog-featured-card__excerpt">{featured.excerpt}</p>
                <div className="blog-featured-card__meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={14} /> {featured.date}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={14} /> {featured.readTime}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#FDBA74', fontWeight: 600 }}>
                    Read Full Article <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All posts with category filter */}
      <section className="section-padding" style={{ background: '#F8FAFC' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 34px)', color: '#0B1F3A', marginBottom: 10 }}>
              Explore All Articles
            </h2>
            <p style={{ fontSize: 15, color: '#475569', maxWidth: 560, margin: '0 auto' }}>
              Filter by topic to find exactly what you need.
            </p>
          </div>

          {blogPosts.length === 0 ? (
            <p className="text-center text-gray-600">No articles yet. Check back soon.</p>
          ) : (
            <BlogGrid posts={blogPosts} />
          )}
        </div>
      </section>
    </div>
  );
}
