'use client';

import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {isLast ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-orange-600 transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
