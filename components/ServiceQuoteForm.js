'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MessageCircle, CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '254707526602';

export default function ServiceQuoteForm({ serviceName }) {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send to email via API
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, service: serviceName, page: 'Service Detail Page' }),
      });

      // Open WhatsApp with the message
      const message = `Hello, I am interested in ${serviceName}.

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
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Thank You!</h3>
        <p className="text-sm text-gray-600 mb-4">
          Your quote request has been sent to our team via email. We&apos;ve also opened WhatsApp so you can continue the conversation with us directly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        <div>
          <label className="form-label">Email Address</label>
          <input
            type="email"
            {...register('email')}
            className="form-input"
            placeholder="you@email.com"
          />
        </div>
      </div>

      <div>
        <label className="form-label">Location / County</label>
        <select {...register('location')} className="form-input">
          <option value="">Select your location...</option>
          {['Nairobi', 'Kiambu', 'Machakos', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Other'].map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="form-label">Project Details</label>
        <textarea
          {...register('details')}
          className="form-input"
          rows={3}
          placeholder="Tell us about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-cta flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Get Quote via Email & WhatsApp'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        We&apos;ll send your quote request via email and open WhatsApp for instant communication.
      </p>
    </form>
  );
}
