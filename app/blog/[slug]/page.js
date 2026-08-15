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
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingProgress />
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Journal', href: '/blog' },
        { label: post.categoryLabel, href: `/blog?category=${post.category}` },
        { label: post.title, href: '#' }
      ]} />
      
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-6">
            {post.categoryLabel}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          <ArticleMetadata post={post} />
          <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-orange-600">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Share this article</h3>
                  <div className="flex flex-col gap-2">
                    {SHARE_PLATFORMS.map((p) => (
                      <a key={p.name} href={p.href(url)} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-orange-600">
                        {p.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-16 bg-gray-900 rounded-xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">Get a Free Quote</h2>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Get a free, no-obligation quote from ProTech Consultants. Our team will assess your needs and guide you through the best option for your situation in Kenya.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/request-a-quote" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700">
                  <MessageCircle size={16} /> Get a Quote
                </Link>
                <a href="tel:0725310112" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20">
                  <Phone size={16} /> 0725310112
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles posts={related} />
      <div className="container mx-auto px-4 py-8">
        <NewsletterCTA />
      </div>
    </div>
  );
}
