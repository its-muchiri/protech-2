import { metadata } from '@/app/layout';
import { services } from '@/data/services';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export async function generateStaticParams() {
  const posts = [
    { slug: 'solar-system-guide' },
    { slug: 'nca-compliance-guide' },
    { slug: 'borehole-drilling-costs' },
    { slug: 'water-filtration-comparison' },
    { slug: 'security-systems-guide' },
    { slug: 'office-fitout-trends-2026' },
  ];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) {
    return { title: 'Article Not Found | Kenya Consultancy' };
  }
  return {
    title: `${post.title} | Kenya Consultancy`,
    description: post.excerpt,
  };
}

function getBlogPost(slug) {
  const posts = [
    {
      slug: 'solar-system-guide',
      title: 'How to Choose the Right Solar System for Your Home in Kenya',
      excerpt: 'A comprehensive guide to selecting the perfect solar power system based on your energy needs, budget, and location in Kenya.',
      date: '2026-01-15',
      readTime: '8 min read',
      content: `
        <p>Kenya's abundant sunshine makes solar power an excellent investment for homeowners and businesses alike. With electricity costs rising and EPRA incentives for renewable energy, now is the best time to go solar.</p>
        <h2>Assess Your Energy Needs</h2>
        <p>Start by reviewing your electricity bills from the past 12 months. Calculate your average monthly consumption in kWh. A typical Kenyan household uses 150-300 kWh per month.</p>
        <h2>Choose the Right System Type</h2>
        <p><strong>Off-Grid Systems:</strong> Ideal for areas without reliable grid access. Includes solar panels, charge controller, battery bank, and inverter.</p>
        <p><strong>Grid-Tie Systems:</strong> Connect to the national grid. Excess power can be sold back through net metering programs.</p>
        <p><strong>Hybrid Systems:</strong> Combine solar with battery backup and grid connection for maximum reliability.</p>
        <h2>Budget Considerations</h2>
        <p>Residential solar systems in Kenya typically range from KES 150,000 for a basic 1kW system to KES 5,000,000+ for a 10kW commercial system. EPRA-certified designs may qualify for tax incentives.</p>
      `,
    },
    {
      slug: 'nca-compliance-guide',
      title: 'NCA Compliance: What Every Construction Project in Kenya Needs',
      excerpt: 'Understanding the National Construction Authority requirements for building projects in Kenya to avoid costly delays and penalties.',
      date: '2026-01-10',
      readTime: '6 min read',
      content: `
        <p>The National Construction Authority (NCA) regulates all construction activities in Kenya. Compliance is mandatory for any building project exceeding a certain value.</p>
        <h2>NCA Registration Requirements</h2>
        <p>All contractors must be registered with the NCA. Registration categories range from A (largest firms) to F (smaller firms). Ensure your contractor holds a valid NCA certificate.</p>
        <h2>Building Permit Process</h2>
        <p>Before starting any construction, you must obtain a building permit from the relevant county government. This involves submitting architectural plans, structural calculations, and site surveys.</p>
        <h2>Common Compliance Issues</h2>
        <p>Failing to obtain NCA registration, proceeding without building permits, or using unregistered contractors can result in fines, project stoppage, and legal action.</p>
      `,
    },
    {
      slug: 'borehole-drilling-costs',
      title: 'Borehole Drilling: What to Expect and How Much It Costs in 2026',
      excerpt: 'Everything you need to know about borehole drilling costs, licensing, and the drilling process in Kenya.',
      date: '2026-01-05',
      readTime: '7 min read',
      content: `
        <p>Borehole drilling is a significant investment for Kenyan property owners seeking water independence. Understanding the costs and process is essential for making an informed decision.</p>
        <h2>Cost Breakdown</h2>
        <p>A standard residential borehole in Kenya costs between KES 200,000 and KES 1,000,000 depending on depth, geology, and equipment needed.</p>
        <h2>The Drilling Process</h2>
        <p>1. Hydrogeological survey to identify water-bearing formations. 2. NEMA licensing application. 3. Drilling (typically 3-14 days). 4. Test pumping and water quality testing. 5. Pump installation.</p>
        <h2>NEMA Licensing</h2>
        <p>The National Environment Management Authority (NEMA) requires a water extraction license for all boreholes. Our team assists with the entire licensing process.</p>
      `,
    },
    {
      slug: 'water-filtration-comparison',
      title: 'Water Filtration Systems: RO vs UV vs Traditional Filters',
      excerpt: 'Compare the three main water purification technologies and find the best solution for your home or business in Kenya.',
      date: '2025-12-28',
      readTime: '5 min read',
      content: `
        <p>Kenya's water quality varies significantly by region. Choosing the right filtration system depends on your water source, contamination levels, and intended use.</p>
        <h2>Reverse Osmosis (RO)</h2>
        <p>RO systems remove dissolved salts, heavy metals, and microorganisms. Best for borehole water with high TDS levels. Typical cost: KES 50,000 - KES 500,000.</p>
        <h2>UV Purification</h2>
        <p>UV systems disinfect water by killing bacteria and viruses. Best as a secondary treatment after sediment filtration. Does not remove dissolved solids.</p>
        <h2>Traditional Filters</h2>
        <p>Activated carbon and sediment filters remove chlorine, taste, and odor. Best for municipal water with basic contamination. Most affordable option.</p>
      `,
    },
    {
      slug: 'security-systems-guide',
      title: 'Security Systems Guide: CCTV vs Electric Fencing vs Access Control',
      excerpt: 'Which security solution is right for your property? We compare the options and help you make an informed decision.',
      date: '2025-12-20',
      readTime: '6 min read',
      content: `
        <p>Kenya's security landscape requires a multi-layered approach. The right combination of systems depends on your property type, budget, and risk assessment.</p>
        <h2>CCTV Cameras</h2>
        <p>Modern IP cameras offer HD resolution, night vision, and cloud-based monitoring. Starting from KES 50,000 for a basic 4-camera system.</p>
        <h2>Electric Fencing</h2>
        <p>Electric fencing provides a physical and psychological deterrent. Ideal for rural properties, estates, and commercial premises.</p>
        <h2>Access Control</h2>
        <p>Key card, biometric, and PIN-based access control systems manage who enters your premises. Essential for offices, schools, and multi-tenant buildings.</p>
      `,
    },
    {
      slug: 'office-fitout-trends-2026',
      title: 'Office Fit-Out Trends in Nairobi for 2026',
      excerpt: 'Discover the latest trends in office interior design and fit-outs in Nairobi, including smart offices and sustainable design.',
      date: '2025-12-15',
      readTime: '5 min read',
      content: `
        <p>Nairobi's commercial real estate market is evolving rapidly. Modern office fit-outs in 2026 prioritize flexibility, sustainability, and employee well-being.</p>
        <h2>Hot Desking and Flexible Spaces</h2>
        <p>Post-pandemic office design emphasizes flexibility. Hot desking, movable partitions, and multi-purpose spaces are in high demand.</p>
        <h2>Sustainable Design</h2>
        <p>Green building features including energy-efficient lighting, natural ventilation, and recycled materials are becoming standard in Nairobi office fit-outs.</p>
        <h2>Smart Office Technology</h2>
        <p>IoT-enabled lighting, HVAC, and security systems that can be controlled via mobile apps are transforming the Nairobi office landscape.</p>
      `,
    },
  ];
  return posts.find((p) => p.slug === slug) || null;
}

export default function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);

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
                <a href="#" className="text-sm text-primary-600 hover:text-primary-700">WhatsApp</a>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}