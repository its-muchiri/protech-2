'use client';

import { useEffect, useState } from 'react';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    // Extract headings from content - this would be done server-side in production
    // For now, return empty or parse HTML
    setHeadings([]);
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-24">
      <h3 className="font-serif text-lg font-bold mb-4">In This Article</h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.id}`}
            className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
