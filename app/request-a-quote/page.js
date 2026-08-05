import { metadata } from '@/app/layout';
import LeadForm from '@/components/LeadForm';
import { Phone, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Request a Free Quote | Kenya Consultancy',
  description: 'Request a free, no-obligation quote for any of our 17+ professional services in Kenya. We respond within 30 minutes.',
};

export default function RequestQuotePage() {
  return (
    <div className="section-padding">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title">Request a Free Quote</h1>
          <p className="section-subtitle">
            Fill out the form below and our team will get back to you within 30 minutes during business hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <LeadForm />
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">Or contact us directly</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+254700000000"
              className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
            >
              <Phone className="w-5 h-5" />
              +254 700 000 000
            </a>
            <a
              href="https://wa.me/254700000000?text=Hello%2C%20I%20need%20a%20quote"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}