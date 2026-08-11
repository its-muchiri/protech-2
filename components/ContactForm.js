'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '254707526602';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send to email via API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, page: 'Contact Page' }),
      });

      // Open WhatsApp with the message
      const message = `Hello, I would like to get in touch.

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Service: ${data.service || 'General Inquiry'}

Message:
${data.message || 'No message provided'}`;

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
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Thank You!</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your message has been sent to our team via email. We&apos;ve also opened WhatsApp so you can continue the conversation with us directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            {...register('name', { required: 'Full name is required' })}
            className="form-input"
            placeholder="John Doe"
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div>
          <label className="form-label">Phone Number *</label>
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
      </div>

      <div>
        <label className="form-label">Email Address</label>
        <input
          type="email"
          {...register('email')}
          className="form-input"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label className="form-label">Service Interested In</label>
        <select {...register('service')} className="form-input">
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
        <label className="form-label">Your Message *</label>
        <textarea
          {...register('message', { required: 'Please enter your message' })}
          className="form-input"
          rows={4}
          placeholder="How can we help you?"
        />
        {errors.message && <p className="form-error">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-cta flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Send via Email & WhatsApp'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        We&apos;ll send your message via email and open WhatsApp for instant communication.
      </p>
    </form>
  );
}
