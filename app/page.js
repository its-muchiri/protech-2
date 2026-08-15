'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/services';
import { siteFAQs } from '@/data/faqs';
import Link from 'next/link';
import {
  ArrowRight,
  MessageCircle,
  Award,
  FolderCheck,
  Users,
  Headset,
  CheckCircle2,
  Phone,
  Star,
  Building2,
  Droplets,
  Truck,
  Wrench,
  Sun,
  Home,
  Shield,
  Car,
  Drill,
  Ruler,
  Zap,
  Lightbulb,
  Sofa,
  Frame,
  Heart,
  Mail,
} from 'lucide-react';

const WHATSAPP_NUMBER = '254725310112';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20ProTech%20Consultants%2C%20I%20would%20like%20to%20request%20a%20quote.`;
const PHONE = '+254 707 526 602';
const featuredServices = services.slice(0, 6);

const ICON_MAP = {
  Building2,
  Droplets,
  Truck,
  Wrench,
  Sun,
  Home,
  Shield,
  Car,
  Drill,
  Ruler,
  Zap,
  Lightbulb,
  Sofa,
  Frame,
  Heart,
};

const CERTS = [
  { short: 'NCA', full: 'National Construction Authority - Registered and licensed contractor in Kenya.' },
  { short: 'EPRA', full: 'Energy & Petroleum Regulatory Authority - Certified for solar and energy installations.' },
  { short: 'NEMA', full: 'National Environment Management Authority - Compliant with all environmental regulations.' },
  { short: 'KRA', full: 'Kenya Revenue Authority - Fully tax-compliant business.' },
  { short: 'ERC', full: 'Energy Regulatory Commission - Registered energy service provider.' },
  { short: 'ISO', full: 'ISO 9001:2015 - Quality management system certified.' },
];

const TESTIMONIALS = [
  { name: 'James Kariuki', role: 'Property Developer', location: 'Nairobi', text: "ProTech delivered our 12-unit apartment block on time and within budget. Their NCA-certified team handled everything from foundation to finishing. Exceptional professionalism throughout.", rating: 5 },
  { name: 'Amina Hassan', role: 'Business Owner', location: 'Mombasa', text: "We had solar panels and a security system installed at our factory. The team was fast, clean and explained everything clearly. Our electricity bill dropped by 60% in the first month.", rating: 5 },
  { name: 'Peter Mutua', role: 'Facilities Manager', location: 'Kiambu', text: "ProTech drilled our borehole and installed the complete water system within one week. Clean water 24/7 - it has transformed operations at our school. Highly recommended.", rating: 5 },
];

const VALUE_PROPS = [
  { icon: Award, title: 'Certified Professionals', desc: 'NCA, EPRA, NEMA and ISO certified. Every project meets regulatory standards.' },
  { icon: FolderCheck, title: '500+ Projects Delivered', desc: 'Across 17 service lines, residential to industrial, county to county.' },
  { icon: Users, title: 'Dedicated Project Teams', desc: 'One project manager, one point of contact, end-to-end accountability.' },
  { icon: Headset, title: '24/7 Support', desc: 'Round-the-clock emergency response for plumbing, electrical and security.' },
];

const glass = {
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
};

const glassDark = {
  background: 'rgba(11, 31, 58, 0.55)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
};

export default function HomePage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: 'Home Page' }),
      });

      const message = `Hello, I would like to request a quote.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Service: ${data.service || 'General Inquiry'}
Location: ${data.location || 'Not specified'}

Project Details:
${data.details || 'No details provided'}

