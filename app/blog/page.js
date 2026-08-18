import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-content';
import HeroArticle from '@/components/HeroArticle';
import ArticleCard from '@/components/ArticleCard';
import ArticleCarousel from '@/components/ArticleCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchToggle from '@/components/SearchToggle';
import SectionBG from '@/components/SectionBG';

export const metadata = {
  title: 'ProTech Journal | Guides, Insights & Industry News',
  description: 'Editorial guides and industry insights on solar power, water systems, medical equipment, construction and professional services in Kenya.',
};

export default function BlogPage() {
  const blogPosts = getAllPosts();
  const featured = blogPosts[0];
  const topStories = blogPosts.slice(1, 4);
  const latest = blogPosts.slice(4, 10);
  const popular = blogPosts.slice(0, 6);

  return (
    <SectionBG as="div" className="min-h-screen" image="/protech-img/water-filtration-purification/water-filtration-purification_2.jpg" overlay="light">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Journal', href: '/blog' }
      ]} />
      <SearchToggle />
      
      {/* Editorial Hero */}
      <section className="blog-hero relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/protech-img/construction-civil-engineering/construction-civil-engineering_2.jpg" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,71,161,0.92) 0%, rgba(26,26,26,0.85) 100%)' }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <span className="glass-badge inline-block mb-5" style={{background: 'rgba(212,175,55,0.2)', borderColor: 'rgba(212,175,55,0.3)', color: '#D4AF37'}}>
              The ProTech Journal
            </span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Guides, Insights & Industry Knowledge
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
              Expert articles on solar power, water systems, medical equipment, construction and professional services across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featured && (
        <section className="section-tight">
          <div className="container mx-auto px-4">
            <HeroArticle post={featured} />
          </div>
        </section>
      )}

      {/* Top Stories */}
      {topStories.length > 0 && (
        <section className="section-tight">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-gray-900">Top Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {topStories.map(post => (
                <ArticleCard key={post.slug} post={post} variant="editorial" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="section-tight bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link href="/blog" className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2 text-sm">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {latest.map(post => (
              <ArticleCard key={post.slug} post={post} variant="editorial" />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles Carousel */}
      <section className="section-tight">
        <div className="container mx-auto px-4">
          <ArticleCarousel posts={popular} title="Popular This Week" />
        </div>
      </section>

      {blogPosts.length === 0 && (
        <section className="section-tight text-center">
          <p className="text-gray-600">No articles yet. Check back soon.</p>
        </section>
      )}
    </SectionBG>
  );
}

