'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BlogCarousel from '@/components/BlogCarousel';
import Reveal from '@/components/Reveal';
import { useIsMobile } from '@/lib/useMediaQuery';
import {
  MessageCircle, Phone, Mail, CheckCircle2,
  Clock, Shield, Award, Building2,
} from 'lucide-react';

const WHATSAPP_NUMBER = '0725310112';
const PHONE = '+254 707 526 602';
const EMAIL = 'protech.ke.group@gmail.com';

const serviceOptions = [
  'Construction & Civil Engineering',
  'Swimming Pool Construction',
  'Medical Equipment & Supplies',
  'Logistics & Freight Services',
  'Technical Repairs & Appliance Servicing',
  'Water Filtration & Purification',
  'Solar Power & Renewable Energy',
  'Roofing Systems & Waterproofing',
  'Plumbing & Drainage Services',
  'Security Systems & Physical Security',
  'Garage & Automotive Services',
  'Borehole Drilling & Water Services',
  'Architectural Design & House Plans',
  'Generator Sales & Repair',
  'Electrical Installation & Wiring',
  'Interior Design & Office Fit-Outs',
  'Office Partitions & Glass Works',
];

const locationOptions = [
  'Nairobi', 'Kiambu', 'Machakos', 'Mombasa', 'Kisumu',
  'Nakuru', 'Eldoret', 'Thika', 'Other',
];

const TRUST_ITEMS = [
  { icon: Clock, label: 'Response Within 2 Hours', desc: 'Fast turnaround on all inquiries' },
  { icon: Shield, label: 'No Obligation', desc: 'Free quotes with zero commitment' },
  { icon: Award, label: 'Certified Experts', desc: 'NCA, EPRA, NEMA certified team' },
];

const BENEFITS = [
  'Free professional site assessment',
  'Detailed written quotation',
  'No hidden charges or fees',
  'Pan-Kenya service coverage',
  '24/7 emergency support',
  'ISO 9001:2015 quality assurance',
];

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  borderRadius: 16,
};

const glassDarkStyle = {
  background: 'rgba(0, 0, 0, 0.25)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
};

const glassCardStyle = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
};

const glassInputStyle = {
  background: 'rgba(255, 255, 255, 0.55)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.45)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: '#1A1A1A',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const inputFocusHandlers = {
  onFocus: (e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; },
  onBlur: (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.45)'; e.target.style.boxShadow = 'none'; },
};

const btnStyle = {
  width: '100%', padding: '16px 24px', fontSize: 16, fontWeight: 700,
  fontFamily: "'Poppins', sans-serif",
  background: 'linear-gradient(135deg, #0D47A1 0%, #6A1B9A 100%)',
  color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  marginTop: 8, transition: 'transform 0.2s, box-shadow 0.2s',
  boxShadow: '0 4px 20px rgba(13,71,161,0.3)',
};

const fieldLabel = { display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 };

