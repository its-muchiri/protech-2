'use client';

import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-20">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 text-orange-600 mb-6">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Home size={18} /> Back to Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-orange-600 hover:text-orange-600 transition-colors"
            >
              <Search size={18} /> Browse Blog
            </Link>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Or explore our main sections:</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href="/services" className="text-gray-600 hover:text-orange-600 transition-colors">Services</Link>
              <span className="text-gray-300">·</span>
              <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors">About Us</Link>
              <span className="text-gray-300">·</span>
              <Link href="/blog" className="text-gray-600 hover:text-orange-600 transition-colors">Blog</Link>
              <span className="text-gray-300">·</span>
              <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}