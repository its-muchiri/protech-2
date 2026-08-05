import Hero from '@/components/Hero';
import LeadForm from '@/components/LeadForm';
import TrustBadges from '@/components/TrustBadges';
import FAQ from '@/components/FAQ';
import PriceEstimator from '@/components/PriceEstimator';
import { services } from '@/data/services';
import { siteFAQs } from '@/data/faqs';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Shield, Star } from 'lucide-react';

const featuredServices = services.slice(0, 6);

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive multi-service solutions for your construction, commercial, and residential needs across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="service-card group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-heading font-semibold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline inline-flex items-center gap-2">
              View All 17 Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Why Choose Kenya Consultancy?</h2>
              <p className="text-gray-600 mb-8">
                We deliver quality, reliability, and value across all our service lines. Here is why Kenyan businesses and homeowners trust us.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Shield, title: 'NCA & EPRA Certified', desc: 'All our construction and solar projects meet the highest regulatory standards.' },
                  { icon: Clock, title: 'Fast Response', desc: 'We respond to all inquiries within 30 minutes during business hours.' },
                  { icon: CheckCircle, title: 'Quality Guarantee', desc: 'Every project comes with a warranty and our commitment to excellence.' },
                  { icon: Star, title: '500+ Completed Projects', desc: 'Trusted by homeowners, businesses, and government agencies across Kenya.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-navy-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h3 className="font-heading font-bold text-xl mb-6 text-center">Quick Quote</h3>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">Price Estimator</h2>
            <p className="section-subtitle">
              Get a rough estimate for your project in seconds
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PriceEstimator />
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle">
              Trusted by homeowners, businesses, and organizations across Kenya
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'James Mwangi', location: 'Nairobi', text: 'Excellent construction quality. Our residential project was completed on time and within budget. Highly recommended!', rating: 5 },
              { name: 'Sarah Wanjiku', location: 'Mombasa', text: 'The solar installation team was professional and knowledgeable. Our business now saves 60% on electricity costs.', rating: 5 },
              { name: 'David Ochieng', location: 'Kisumu', text: 'Professional plumbing and drainage services. They resolved a chronic leak issue that other contractors could not fix.', rating: 5 },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm mb-4">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center font-bold text-primary-700">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-navy-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={siteFAQs} />

      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote today. We respond within 30 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-a-quote" className="bg-white text-primary-700 hover:bg-primary-50 font-bold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              Request Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/254700000000?text=Hello%2C%20I%20need%20assistance%20with%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-green-600/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}