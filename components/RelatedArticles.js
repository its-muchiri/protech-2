'use client';

import Link from 'next/link';
import ArticleCard from './ArticleCard';

export default function RelatedArticles({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="section-tight bg-gray-50/50">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-gray-900">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.slice(0, 3).map((post) => (
            <ArticleCard key={post.slug} post={post} variant="editorial" />
          ))}
        </div>
      </div>
    </section>
  );
}
