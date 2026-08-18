'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '254725310112';

const glassInputStyle = {
  background: 'rgba(255, 255, 255, 0.45)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: '#1A1A1A',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: 'Contact Page' }),
      });

      const message = `Hello, I would like to get in touch.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || 'Not provided'}\nService: ${data.service || 'General Inquiry'}\n\nMessage:\n${data.message || 'No message provided'}`;

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
      <div style={{
        background: 'rgba(34, 197, 94, 0.1)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: 16,
        padding: 32,
        textAlign: 'center',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(34, 197, 94, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
        }}>
          <CheckCircle2 size={28} color="#16A34A" />
        </div>
        <h3 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700, fontSize: 20, color: '#1A1A1A', marginBottom: 10,
        }}>Thank You!</h3>
        <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, marginBottom: 18 }}>
          Your message has been sent to our team via email. We have also opened WhatsApp so you can continue the conversation with us directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            background: 'none', border: 'none', color: '#0D47A1',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', textDecoration: 'underline',
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
            Full Name *
          </label>
          <input
            type="text"
            {...register('name', { required: 'Full name is required' })}
            style={glassInputStyle}
            placeholder="Your Full Name"
            onFocus={(e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.name && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.name.message}</p>}
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
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
            style={glassInputStyle}
            placeholder="+254 7XX XXX XXX"
            onFocus={(e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = 'none'; }}
          />
          {errors.phone && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Email Address
        </label>
        <input
          type="email"
          {...register('email')}
          style={glassInputStyle}
          placeholder="you@email.com"
          onFocus={(e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Service Interested In
        </label>
        <select
          {...register('service')}
          style={glassInputStyle}
          onFocus={(e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = 'none'; }}
        >
          <option value="">Select a service...</option>
          {[
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
          ].map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
          Your Message *
        </label>
        <textarea
          {...register('message', { required: 'Please enter your message' })}
          style={{ ...glassInputStyle, resize: 'vertical' }}
          rows={4}
          placeholder="How can we help you?"
          onFocus={(e) => { e.target.style.borderColor = 'rgba(13,71,161,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(13,71,161,0.1)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.4)'; e.target.style.boxShadow = 'none'; }}
        />
        {errors.message && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%', padding: '14px 24px', fontSize: 15, fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          background: 'linear-gradient(135deg, #0D47A1 0%, #1A1A1A 100%)',
          color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          transition: 'transform 0.2s, box-shadow 0.2s',
          boxShadow: '0 4px 20px rgba(13,71,161,0.3)',
        }}
        onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 28px rgba(13,71,161,0.4)'; }}
        onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 20px rgba(13,71,161,0.3)'; }}
      >
        <MessageCircle size={16} />
        {isSubmitting ? 'Sending...' : 'Send via Email & WhatsApp'}
      </button>

      <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center' }}>
        We will send your message via email and open WhatsApp for instant communication.
      </p>
    </form>
  );
}
