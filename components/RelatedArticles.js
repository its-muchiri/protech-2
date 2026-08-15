'use client';

import Link from 'next/link';
import ArticleCard from './ArticleCard';

export default function RelatedArticles({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-12">
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.slice(0, 3).map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
