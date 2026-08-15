'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ArticleCard({ post, variant = 'standard' }) {
  if (!post) return null;

  const imageSrc = post.coverImage || '/protech-img/protech-6.png';
  
  if (variant === 'featured') {
    return (
      <article className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white hover-lift animate-fadeInUp">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img 
              src={imageSrc} 
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-wider text-orange-400">
                {post.categoryLabel}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight text-white line-clamp-3">
                {post.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-200">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover-lift animate-fadeInUp">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={imageSrc} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {post.categoryLabel}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-serif text-lg font-bold leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
          <time>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </article>
  );
}
