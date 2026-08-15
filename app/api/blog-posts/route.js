import { getAllPosts } from '@/lib/blog-content';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit') || 12);
  const category = searchParams.get('category');

  let posts = getAllPosts();
  if (category && category !== 'All') {
    posts = posts.filter((p) => p.category === category);
  }

  const slim = posts.slice(0, limit).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    readTime: p.readTime,
    category: p.category,
    categoryLabel: p.categoryLabel,
    coverImage: p.coverImage,
  }));

  return Response.json({ posts: slim, total: posts.length });
}
