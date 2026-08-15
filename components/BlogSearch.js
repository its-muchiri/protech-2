'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

export default function BlogSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/blog-search?q=${encodeURIComponent(query)}&limit=10`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="text-gray-400" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 outline-none text-lg"
          />
          <button onClick={() => { setIsOpen(false); onClose?.(); }} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {loading && <div className="p-8 text-center text-gray-500">Searching...</div>}
          
          {!loading && query.length < 2 && (
            <div className="p-8 text-center text-gray-500">
              Type at least 2 characters to search
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No results for &quot;{query}&quot;
            </div>
          )}

          <div className="divide-y">
            {results.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={() => { setIsOpen(false); onClose?.(); }}
                className="block p-4 hover:bg-gray-50"
              >
                <div className="flex gap-4">
                  <img src={post.coverImage} alt="" className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-orange-600 font-semibold mb-1">{post.category}</div>
                    <div className="font-semibold text-gray-900 line-clamp-2">{post.title}</div>
                    <div className="text-sm text-gray-500 mt-1 line-clamp-1">{post.excerpt}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
