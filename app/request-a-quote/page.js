'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Shield,
  Award,
  Building2,
  ArrowRight,
} from 'lucide-react';

const WHATSAPP_NUMBER = '254707526602';
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
  'Nairobi',
  'Kiambu',
  'Machakos',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Other',
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

export default function RequestQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send to email via API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: 'Quote Request Page' }),
      });

      // Open WhatsApp with the message
      const message = `Hello, I would like to request a quote for ${data.service || 'your services'}.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
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

  if (submitted) {
    return (
      <div className="section-padding" style={{ background: '#F8FAFC', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container-custom" style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div className="card" style={{ padding: '48px 40px' }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#F0FDF4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}>
              <CheckCircle2 size={36} color="#16A34A" />
            </div>
            <h1 style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: '#0B1F3A',
              marginBottom: 12,
            }}>
              Thank You!
            </h1>
            <p style={{
              fontSize: 16,
              color: '#334155',
              lineHeight: 1.7,
              marginBottom: 8,
            }}>
              Your quote request has been sent to our team via email. We&apos;ve also opened WhatsApp so you can continue the conversation with us directly.
            </p>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 32 }}>
              For urgent inquiries, call us directly at <a href={`tel:${PHONE}`} style={{ color: '#0F4C2C', fontWeight: 600 }}>{PHONE}</a>
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/" className="btn-cta" style={{ padding: '12px 28px' }}>
                Back to Home
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-outline"
                style={{ padding: '12px 28px' }}
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8FAFC' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0B1F3A 0%, #0F4C2C 100%)',
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(21,128,61,0.3) 0%, transparent 60%)',
        }} />
        <div className="container-custom" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 40,
              height: 40,
              background: '#EA580C',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Building2 size={22} color="#fff" strokeWidth={2} />
            </div>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: '#fff',
            }}>ProTech Consultants</span>
          </div>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: '#fff',
            marginBottom: 12,
            lineHeight: 1.15,
          }}>
            Request a Free Quote
          </h1>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 520,
            lineHeight: 1.7,
          }}>
            Get a detailed, no-obligation quotation from Kenya&apos;s most trusted multi-service contractor. We respond within 2 hours.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '24px 0' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 24,
          }}>
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: '#F0FDF4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <item.icon size={20} color="#0F4C2C" />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#0B1F3A',
                  }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section-padding">
        <div className="container-custom" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            {/* Left: Form */}
            <div className="card" style={{ padding: '36px 32px' }}>
              <h2 style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: 24,
                color: '#0B1F3A',
                marginBottom: 4,
              }}>
                Tell Us About Your Project
              </h2>
              <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
                Fill in the details below. We&apos;ll send your quote request via email and open WhatsApp for instant communication.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Name */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 6,
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Full name is required' })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="form-error">{errors.name.message}</p>}
                </div>

                {/* Phone & Email Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: 6,
                    }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^(\+254|07|01)\d{7,9}$/,
                          message: 'Valid Kenyan phone number',
                        },
                      })}
                      className="form-input"
                      placeholder="+254 7XX XXX XXX"
                    />
                    {errors.phone && <p className="form-error">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: 6,
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      {...register('email', {
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email',
                        },
                      })}
                      className="form-input"
                      placeholder="you@email.com"
                    />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 6,
                  }}>
                    Service Required *
                  </label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    className="form-input"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                  {errors.service && <p className="form-error">{errors.service.message}</p>}
                </div>

                {/* Location */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 6,
                  }}>
                    Location / County
                  </label>
                  <select
                    {...register('location')}
                    className="form-input"
                  >
                    <option value="">Select your location...</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Project Details */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: 6,
                  }}>
                    Project Details
                  </label>
                  <textarea
                    {...register('details')}
                    className="form-input"
                    rows={4}
                    placeholder="Describe your project requirements, timeline, budget range, etc."
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Single Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cta"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '16px 24px',
                    fontSize: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <MessageCircle size={18} />
                  {isSubmitting ? 'Sending...' : 'Get Quote via Email & WhatsApp'}
                </button>

                <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
                  We&apos;ll send your quote request via email and open WhatsApp for instant communication. Response within 2 hours.
                </p>
              </form>
            </div>

            {/* Right: Info Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Benefits Card */}
              <div className="card" style={{ padding: '28px 24px' }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#0B1F3A',
                  marginBottom: 20,
                }}>
                  What You Get With Your Quote
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {BENEFITS.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <CheckCircle2 size={16} color="#16A34A" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: '#334155' }}>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works Card */}
              <div className="card" style={{ padding: '28px 24px', background: '#0F4C2C', color: '#fff' }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#fff',
                  marginBottom: 16,
                }}>
                  How It Works
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      flexShrink: 0,
                    }}>1</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Fill Out the Form</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Provide your project details and requirements</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      flexShrink: 0,
                    }}>2</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Email Sent to Our Team</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Your quote request is immediately sent to our consultants</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      flexShrink: 0,
                    }}>3</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Continue on WhatsApp</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>WhatsApp opens automatically for instant conversation</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      flexShrink: 0,
                    }}>4</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>Receive Your Quote</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Detailed quotation within 2 hours guaranteed</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#0B1F3A',
                  marginBottom: 16,
                }}>
                  Need Help? Contact Us
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a
                    href={`tel:${PHONE}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #E2E8F0',
                      color: '#0B1F3A',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Phone size={16} color="#0F4C2C" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{PHONE}</span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #E2E8F0',
                      color: '#0B1F3A',
                      textDecoration: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <Mail size={16} color="#0F4C2C" />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{EMAIL}</span>
                  </a>
                </div>
              </div>

              {/* Certifications */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: '#0B1F3A',
                  marginBottom: 16,
                }}>
                  Certified & Regulated
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['NCA', 'EPRA', 'NEMA', 'KRA', 'ERC', 'ISO 9001:2015'].map((cert) => (
                    <span key={cert} style={{
                      padding: '6px 14px',
                      borderRadius: 999,
                      border: '1.5px solid #E2E8F0',
                      background: '#F8FAFC',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#0B1F3A',
                    }}>{cert}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
