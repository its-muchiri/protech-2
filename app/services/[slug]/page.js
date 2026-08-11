import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { ServicePageSchema, FAQPageSchema, LocalBusinessSchema } from '@/components/SchemaMarkup';
import ServiceQuoteForm from '@/components/ServiceQuoteForm';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, MessageCircle, CheckCircle2, MapPin, Star, Shield, Clock, Award } from 'lucide-react';

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
      url: `https://www.protech.co.ke/services/${service.slug}`,
    },
  };
}

const glassPanel = {
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 16,
  padding: '28px 24px',
};

const glassCard = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12,
  padding: '20px',
};

export default function ServicePage({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 36, fontWeight: 700, color: '#0B1F3A', marginBottom: 16 }}>Service Not Found</h1>
        <p style={{ color: '#666', marginBottom: 32, fontSize: 16 }}>The service you are looking for does not exist or has been moved.</p>
        <Link href="/services" style={{ background: '#0F4C2C', color: '#fff', padding: '14px 32px', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: 15 }}>
          View All Services
        </Link>
      </div>
    );
  }

  const faqs = service.faqs || [];
  const gallery = service.gallery || [];
  const subServices = service.subServices || [];
  const remainingImages = gallery.slice(1);
  const serviceUrl = `https://www.protech.co.ke/services/${service.slug}`;
  const PHONE = '+254 707 526 602';
  const WHATSAPP_NUMBER = '254707526602';

  return (
    <div>
      <ServicePageSchema service={service.name} description={service.description} url={serviceUrl} />
      <FAQPageSchema faqs={faqs} />
      <LocalBusinessSchema />

      {/* Hero Banner */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 520, display: 'flex', alignItems: 'center' }}>
        {service.heroImage ? (
          <img
            src={service.heroImage}
            alt={service.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(11,31,58,0.88) 0%, rgba(15,76,44,0.85) 100%)' }} />
        <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '0 auto', padding: '80px 20px', zIndex: 2 }}>
          <div style={{ ...glassPanel, maxWidth: 700, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
            {service.startingPrice && (
              <div style={{ display: 'inline-block', background: 'rgba(234,88,12,0.25)', border: '1px solid rgba(234,88,12,0.5)', borderRadius: 8, padding: '4px 14px', marginBottom: 16 }}>
                <span style={{ color: '#EA580C', fontSize: 13, fontWeight: 600 }}>From {service.startingPrice}</span>
              </div>
            )}
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
              {service.name}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', marginBottom: 32 }}>
              {service.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Link
                href="/request-a-quote"
                style={{
                  background: '#fff',
                  color: '#0B1F3A',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  transition: 'all 0.2s',
                }}
              >
                Get Free Quote <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${PHONE}`}
                style={{
                  background: 'rgba(14,78,44,0.6)',
                  border: '1px solid rgba(14,78,44,0.8)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <Phone size={18} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ padding: '80px 20px', background: '#f8faf9' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, color: '#0B1F3A', textAlign: 'center', marginBottom: 12 }}>
            What We Offer
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 40, fontSize: 15 }}>
            Comprehensive solutions tailored to your needs
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {subServices.map((sub, i) => (
              <div key={i} style={{ ...glassCard, background: '#fff', border: '1px solid rgba(15,76,44,0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(15,76,44,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={18} color="#0F4C2C" />
                  </div>
                  <span style={{ fontSize: 15, color: '#333', fontWeight: 500 }}>{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + Quote Form */}
      <section style={{ padding: '80px 20px', background: '#0B1F3A' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 20 }}>
              Why Choose Us
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)', marginBottom: 28 }}>
              {service.longDescription || service.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Shield, text: 'NCA & EPRA certified professionals' },
                { icon: MapPin, text: 'Countrywide service coverage' },
                { icon: Clock, text: '30-minute response time' },
                { icon: Award, text: 'Warranty on all work' },
                { icon: Star, text: 'Free site assessments' },
                { icon: CheckCircle2, text: 'Transparent pricing' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(14,78,44,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={16} color="#86EFAC" />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...glassPanel, background: 'rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              Request a Quote for {service.name}
            </h3>
            <ServiceQuoteForm serviceName={service.name} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      {remainingImages.length > 0 && (
        <section style={{ padding: '80px 20px', background: '#f8faf9' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, color: '#0B1F3A', textAlign: 'center', marginBottom: 40 }}>
              Our Work
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {remainingImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(15,76,44,0.15)',
                    borderRadius: 14,
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                  }}
                >
                  <img
                    src={img}
                    alt={`${service.name} gallery ${i + 2}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, color: '#0B1F3A', marginBottom: 16 }}>
            Pricing
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 16 }}>
            {service.pricing || 'Pricing is determined after a site assessment. Contact us for a free estimate.'}
          </p>
          <p style={{ fontSize: 13, color: '#999' }}>
            *All prices are estimates. Final pricing is determined after a site assessment.
          </p>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section style={{ padding: '80px 20px', background: '#f8faf9' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <FAQ faqs={faqs} />
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...glassPanel, maxWidth: 600, margin: '0 auto', background: 'rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 30, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 32, fontSize: 15 }}>
              Contact us today for a free, no-obligation quote
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
              <Link
                href="/request-a-quote"
                style={{
                  background: '#fff',
                  color: '#0B1F3A',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <MessageCircle size={18} /> Get a Quote
              </Link>
              <a
                href={`tel:${PHONE}`}
                style={{
                  background: 'rgba(14,78,44,0.5)',
                  border: '1px solid rgba(14,78,44,0.7)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 15,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <Phone size={18} /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
