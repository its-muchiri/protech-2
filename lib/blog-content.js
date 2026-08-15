import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import yaml from 'js-yaml';
import { categorizePost } from '@/lib/blog-categories';

const CATEGORY_IMAGE = {
  Medical: '/protech-img/medical-equipment-supplies/medical-equipment-supplies_1.jpg',
  Safari: '/protech-img/logistics-freight-services/logistics-freight-services_1.jpg',
  Flights: '/protech-img/logistics-freight-services/logistics-freight-services_2.jpg',
  Services: '/protech-img/construction-civil-engineering/construction-civil-engineering_1.jpg',
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const INDEX_PATH = path.join(process.cwd(), 'content', 'content-index.json');
const IMAGE_INDEX_PATH = path.join(process.cwd(), 'content', 'image-index.json');

let IMAGE_INDEX_CACHE = null;
function getImageIndex() {
  if (IMAGE_INDEX_CACHE) return IMAGE_INDEX_CACHE;
  if (!fs.existsSync(IMAGE_INDEX_PATH)) return { images: [] };
  try {
    IMAGE_INDEX_CACHE = JSON.parse(fs.readFileSync(IMAGE_INDEX_PATH, 'utf-8'));
    return IMAGE_INDEX_CACHE;
  } catch {
    return { images: [] };
  }
}

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function getAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    return parsePost(raw);
  });
  return posts
    .filter(Boolean)
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      return a.slug.localeCompare(b.slug);
    });
}

export function getPostBySlug(slug) {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf-8');
  return parsePost(raw);
}

export function getPostsMeta({ limit = 50, category = null } = {}) {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    return parsePost(raw);
  });
  const filtered = (category ? posts.filter((p) => p.category === category) : posts)
    .filter(Boolean)
    .sort((a, b) => {
      if (a.date && b.date) return new Date(b.date) - new Date(a.date);
      return a.slug.localeCompare(b.slug);
    })
    .slice(0, limit)
    .map(({ content, ...meta }) => meta);
  return filtered;
}

export function getIndex() {
  if (!fs.existsSync(INDEX_PATH)) return { articles: [], topic_clusters: {} };
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
  } catch {
    return { articles: [], topic_clusters: {} };
  }
}

function selectCoverImage(meta, category) {
  const imageIndex = getImageIndex();
  const images = imageIndex.images || [];
  
  const title = (meta.title || '').toLowerCase();
  const primary = (meta.primary_keyword || '').toLowerCase();
  const secondary = (meta.secondary_keywords || []).map(k => String(k).toLowerCase());
  
  const searchText = `${title} ${primary} ${secondary.join(' ')}`;
  
  // Category to image folder mapping
  const categoryMap = {
    'Medical': ['medical-equipment-supplies'],
    'Services': ['construction-civil-engineering', 'electrical-installation-wiring', 'plumbing-drainage-services'],
    'Safari': ['logistics-freight-services'],
    'Flights': ['logistics-freight-services'],
    'Solar': ['solar-power-renewable-energy'],
    'Water': ['water-filtration-purification', 'borehole-drilling-water-services'],
    'Security': ['security-systems-physical-security'],
    'Pools': ['swimming-pool-construction'],
    'Interior': ['interior-design-office-fitouts'],
  };
  
  // Try keyword-based matching first
  const keywordMatches = [];
  for (const img of images) {
    const cat = img.category.toLowerCase();
    // Skip logo images
    if (cat === 'protech-img' && img.filename.includes('logo')) continue;
    
    // Check if category name appears in search text
    if (searchText.includes(cat.replace(/-/g, ' '))) {
      keywordMatches.push(img);
    }
    // Check for common keyword mappings
    if (cat.includes('solar') && (searchText.includes('solar') || searchText.includes('power'))) {
      keywordMatches.push(img);
    }
    if (cat.includes('water') && (searchText.includes('water') || searchText.includes('filtration') || searchText.includes('borehole'))) {
      keywordMatches.push(img);
    }
    if (cat.includes('medical') && (searchText.includes('medical') || searchText.includes('health') || searchText.includes('hospital'))) {
      keywordMatches.push(img);
    }
  }
  
  if (keywordMatches.length > 0) {
    // Pick first match, prefer _1.jpg
    const preferred = keywordMatches.find(img => img.filename.includes('_1.'));
    return (preferred || keywordMatches[0]).path;
  }
  
  // Fallback to category mapping
  const mappedFolders = categoryMap[category.id] || categoryMap['Services'] || [];
  for (const folder of mappedFolders) {
    const folderImages = images.filter(img => img.category === folder);
    if (folderImages.length > 0) {
      const preferred = folderImages.find(img => img.filename.includes('_1.'));
      return (preferred || folderImages[0]).path;
    }
  }
  
  // Final fallback to CATEGORY_IMAGE
  return CATEGORY_IMAGE[category.id] || CATEGORY_IMAGE.Services;
}

function parsePost(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const meta = yaml.load(match[1]) || {};
  const markdown = match[2];
  const wordCount = Number(meta.word_count) || countWords(markdown);
  const readMinutes = Math.max(1, Math.round(wordCount / 200));
  const category = categorizePost(meta);
  
  // Automatic image matching based on title/keywords to image categories
  const coverImage = selectCoverImage(meta, category);
  
  return {
    slug: meta.slug,
    category: category.id,
    categoryLabel: category.label,
    coverImage,
    title: meta.title || 'Untitled',
    description: meta.description || '',
    excerpt: meta.description || '',
    primary_keyword: meta.primary_keyword || '',
    secondary_keywords: meta.secondary_keywords || [],
    search_intent: meta.search_intent || '',
    article_style: meta.article_style || '',
    style_batch: meta.style_batch || 1,
    word_count: wordCount,
    status: meta.status || 'draft',
    date: meta.date || '2026-01-01',
    readTime: `${readMinutes} min read`,
    content: marked.parse(markdown),
  };
}

function countWords(text) {
  const stripped = text
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, '$1')
    .replace(/[*_`>~]/g, ' ')
    .replace(/\s+/g, ' ');
  return stripped.split(' ').filter((w) => w.trim().length > 0).length;
}