function GlassInput({ label, required, type, placeholder, registerProps, error }) {
  return (
    <div>
      <label style={fieldLabel}>{label}{required && ' *'}</label>
      <input
        type={type || 'text'}
        {...registerProps}
        placeholder={placeholder}
        style={glassInputStyle}
        onFocus={inputFocusHandlers.onFocus}
        onBlur={inputFocusHandlers.onBlur}
      />
      {error && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function GlassSelect({ label, required, options, registerProps, error, placeholder }) {
  return (
    <div>
      <label style={fieldLabel}>{label}{required && ' *'}</label>
      <select
        {...registerProps}
        style={glassInputStyle}
        onFocus={inputFocusHandlers.onFocus}
        onBlur={inputFocusHandlers.onBlur}
      >
        <option value="">{placeholder || 'Select...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export default function RequestQuotePage() {
  const isMobile = useIsMobile();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: 'Quote Request Page' }),
      });
      const msg = 'Hello, I would like to request a quote for ' + (data.service || 'your services') + '.\n\nName: ' + data.name + '\nPhone: ' + data.phone + '\nEmail: ' + (data.email || 'Not provided') + '\nLocation: ' + (data.location || 'Not specified') + '\n\nProject Details:\n' + (data.details || 'No details provided') + '\n\nPlease send me a detailed quotation. Thank you.';
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer');
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1A1A1A 0%, #0D47A1 50%, #1A1A1A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ ...glassStyle, maxWidth: 560, width: '100%', padding: '56px 48px', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '2px solid rgba(34, 197, 94, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <CheckCircle2 size={40} color="#22C55E" />
          </div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 32, color: '#fff', marginBottom: 14 }}>Thank You!</h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 10 }}>
            Your quote request has been sent to our team via email. We have also opened WhatsApp so you can continue the conversation with us directly.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 36 }}>
            For urgent inquiries, call us directly at{' '}
            <a href={'tel:' + PHONE} style={{ color: '#4ADE80', fontWeight: 600 }}>{PHONE}</a>
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{ ...glassStyle, padding: '14px 32px', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>Back to Home</a>
            <button onClick={() => setSubmitted(false)} style={{ ...glassDarkStyle, padding: '14px 32px', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>Submit Another Request</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#1A1A1A' }}>
{/* Hero Section */}
      <section style={{ position: 'relative', minHeight: isMobile ? 'auto' : 420, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg)', backgroundSize: 'cover', backgroundPosition: isMobile ? 'top center' : 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,71,161,0.95) 0%, rgba(26,26,26,0.9) 100%)' }} />
        <div className="container-custom" style={{ position: 'relative', zIndex: 2, padding: isMobile ? '48px 16px' : '64px 20px' }}>
          <div style={{ ...glassStyle, maxWidth: 600, padding: isMobile ? '32px 24px' : '48px 44px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: 'rgba(212, 175, 55, 0.85)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Building2 size={26} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: '#fff' }}>ProTech Consultants</span>
            </div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14, lineHeight: 1.15 }}>
              Request a Free Quote
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 520, lineHeight: 1.7 }}>
              Get a detailed, no-obligation quotation from Kenya&apos;s most trusted multi-service contractor. We respond within 2 hours.
            </p>
          </div>
        </div>
      </section>

{/* Trust Indicators */}
      <section style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '20px 0' : '24px 0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: isMobile ? '16px' : '24px' }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '14px' }}>
                <div style={{ width: isMobile ? '40px' : '46px', height: isMobile ? '40px' : '46px', borderRadius: '50%', background: 'rgba(74, 222, 128, 0.15)', border: '1px solid rgba(74, 222, 128, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={isMobile ? 18 : 20} color="#4ADE80" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: isMobile ? '13px' : '14px', color: '#fff' }}>{item.label}</div>
                  <div style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.55)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Main Form Section */}
      <section style={{ padding: isMobile ? '48px 0' : '64px 0', background: 'linear-gradient(180deg, #1A1A1A 0%, #0D2847 100%)' }}>
        <div className="container-custom" style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '32px' : '48px', alignItems: 'start' }}>
            {/* Left: Form */}
            <div style={{ ...glassCardStyle, padding: isMobile ? '28px 20px' : '40px 36px' }}>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 24, color: '#1A1A1A', marginBottom: 6 }}>
                Tell Us About Your Project
              </h2>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
                Fill in the details below. We will send your quote via email and open WhatsApp for instant communication.
              </p>

