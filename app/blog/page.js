import Link from 'next/link';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-content';

export const metadata = {
  title: 'Blog & Knowledge Hub | ProTech Consulting',
  description: 'Read our latest articles and guides on construction, solar, plumbing, security, and professional services in Kenya.',
};

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Blog & Knowledge Hub</h1>
          <p className="section-subtitle">
            Insights, guides, and tips for your next project in Kenya
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <p className="text-center text-gray-600">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <article key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gray-100 h-48 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-300" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
