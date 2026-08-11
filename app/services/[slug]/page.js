import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { ServicePageSchema, FAQPageSchema, LocalBusinessSchema } from '@/components/SchemaMarkup';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { ArrowRight, Phone, MessageCircle, CheckCircle, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return { title: 'Service Not Found | ProTech Consulting' };
  }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
      url: `https://www.yourdomain.co.ke/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">Service Not Found</h1>
        <p className="text-gray-600 mb-8">The service you are looking for does not exist or has been moved.</p>
        <Link href="/services" className="btn-primary">
          View All Services
        </Link>
      </div>
    );
  }

  const faqs = service.faqs;
  const serviceUrl = `https://www.yourdomain.co.ke/services/${service.slug}`;
  const WHATSAPP_NUMBER = '254707526602';
  const PHONE = '+254 707 526 602';

  return (
    <div>
      <ServicePageSchema service={service.name} description={service.description} url={serviceUrl} />
      <FAQPageSchema faqs={faqs} />
      <LocalBusinessSchema />

      {/* Hero Banner */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom py-16 md:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-4">
              {service.name}
            </h1>
            <p className="text-lg text-white/90 mb-8">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/request-a-quote"
                className="bg-white text-navy-900 hover:bg-primary-50 font-bold px-8 py-4 rounded-xl shadow-xl transition-all flex items-center gap-2"
              >
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-green-600/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Offerings */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title text-center">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {service.subServices.map((sub, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + Quote Form */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="section-title">Why Choose Us</h2>
              <p className="text-gray-600 mb-6">{service.longDescription}</p>
              <div className="space-y-4">
                {[
                  'NCA & EPRA certified professionals',
                  'Countrywide service coverage',
                  '30-minute response time',
                  'Warranty on all work',
                  'Free site assessments',
                  'Transparent pricing',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-heading font-bold text-xl mb-6">Request a Quote for {service.name}</h3>
              <ServiceQuoteForm serviceName={service.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <h2 className="section-title">Pricing</h2>
          <p className="text-gray-600 mb-4">{service.pricing}</p>
          <p className="text-sm text-gray-400">
            *All prices are estimates. Final pricing is determined after a site assessment.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <FAQ faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)' }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8">
            Contact us today for a free, no-obligation quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-a-quote"
              className="bg-white text-navy-900 hover:bg-primary-50 font-bold px-8 py-4 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Get a Quote
            </Link>
            <a
              href={`tel:${PHONE}`}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
