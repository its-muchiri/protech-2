'use client';

import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-content';
import HeroArticle from '@/components/HeroArticle';
import ArticleCard from '@/components/ArticleCard';
import ArticleCarousel from '@/components/ArticleCarousel';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogSearch from '@/components/BlogSearch';
import { useState } from 'react';

export default function BlogPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const blogPosts = getAllPosts();
  const featured = blogPosts[0];
  const topStories = blogPosts.slice(1, 4);
  const latest = blogPosts.slice(4, 10);
  const popular = blogPosts.slice(0, 6);

  return (
    <div className="bg-white">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Journal', href: '/blog' }
      ]} />
      <BlogSearch onClose={() => setSearchOpen(false)} />
      
      {/* Editorial Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 md:py-24 relative">
        <button
          onClick={() => setSearchOpen(true)}
          className="absolute top-6 right-6 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-white/20"
        >
          <Search size={18} /> Search
        </button>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-4">The ProTech Journal</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Guides, Insights & Industry Knowledge
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Expert articles on solar power, water systems, medical equipment, construction and professional services across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featured && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <HeroArticle post={featured} />
          </div>
        </section>
      )}

      {/* Top Stories */}
      {topStories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Top Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topStories.map(post => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">Latest Articles</h2>
            <Link href="/blog" className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map(post => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles Carousel */}
      <ArticleCarousel posts={popular} title="Popular This Week" />

      {blogPosts.length === 0 && (
        <section className="py-24 text-center">
          <p className="text-gray-600">No articles yet. Check back soon.</p>
        </section>
      )}
    </div>
  );
}

