import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MessageCircle, Phone, Mail } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog-content';

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article Not Found | ProTech Consulting' };
  }
  return {
    title: `${post.title} | ProTech Consulting`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: `${post.title} | ProTech Consulting`,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

const SHARE_PLATFORMS = [
  {
    name: 'Facebook',
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    color: '#1877F2',
  },
  {
    name: 'Twitter',
    href: (u) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent('ProTech Consulting')}`,
    color: '#1DA1F2',
  },
  {
    name: 'WhatsApp',
    href: (u) => `https://wa.me/?text=${encodeURIComponent(u)}`,
    color: '#25D366',
  },
];

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
        <Link href="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const url = `https://www.protech.co.ke/blog/${post.slug}`;

  return (
    <div>
      {/* Editorial header */}
      <section style={{
        background: 'linear-gradient(160deg, #F0FDF4 0%, #fff 60%, #F8FAFC 100%)',
        borderBottom: '1px solid #E2E8F0',
        padding: '64px 0 56px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(234,88,12,0.08) 0%, transparent 40%)',
        }} />
        <div className="container-custom" style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#0F4C2C', fontWeight: 600, fontSize: 14, marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <p className="article-eyebrow" style={{ marginBottom: 14 }}>{post.categoryLabel}</p>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4.5vw, 46px)',
            lineHeight: 1.15,
            color: '#0B1F3A',
            marginBottom: 20,
          }}>
            {post.title}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <span className="article-meta-chip"><Calendar size={13} /> {post.date}</span>
            <span className="article-meta-chip"><Clock size={13} /> {post.readTime}</span>
            <span className="article-meta-chip">{post.word_count?.toLocaleString?.() || post.word_count} words</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-padding" style={{ padding: '64px 0 88px', background: '#fff' }}>
        <div className="container-custom" style={{ maxWidth: 860, margin: '0 auto' }}>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div style={{
            marginTop: 56,
            padding: '32px 32px 28px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(234,88,12,0.25) 0%, transparent 50%)' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', marginBottom: 10 }}>
                Get a Free Quote
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginBottom: 24, maxWidth: 560 }}>
                Every project is different, so get a free, no-obligation quote from ProTech Consultants today. Our team will assess your needs, confirm current market pricing, and guide you through the best option for your situation in Kenya.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-a-quote" className="btn-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <MessageCircle size={16} /> Get a Quote
                </Link>
                <a href="tel:+254707526602" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 6, background: 'rgba(255,255,255,0.14)', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Phone size={15} /> +254 707 526 602
                </a>
                <a href="mailto:protech.ke.group@gmail.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 6, background: 'rgba(255,255,255,0.14)', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  <Mail size={15} /> Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Share */}
          <footer style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <p style={{ fontSize: 14, color: '#64748B', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                Share this article:
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {SHARE_PLATFORMS.map((p) => (
                  <a
                    key={p.name}
                    href={p.href(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '8px 16px',
                      borderRadius: 999,
                      border: `1.5px solid ${p.color}`,
                      color: p.color,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding" style={{ background: '#F8FAFC', padding: '72px 0' }}>
          <div className="container-custom">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Keep Reading</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 'clamp(24px, 3vw, 34px)', color: '#0B1F3A' }}>
                Related Articles
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="related-card">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                    {p.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.coverImage} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ padding: 18 }}>
                    <div className="blog-card__meta" style={{ marginBottom: 8 }}>
                      <span><Calendar size={12} /> {p.date}</span>
                      <span><Clock size={12} /> {p.readTime}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.35, color: '#0B1F3A', margin: 0 }}>
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related site link */}
      <div className="section-padding" style={{ padding: '40px 0 72px', background: '#fff', textAlign: 'center' }}>
        <Link href="/blog" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> All Articles
        </Link>
      </div>
    </div>
  );
}
