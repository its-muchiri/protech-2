'use client';

export default function CategoryHeader({ category, description, count }) {
  return (
    <div className="py-12 border-b border-gray-200 mb-8">
      <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{category}</h1>
      {description && <p className="text-lg text-gray-600 max-w-3xl">{description}</p>}
      {count !== undefined && (
        <p className="mt-4 text-sm text-gray-500">{count} articles</p>
      )}
    </div>
  );
}