<form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <GlassInput label="Full Name" required type="text" placeholder="Your Full Name"
                  registerProps={register('name', { required: 'Full name is required' })}
                  error={errors.name && errors.name.message} />

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '14px' : '14px' }}>
                  <GlassInput label="Phone Number" required type="tel" placeholder="+254 7XX XXX XXX"
                    registerProps={register('phone', { required: 'Phone number is required', pattern: { value: /^(\+254|07|01)\d{7,9}$/, message: 'Valid Kenyan phone number' } })}
                    error={errors.phone && errors.phone.message} />
                  <GlassInput label="Email Address" type="email" placeholder="you@email.com"
                    registerProps={register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
                    error={errors.email && errors.email.message} />
                </div>

                <GlassSelect label="Service Required" required options={serviceOptions} placeholder="Select a service..."
                  registerProps={register('service', { required: 'Please select a service' })}
                  error={errors.service && errors.service.message} />

                <GlassSelect label="Location / County" options={locationOptions} placeholder="Select your location..."
                  registerProps={register('location')} />

                <div>
                  <label style={fieldLabel}>Project Details</label>
                  <textarea
                    {...register('details')}
                    rows={4}
                    placeholder="Describe your project requirements, timeline, budget range, etc."
                    style={{ ...glassInputStyle, resize: 'vertical' }}
                    onFocus={inputFocusHandlers.onFocus}
                    onBlur={inputFocusHandlers.onBlur}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={btnStyle}
                  onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 28px rgba(13,71,161,0.4)'; }}
                  onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(13,71,161,0.3)'; }}
                >
                  <MessageCircle size={18} />
                  {isSubmitting ? 'Sending...' : 'Get Quote via Email & WhatsApp'}
                </button>

                <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
                  We will send your quote request via email and open WhatsApp for instant communication. Response within 2 hours.
                </p>
              </form>
            </div>

{/* Right: Info Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
              {/* Benefits Card */}
              <div style={{ ...glassCardStyle, padding: isMobile ? '20px 16px' : '28px 24px' }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: isMobile ? '16px' : '18px', color: '#1A1A1A', marginBottom: isMobile ? '16px' : '20px' }}>
                  What You Get With Your Quote
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '10px' : '14px' }}>
                  {BENEFITS.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={14} color="#16A34A" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: '#334155' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works Card */}
              <div style={{ ...glassDarkStyle, padding: isMobile ? '20px 16px' : '28px 24px', background: 'rgba(13,71,161,0.85)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: isMobile ? '16px' : '18px', color: '#fff', marginBottom: isMobile ? '12px' : '16px' }}>
                  How It Works
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '12px' : '16px' }}>
                  {[
                    { num: '1', title: 'Fill Out the Form', desc: 'Provide your project details and requirements' },
                    { num: '2', title: 'Email Sent to Our Team', desc: 'Your quote request is immediately sent to our consultants' },
                    { num: '3', title: 'Continue on WhatsApp', desc: 'WhatsApp opens automatically for instant conversation' },
                    { num: '4', title: 'Receive Your Quote', desc: 'Detailed quotation within 2 hours guaranteed' },
                  ].map((step) => (
                    <div key={step.num} style={{ display: 'flex', gap: isMobile ? '10px' : '12px', alignItems: 'flex-start' }}>
                      <div style={{ width: isMobile ? '26px' : '30px', height: isMobile ? '26px' : '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: isMobile ? '12px' : '13px', color: '#fff', flexShrink: 0 }}>
                        {step.num}
                      </div>
                      <div>
                        <div style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 600, color: '#fff', marginBottom: 2 }}>{step.title}</div>
                        <div style={{ fontSize: isMobile ? '11px' : '12px', color: 'rgba(255,255,255,0.7)' }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div style={{ ...glassCardStyle, padding: isMobile ? '20px 16px' : '24px' }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: isMobile ? '15px' : '16px', color: '#1A1A1A', marginBottom: 12 }}>
                  Need Help? Contact Us
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a href={'tel:' + PHONE} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(13,71,161,0.2)', background: 'rgba(13,71,161,0.05)', color: '#1A1A1A', textDecoration: 'none', minHeight: '48px' }}>
                    <Phone size={16} color="#0D47A1" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{PHONE}</span>
                  </a>
                  <a href={'mailto:' + EMAIL} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(13,71,161,0.2)', background: 'rgba(13,71,161,0.05)', color: '#1A1A1A', textDecoration: 'none', minHeight: '48px' }}>
                    <Mail size={16} color="#0D47A1" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{EMAIL}</span>
                  </a>
                </div>
              </div>

              {/* Certifications */}
              <div style={{ ...glassCardStyle, padding: isMobile ? '20px 16px' : '24px' }}>
                <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: isMobile ? '15px' : '16px', color: '#1A1A1A', marginBottom: 12 }}>
                  Certified & Regulated
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['NCA', 'EPRA', 'NEMA', 'KRA', 'ERC', 'ISO 9001:2015'].map((cert) => (
                    <span key={cert} style={{ padding: '6px 12px', borderRadius: 999, border: '1.5px solid rgba(13,71,161,0.2)', background: 'rgba(13,71,161,0.06)', fontSize: 11, fontWeight: 700, color: '#1A1A1A' }}>{cert}</span>
                  ))}
                </div>
</div>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogCarousel
        title="Explore Our Guides"
        subtitle="Read helpful guides while you plan your project."
        limit={9}
      />
    </div>
  );
}

