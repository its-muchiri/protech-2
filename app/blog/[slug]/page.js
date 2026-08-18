import Link from 'next/link';
import { MessageCircle, Phone, Mail, ArrowLeft } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog-content';
import ReadingProgress from '@/components/ReadingProgress';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleMetadata from '@/components/ArticleMetadata';
import RelatedArticles from '@/components/RelatedArticles';
import NewsletterCTA from '@/components/NewsletterCTA';

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts();
  // Pre-render only the 50 most recent posts at build time
  return posts.slice(0, 50).map((post) => ({ slug: post.slug }));
}

export const revalidate = 3600; // ISR: regenerate at most once per hour

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article Not Found | ProTech Consulting' };
  }
  return {
    title: `${post.title} | ProTech Journal`,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.coverImage, alt: post.title }],
    },
  };
}

const SHARE_PLATFORMS = [
  { name: 'Facebook', href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: 'Twitter', href: (u) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}` },
  { name: 'WhatsApp', href: (u) => `https://wa.me/?text=${encodeURIComponent(u)}` },
];

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-orange-600 font-semibold">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const url = `https://www.protech.co.ke/blog/${post.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'ProTech Consultants' },
    publisher: { '@type': 'Organization', name: 'ProTech Consultants' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Journal', href: '/blog' },
        { label: post.categoryLabel, href: `/blog?category=${post.category}` },
        { label: post.title, href: '#' }
      ]} />
      
      {/* Hero with Glassmorphism */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-50/50" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 py-10 md:py-16">
          <div className="glass-editorial p-6 md:p-8 max-w-3xl mx-auto animate-fadeInUp">
            <span className="blog-category-tag inline-block mb-4">{post.categoryLabel}</span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5 tracking-tight">
              {post.title}
            </h1>
            <ArticleMetadata post={post} />
          </div>
          <div className="mt-6 relative aspect-[16/9] overflow-hidden rounded-2xl animate-fadeInUp" style={{animationDelay: '150ms'}}>
            <div className="absolute inset-0 glass-hero" />
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover relative z-10" />
          </div>
        </div>
      </section>

      {/* Article Content with Glass Sidebar */}
      <section className="section-tighter">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            {/* Main Article */}
            <article className="glass-editorial p-6 md:p-8 animate-fadeInUp editorial-prose">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {/* Share */}
                <div className="glass-card-hover p-5 animate-fadeInUp" style={{animationDelay: '100ms'}}>
                  <h3 className="font-semibold mb-3 text-gray-900">Share this article</h3>
                  <div className="flex flex-col gap-2">
                    {SHARE_PLATFORMS.map((p) => (
                      <a key={p.name} href={p.href(url)} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-orange-600 transition-colors flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                        {p.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="glass-strong-dark p-6 text-white animate-fadeInUp" style={{animationDelay: '200ms'}}>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent pointer-events-none" />
                  <div className="relative">
                    <h2 className="font-serif text-xl md:text-2xl font-bold mb-3">Get a Free Quote</h2>
                    <p className="text-gray-300 mb-5 max-w-xs text-sm">
                      Get a free, no-obligation quote from ProTech Consultants. Our team will assess your needs and guide you through the best option for your situation in Kenya.
                    </p>
                    <div className="flex flex-col gap-2">
                      <Link href="/request-a-quote" className="glass-btn-cta text-center py-3 px-4 rounded-lg font-semibold text-sm hover:scale-[1.02] transition-transform">
                        <MessageCircle size={14} className="inline-block mr-2" /> Get a Quote
                      </Link>
                      <a href="tel:0725310112" className="glass-btn text-center py-3 px-4 rounded-lg font-semibold text-sm hover:scale-[1.02] transition-transform border border-white/20 bg-white/10">
                        <Phone size={14} className="inline-block mr-2" /> 0725310112
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="section-tighter bg-gray-50/50">
        <div className="container mx-auto px-4">
          <RelatedArticles posts={related} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-tight">
        <div className="container mx-auto px-4">
          <div className="glass-strong p-6 md:p-8 max-w-3xl mx-auto text-center animate-fadeInUp">
            <NewsletterCTA />
          </div>
        </div>
      </section>
    </div>
  );
}
