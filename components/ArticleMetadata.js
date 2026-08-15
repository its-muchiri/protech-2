'use client';

export default function ArticleMetadata({ post }) {
  return (
    <div className="border-t border-b border-gray-200 py-6 my-8">
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <div>
          <span className="font-semibold">Category:</span> {post.categoryLabel}
        </div>
        <span>•</span>
        <div>
          <span className="font-semibold">Published:</span> {post.date}
        </div>
        <span>•</span>
        <div>
          <span className="font-semibold">Reading time:</span> {post.readTime}
        </div>
        <span>•</span>
        <div>
          <span className="font-semibold">Word count:</span> {post.word_count?.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
