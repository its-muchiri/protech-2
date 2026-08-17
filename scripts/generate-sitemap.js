const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
console.log('Total blog files:', files.length);

const posts = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  // Handle both \n and \r\n line endings
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const slug = file.replace('.md', '');
    const titleMatch = fm.match(/title:\s*["']?([^"'\n]+)["']?/);
    const dateMatch = fm.match(/date:\s*["']?([^"'\n]+)["']?/);
    const categoryMatch = fm.match(/category:\s*["']?([^"'\n]+)["']?/);
    const slugMatch = fm.match(/slug:\s*["']?([^"'\n]+)["']?/);
    
    const finalSlug = slugMatch ? slugMatch[1].trim() : file.replace('.md', '');
    
    posts.push({
      slug: finalSlug,
      title: titleMatch ? titleMatch[1].trim() : slug,
      date: dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0],
      category: categoryMatch ? categoryMatch[1].trim() : 'General',
    });
  }
}

console.log('Posts found:', posts.length);
console.log('Categories:', [...new Set(posts.map(p => p.category))].slice(0, 20));

const staticRoutes = [
  '',
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/portfolio',
  '/request-a-quote',
];

const blogRoutes = posts.map(p => `/blog/${p.slug}`);
const categoryRoutes = [...new Set(posts.map(p => p.category))].map(c => `/blog?category=${encodeURIComponent(c)}`);

const allRoutes = [
  '',
  '/about',
  '/services',
  '/blog',
  '/contact',
  '/portfolio',
  '/request-a-quote',
  ...posts.map(p => `/blog/${p.slug}`),
  ...[...new Set(posts.map(p => p.category))].map(c => `/blog?category=${encodeURIComponent(c)}`),
].sort();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allRoutes.map(route => {
  const url = `https://www.pro-tech.co.ke${route === '' ? '/' : route}`;
  const priority = route === '' ? '1.0' : route.startsWith('/services/') || route.startsWith('/blog/') ? '0.8' : '0.6';
  const changefreq = route.startsWith('/blog/') ? 'weekly' : route.startsWith('/services/') ? 'monthly' : 'weekly';
  const lastmod = new Date().toISOString().split('T')[0];
  
  return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated at public/sitemap.xml');
console.log(`Total URLs: ${allRoutes.length}`);
console.log('\nSample URLs (first 50):');
allRoutes.slice(0, 50).forEach(r => console.log(`  https://www.pro-tech.co.ke${r === '' ? '/' : r}`));
console.log(`... and ${allRoutes.length - 50} more URLs`);