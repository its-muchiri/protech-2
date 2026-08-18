// Full validation of all blog articles
const fs = require('fs');
const path = require('path');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let valid = 0;
let problems = [];
const slugSet = new Set();
let totalWords = 0;

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const fileProblems = [];

  // Check frontmatter (normalize line endings first)
  const normalized = content.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---')) fileProblems.push('missing frontmatter start');
  const endMatch = normalized.match(/^---$/m, 1);
  const endMatches = [...normalized.matchAll(/^---$/gm)];
  if (endMatches.length < 2) fileProblems.push('missing frontmatter end');

  // Required fields
  const required = ['title', 'description', 'slug', 'primary_keyword', 'secondary_keywords', 'search_intent', 'article_style', 'status'];
  for (const field of required) {
    if (!new RegExp(`^${field}:`, 'm').test(content)) {
      fileProblems.push(`missing field: ${field}`);
    }
  }

  // Slug check
  const slugMatch = content.match(/^slug: (.*)$/m);
  if (slugMatch) {
    const slug = slugMatch[1].trim();
    if (slugSet.has(slug)) fileProblems.push(`duplicate slug: ${slug}`);
    slugSet.add(slug);
    const filenameSlug = f.replace(/\.md$/, '');
    if (slug !== filenameSlug) fileProblems.push(`slug mismatch: ${slug} != ${filenameSlug}`);
  }

  // Word count (use normalized content)
  const bodyText = normalized
    .replace(/^---[\s\S]*?^---\n/m, '')  // strip frontmatter
    .replace(/[#>*_`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = bodyText.split(' ').filter(w => w.length > 0).length;
  totalWords += words;

  if (words < 350) fileProblems.push(`word count too low: ${words}`);

  // Check H1 matches title (use normalized) - normalize both to handle brackets and escaped quotes
  const normalize = (s) => s.replace(/\[[^\]]+\]/g, '').replace(/\s+:/g, ':').replace(/''/g, "'").trim();
  const titleMatch = normalized.match(/^title: '(.*)'$/m);
  const h1Match = normalized.match(/^# (.*)$/m);
  if (titleMatch && h1Match && normalize(titleMatch[1]) !== normalize(h1Match[1])) {
    fileProblems.push('H1 does not match title');
  }

  if (fileProblems.length > 0) {
    problems.push({ file: f, problems: fileProblems });
  } else {
    valid++;
  }
}

console.log('Total files:', files.length);
console.log('Valid:', valid);
console.log('With problems:', problems.length);
console.log('Total words in all articles:', totalWords);
console.log('Average word count:', Math.round(totalWords / files.length));
console.log('Unique slugs:', slugSet.size);

if (problems.length > 0) {
  console.log('\n=== First 15 problems ===');
  for (const p of problems.slice(0, 15)) {
    console.log(`${p.file}:`);
    for (const prob of p.problems) console.log('  -', prob);
  }
}