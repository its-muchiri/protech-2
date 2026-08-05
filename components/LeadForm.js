'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, Mail, Send, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '254700000000';

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
  'Mombasa',
  'Nakuru',
  'Kisumu',
  'Eldoret',
  'Other',
];

export default function LeadForm({ compact = false, showServiceSelector = true, className = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitType, setSubmitType] = useState(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        setSubmitType('email');
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleWhatsApp = (data) => {
    const message = `Hello, I am interested in getting a quote for ${data.service || 'your services'} in ${data.location || 'Kenya'}. My name is ${data.name} and my phone number is ${data.phone}. Project details: ${data.details || 'N/A'}. Budget: ${data.budget || 'Not specified'}.`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}>
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Send className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="font-heading font-bold text-lg text-navy-900 mb-2">Thank You!</h3>
        <p className="text-sm text-gray-600">
          {submitType === 'email'
            ? 'Your inquiry has been sent. A consultant will reach out within 30 minutes.'
            : 'Redirecting to WhatsApp...'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
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
        <label className="form-label">Phone / WhatsApp Number *</label>
        <input
          type="tel"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^(\+254|07|01)\d{7,9}$/,
              message: 'Enter a valid Kenyan phone number (e.g., +2547XX XXX XXX or 07XX XXX XXX)',
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
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
          className="form-input"
          placeholder="you@email.com"
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      {showServiceSelector && (
        <div>
          <label className="form-label">Service Required *</label>
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
      )}

      <div>
        <label className="form-label">Location / County</label>
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

      <div>
        <label className="form-label">Project Details</label>
        <textarea
          {...register('details')}
          className="form-input"
          rows={3}
          placeholder="Tell us about your project..."
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <Mail className="w-4 h-4" />
          {isSubmitting ? 'Sending...' : 'Send via Email'}
        </button>
        <button
          type="button"
          onClick={() => {
            const formData = new FormData(document.querySelector('form'));
            const data = Object.fromEntries(formData.entries());
            handleWhatsApp(data);
            setSubmitType('whatsapp');
          }}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg shadow-green-600/30 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * Required fields. We respond within 30 minutes during business hours.
      </p>
    </form>
  );
}