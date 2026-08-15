import LeadForm from '@/components/LeadForm';

export const metadata = {
  title: 'About Us | ProTech Consulting',
  description: 'Learn about ProTech Consulting - your trusted multi-service partner for construction, solar, plumbing, security, and professional services across Kenya.',
};

export default function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">About ProTech Consulting</h1>
          <p className="section-subtitle">
            We are Kenya&apos;s trusted multi-service consultancy, delivering quality and reliability across 17+ service lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              ProTech Consulting was founded with a vision to provide comprehensive, professional services to Kenyan businesses and homeowners. With over 5 years of experience and 500+ completed projects, we have established ourselves as a trusted partner in the construction and professional services industry.
            </p>
            <p className="text-gray-600 mb-4">
              Our team of certified professionals brings together expertise in construction, renewable energy, plumbing, security, and more. We are committed to delivering quality work on time and within budget.
            </p>
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { number: '500+', label: 'Projects Completed' },
                { number: '17+', label: 'Service Lines' },
                { number: '5+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary-600">{stat.number}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-80">
            <img
              src="/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg"
              alt="ProTech Consulting construction project"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="section-title text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Quality First', desc: 'We never compromise on the quality of our work. Every project meets the highest standards.' },
              { title: 'Integrity', desc: 'We are transparent in our pricing, timelines, and communication with every client.' },
              { title: 'Customer Focus', desc: 'Your satisfaction is our priority. We go the extra mile to exceed expectations.' },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <h3 className="font-heading font-semibold text-lg text-navy-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-10">
          <h2 className="font-heading font-bold text-2xl text-navy-900 mb-4 text-center">Ready to Work With Us?</h2>
          <p className="text-gray-600 text-center mb-8">Get a free, no-obligation quote for your next project.</p>
          <div className="max-w-lg mx-auto">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}