Please send me a detailed quotation. Thank you.`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div>
      <Hero />

      {/* Stats Bar */}
      <div style={{ background: '#0F4C2C' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '17+', label: 'Services Offered' },
              { value: '5+', label: 'Years of Excellence' },
              { value: '24/7', label: 'Client Support' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '28px 24px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 34, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', padding: '20px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 8 }}>Certified & Regulated:</span>
            {CERTS.map(c => (
              <div key={c.short} style={{ padding: '6px 16px', borderRadius: 999, border: '1.5px solid #E2E8F0', background: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: '#0B1F3A', cursor: 'default', userSelect: 'none' }}>
                {c.short}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section-padding" style={{ background: '#F0FDF4' }} id="services">
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>What We Do</p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#0B1F3A', marginBottom: 14 }}>17 Professional Services,<br />One Trusted Partner</h2>
            <p style={{ fontSize: 16, color: '#334155', maxWidth: 520, margin: '0 auto' }}>
              Every service is delivered by certified engineers with regulatory compliance built in from day one.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {featuredServices.map((svc, i) => (
              <ServiceCard key={i} service={svc} />
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <Link href="/services" className="btn-cta" style={{ backdropFilter: 'blur(8px)' }}>View All 17 Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us + Quote Form */}
      <section className="section-padding" style={{ position: 'relative', background: 'linear-gradient(135deg, #E2E8F0 0%, #F0FDF4 100%)' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Why ProTech</p>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: '#0B1F3A', marginBottom: 16 }}>Built on Certification, Delivered with Accountability</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: '#334155', marginBottom: 32 }}>
                We combine deep technical expertise with genuine project accountability. Every job has a named project manager, a detailed milestone plan, and full regulatory compliance.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {VALUE_PROPS.map((vp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span style={{ ...glass, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRadius: 12 }}>
                      <vp.icon size={22} style={{ color: '#0F4C2C' }} strokeWidth={1.75} />
                    </span>
                    <div>
                      <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15, color: '#0B1F3A', marginBottom: 2 }}>{vp.title}</div>
                      <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>{vp.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {!showQuoteForm && (
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="btn-cta"
                  style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Get a Quote <ArrowRight size={16} />
                </button>
              )}
            </div>

            {/* Quote Form Section */}
            <div id="quote">
              {submitted ? (
                <div style={{ ...glass, padding: '48px 32px', textAlign: 'center' }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.15)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}>
                    <CheckCircle2 size={36} color="#16A34A" />
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: '#0B1F3A', marginBottom: 12 }}>
                    Thank You!
                  </h3>
                  <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, marginBottom: 24 }}>
                    Your quote request has been sent to our team via email. We&apos;ve also opened WhatsApp so you can continue the conversation with us directly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : showQuoteForm ? (
                <div style={{ ...glass, padding: 36 }}>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: '#0B1F3A', marginBottom: 4 }}>Request a Free Quote</h3>
                  <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>We respond within 2 hours. No obligation.</p>
                  <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <input
                      type="text"
                      {...register('name', { required: 'Full name is required' })}
                      placeholder="Your Full Name *"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    />
                    {errors.name && <p className="form-error">{errors.name.message}</p>}

                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(\+254|07|01)\d{7,9}$/,
                          message: 'Valid Kenyan phone number',
                        },
                      })}
                      placeholder="Phone Number *"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}

                    <input
                      type="email"
                      {...register('email')}
                      placeholder="Email Address"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    />

                    <select
                      {...register('service', { required: 'Please select a service' })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    >
                      <option value="">Select Service *</option>
                      {services.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                    </select>
                    {errors.service && <p className="form-error">{errors.service.message}</p>}

                    <select
                      {...register('location')}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none' }}
                    >
                      <option value="">County / Location</option>
                      {['Nairobi', 'Kiambu', 'Machakos', 'Mombasa', 'Kisumu', 'Nakuru', 'Thika', 'Other'].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>

                    <textarea
                      {...register('details')}
                      placeholder="Project details (optional)"
                      rows={3}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)', fontSize: 14, color: '#0B1F3A', fontFamily: "'Inter', sans-serif", outline: 'none', resize: 'vertical' }}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-cta"
                      style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <MessageCircle size={16} />
                      {isSubmitting ? 'Sending...' : 'Get Quote via Email & WhatsApp'}
                    </button>

                    <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
                      We&apos;ll send your quote request via email and open WhatsApp for instant communication.
                    </p>
                  </form>
                </div>
              ) : (
                <div style={{ ...glass, padding: 36, textAlign: 'center' }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(15, 76, 44, 0.1)',
                    backdropFilter: 'blur(4px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    border: '1px solid rgba(15, 76, 44, 0.2)',
                  }}>
                    <MessageCircle size={28} color="#0F4C2C" />
                  </div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: '#0B1F3A', marginBottom: 12 }}>Ready to Get Started?</h3>
                  <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24, lineHeight: 1.6 }}>
                    Click the button below to request a free quote. We&apos;ll send your details via email and open WhatsApp for instant communication.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, textAlign: 'left' }}>
                    {['Quote sent to our team via email', 'WhatsApp opens for direct conversation', 'Response within 2 hours guaranteed'].map((text, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <CheckCircle2 size={18} color="#16A34A" />
                        <span style={{ fontSize: 14, color: '#334155' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="btn-cta"
                    style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <ArrowRight size={16} /> Get a Quote
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <div className="container-custom" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '40px 0' }}>
          <div style={{ ...glassDark, padding: '24px 32px', flex: 1, minWidth: 280 }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: '#fff' }}>Need an urgent assessment or emergency service?</div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>Our teams are on standby 24/7 across Nairobi and surrounding counties.</div>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={`tel:${PHONE}`} style={{ ...glassDark, padding: '12px 24px', color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Phone size={15} /> {PHONE}
            </a>
            <a href="/request-a-quote" className="btn-whatsapp" style={{ fontSize: 14 }}><MessageCircle size={15} /> Get a Quote</a>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="section-padding" style={{ position: 'relative', background: 'linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(15,76,44,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234,88,12,0.06) 0%, transparent 50%)' }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#15803D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Client Stories</p>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#0B1F3A' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ ...glass, padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#EA580C" color="#EA580C" />
                  ))}
                </span>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#334155', margin: 0, fontStyle: 'italic' }}>&quot;{t.text}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.3)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(15, 76, 44, 0.1)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, color: '#0F4C2C', border: '1px solid rgba(15, 76, 44, 0.2)' }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#0B1F3A' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{t.role} - {t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ faqs={siteFAQs} />

      {/* Final CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(21,128,61,0.3) 0%, transparent 60%)' }} />
        <div className="container-custom" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ ...glassDark, maxWidth: 640, margin: '0 auto', padding: '48px 40px' }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 4vw, 44px)', color: '#fff', marginBottom: 14 }}>
              Start Your Project Today
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 36, maxWidth: 480, margin: '0 auto 36px' }}>
              Get a free, no-obligation quote from Kenya&apos;s most trusted multi-service contractor. Response within 2 hours guaranteed.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setShowQuoteForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-cta"
                style={{ fontSize: 15, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ArrowRight size={16} /> Get a Quote
              </button>
            </div>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
              {['Free Quote', 'Certified Engineers', 'Pan-Kenya Coverage', '24/7 Support'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
                  <CheckCircle2 size={14} color="#86EFAC" /> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
