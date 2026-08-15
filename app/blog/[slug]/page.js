import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog-content';

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
  };
}

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

  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-8 hover:text-primary-700">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </header>

          <div
            className="prose max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Share this article:</p>
              <div className="flex items-center gap-3">
                <Share2 className="w-4 h-4 text-gray-400" />
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">Facebook</a>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">Twitter</a>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
