import ContactForm from '@/components/ContactForm';
import BlogCarouselSection from '@/components/BlogCarouselSection';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | ProTech Consulting',
  description: 'Contact ProTech Consulting for all your service needs. Call us, email us, or fill out our online form. We respond within 30 minutes.',
};

export default function ContactPage() {
  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle">
            Get in touch with us. We respond to all inquiries within 30 minutes during business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-heading font-semibold text-lg mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900">Email</p>
                    <a href="mailto:protech.ke.group@gmail.com" className="text-gray-600 hover:text-primary-600 transition-colors">protech.ke.group@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900">Phone</p>
                    <a href="tel:+0725310112" className="text-gray-600 hover:text-primary-600 transition-colors">0725310112</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900">Location</p>
                    <p className="text-gray-600">Nairobi, Kenya</p>
                    <p className="text-gray-600">Servicing Countrywide</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900">Working Hours</p>
                    <p className="text-gray-600">Monday - Saturday: 7:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="font-heading font-bold text-xl mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>

        <BlogCarouselSection
          title="Latest From Our Journal"
          subtitle="Guides and insights from the ProTech team."
          limit={9}
        />
      </div>
    </div>
  );
}

