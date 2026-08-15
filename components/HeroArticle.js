'use client';

import Link from 'next/link';

export default function HeroArticle({ post }) {
  if (!post) return null;

  return (
    <section className="relative overflow-hidden animate-fadeInUp">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-gray-100">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 max-w-5xl">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-orange-400">
            Featured Story • {post.categoryLabel}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 line-clamp-3">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-gray-200 line-clamp-2 max-w-3xl mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
