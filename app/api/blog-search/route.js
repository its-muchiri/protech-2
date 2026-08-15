import { getAllPosts } from '@/lib/blog-content';

export const dynamic = 'force-static';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();
  const limit = Number(searchParams.get('limit') || 20);

  if (!q) {
    return Response.json({ results: [], total: 0 });
  }

  const posts = getAllPosts();
  
  const results = posts
    .filter(p => {
      const haystack = [
        p.title,
        p.excerpt,
        p.primary_keyword,
        ...(p.secondary_keywords || []),
        p.categoryLabel,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.categoryLabel,
      date: p.date,
      coverImage: p.coverImage,
    }));

  return Response.json({ results, total: results.length, query: q });
}
