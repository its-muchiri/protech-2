import { metadata } from '@/app/layout';
import Link from 'next/link';
import { Calendar, ArrowRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Blog & Knowledge Hub | Kenya Consultancy',
  description: 'Read our latest articles and guides on construction, solar, plumbing, security, and professional services in Kenya.',
};

const blogPosts = [
  {
    title: 'How to Choose the Right Solar System for Your Home in Kenya',
    excerpt: 'A comprehensive guide to selecting the perfect solar power system based on your energy needs, budget, and location in Kenya.',
    date: '2026-01-15',
    slug: 'solar-system-guide',
  },
  {
    title: 'NCA Compliance: What Every Construction Project in Kenya Needs',
    excerpt: 'Understanding the National Construction Authority requirements for building projects in Kenya to avoid costly delays and penalties.',
    date: '2026-01-10',
    slug: 'nca-compliance-guide',
  },
  {
    title: 'Borehole Drilling: What to Expect and How Much It Costs in 2026',
    excerpt: 'Everything you need to know about borehole drilling costs, licensing, and the drilling process in Kenya.',
    date: '2026-01-05',
    slug: 'borehole-drilling-costs',
  },
  {
    title: 'Water Filtration Systems: RO vs UV vs Traditional Filters',
    excerpt: 'Compare the three main water purification technologies and find the best solution for your home or business in Kenya.',
    date: '2025-12-28',
    slug: 'water-filtration-comparison',
  },
  {
    title: 'Security Systems Guide: CCTV vs Electric Fencing vs Access Control',
    excerpt: 'Which security solution is right for your property? We compare the options and help you make an informed decision.',
    date: '2025-12-20',
    slug: 'security-systems-guide',
  },
  {
    title: 'Office Fit-Out Trends in Nairobi for 2026',
    excerpt: 'Discover the latest trends in office interior design and fit-outs in Nairobi, including smart offices and sustainable design.',
    date: '2025-12-15',
    slug: 'office-fitout-trends-2026',
  },
];

export default function BlogPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Blog & Knowledge Hub</h1>
          <p className="section-subtitle">
            Insights, guides, and tips for your next project in Kenya
          </p>
        </div>

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
      </div>
    </div>
  );
}