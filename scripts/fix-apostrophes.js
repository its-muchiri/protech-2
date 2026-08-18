// Fix apostrophes in title/description in frontmatter of NEW articles
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let failed = [];

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Exact regex from lib/blog-content.js
  const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---)/);
  if (!match) {
    failed.push({ file: f, reason: 'no frontmatter' });
    continue;
  }
  
  let fmText = match[1];
  const body = raw.substring(match[1].length);
  
  // Remove brackets first
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  // Escape single quotes in single-line: key: 'value' patterns
  // This handles title, description, primary_keyword, slug (single line values)
  fmText = fmText.replace(/^(\w+:)\s*'([^']*)'$/gm, (m, key, val) => {
    return key + " '" + val.replace(/'/g, "''") + "'";
  });
  
  // Also handle: key: "value" patterns (double quotes)
  fmText = fmText.replace(/^(\w+:)\s*"([^"]*)"$/gm, (m, key, val) => {
    return key + " '" + val.replace(/'/g, "''") + "'";
  });
  
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    failed.push({ file: f, reason: 'yaml: ' + e.message.slice(0, 80) });
    continue;
  }
  
  // Only fix style_batch: 3 (newly generated)
  if (meta.style_batch !== 3) continue;
  
  // Re-serialize with proper escaping
  const fmLines = ['---'];
  fmLines.push(`title: '${meta.title}'`);
  fmLines.push(`description: ${meta.description}`);
  fmLines.push(`slug: ${meta.slug}`);
  fmLines.push(`primary_keyword: ${meta.primary_keyword}`);
  fmLines.push('secondary_keywords:');
  for (const kw of meta.secondary_keywords || []) {
    fmLines.push(`- ${kw}`);
  }
  fmLines.push(`search_intent: ${meta.search_intent}`);
  fmLines.push(`article_style: ${meta.article_style}`);
  fmLines.push(`style_batch: ${meta.style_batch}`);
  fmLines.push(`word_count: ${meta.word_count}`);
  fmLines.push(`status: ${meta.status}`);
  fmLines.push('---');
  
  const newContent = fmLines.join('\n') + '\n' + body;
  fs.writeFileSync(filePath, newContent);
  fixed++;
}

console.log('Fixed:', fixed);
console.log('Failed:', failed.length);
if (failed.length) {
  for (const f of failed.slice(0, 20)) console.log(' -', f.file, ':', f.reason);
}