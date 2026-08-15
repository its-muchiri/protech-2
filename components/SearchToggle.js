'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import BlogSearch from './BlogSearch';

export default function SearchToggle() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="absolute top-6 right-6 bg-white/10 backdrop-blur px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-white/20"
      >
        <Search size={18} /> Search
      </button>
      <BlogSearch onClose={() => setOpen(false)} />
    </>
  );
}
