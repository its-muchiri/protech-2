'use client';

import Link from 'next/link';

export default function HeroArticle({ post }) {
  if (!post) return null;

  return (
    <section className="relative overflow-hidden animate-fadeInUp">
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent group-hover:from-black/90 transition-all duration-700" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 lg:p-10 max-w-5xl">
          <div className="glass-badge inline-block mb-4" style={{background: 'rgba(212,175,55,0.2)', borderColor: 'rgba(212,175,55,0.3)', color: '#D4AF37'}}>
            Featured Story • {post.categoryLabel}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 line-clamp-3 tracking-tight">
            {post.title}
          </h1>
          <p className="text-base md:text-lg text-gray-200 line-clamp-2 max-w-3xl mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <time>{post.date}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </section>
  );
}
