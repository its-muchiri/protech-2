'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';

export default function Hero({
  title = 'Kenya\'s Leading Multi-Service Consultancy',
  subtitle = 'Construction, Solar, Plumbing, Security & 15+ Professional Services. Get a Free Quote Today.',
  ctaText = 'Request Free Quote',
  ctaLink = '/request-a-quote',
  showForm = true,
}) {
  const [activeTab, setActiveTab] = useState('quote');

  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative container-custom py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={ctaLink} className="bg-white text-navy-900 hover:bg-primary-50 font-bold px-8 py-4 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2">
                {ctaText}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`https://wa.me/254700000000?text=Hello%2C%20I%20need%20assistance%20with%20your%20services`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-green-600/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { number: '500+', label: 'Projects Completed' },
                { number: '17+', label: 'Service Lines' },
                { number: '5+', label: 'Years Experience' },
                { number: '24/7', label: 'Support Available' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-heading font-bold">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="flex mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('quote')}
                className={`pb-3 px-4 text-sm font-semibold transition-colors ${
                  activeTab === 'quote'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Request a Quote
              </button>
              <a
                href={`https://wa.me/254700000000?text=Hello%2C%20I%20need%20assistance`}
                target="_blank"
                rel="noopener noreferrer"
                className="pb-3 px-4 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                </svg>
                WhatsApp Direct
              </a>
            </div>

            {activeTab === 'quote' ? (
              <LeadForm compact />
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Click the button below to start chatting</p>
                <a
                  href={`https://wa.me/254700000000?text=Hello%2C%20I%20need%20assistance%20with%20your%20services`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-all"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  Open WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}