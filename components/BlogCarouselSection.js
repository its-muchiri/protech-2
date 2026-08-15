import BlogCarousel from '@/components/BlogCarousel';
import { getPostsMeta } from '@/lib/blog-content';

export default function BlogCarouselSection({
  title,
  subtitle,
  variant = 'default',
  limit = 12,
  showHeader = true,
}) {
  const posts = getPostsMeta({ limit });
  return (
    <BlogCarousel
      posts={posts}
      title={title}
      subtitle={subtitle}
      variant={variant}
      limit={limit}
      showHeader={showHeader}
    />
  );
}
