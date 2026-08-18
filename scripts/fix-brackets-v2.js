// Fix YAML-breaking issues in NEWLY generated articles (style_batch: 3 only)
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let skipped = 0;
let failed = [];

function fixValue(val) {
  if (typeof val === 'string') {
    // Remove [bracket placeholders] like [Operator Name], [Season], [Month], [Date], [Year], [Lodge Name], etc.
    val = val.replace(/\[[^\]]+\]/g, '').trim();
    // Escape single quotes for YAML
    val = val.replace(/'/g, "''");
  } else if (Array.isArray(val)) {
    val = val
      .map(item => fixValue(item))
      .filter(item => typeof item === 'string' && item.length > 0);
  }
  return val;
}

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Parse using the same logic as lib/blog-content.js
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    failed.push({ file: f, reason: 'frontmatter parse failed' });
    continue;
  }
  
  let meta;
  try {
    meta = yaml.load(match[1]) || {};
  } catch (e) {
    failed.push({ file: f, reason: 'yaml parse: ' + e.message });
    continue;
  }
  
  // Only fix style_batch: 3 (newly generated)
  if (meta.style_batch !== 3) {
    skipped++;
    continue;
  }
  
  let changed = false;
  const newMeta = { ...meta };
  
  // Fix primary_keyword
  if (meta.primary_keyword) {
    const fixed = fixValue(meta.primary_keyword);
    if (fixed !== meta.primary_keyword) {
      newMeta.primary_keyword = fixed;
      changed = true;
    }
  }
  
  // Fix secondary_keywords
  if (meta.secondary_keywords) {
    const fixed = fixValue(meta.secondary_keywords);
    if (JSON.stringify(fixed) !== JSON.stringify(meta.secondary_keywords)) {
      newMeta.secondary_keywords = fixed;
      changed = true;
    }
  }
  
  // Fix title
  if (meta.title) {
    const fixed = fixValue(meta.title);
    if (fixed !== meta.title) {
      newMeta.title = fixed;
      changed = true;
    }
  }
  
  // Fix description
  if (meta.description) {
    const fixed = fixValue(meta.description);
    if (fixed !== meta.description) {
      newMeta.description = fixed;
      changed = true;
    }
  }
  
  if (changed) {
    // Serialize back to YAML with proper formatting
    const fmLines = ['---'];
    fmLines.push(`title: '${newMeta.title}'`);
    fmLines.push(`description: ${newMeta.description}`);
    fmLines.push(`slug: ${newMeta.slug}`);
    fmLines.push(`primary_keyword: ${newMeta.primary_keyword}`);
    fmLines.push('secondary_keywords:');
    for (const kw of newMeta.secondary_keywords || []) {
      fmLines.push(`- ${kw}`);
    }
    fmLines.push(`search_intent: ${newMeta.search_intent}`);
    fmLines.push(`article_style: ${newMeta.article_style}`);
    fmLines.push(`style_batch: ${newMeta.style_batch}`);
    fmLines.push(`word_count: ${newMeta.word_count}`);
    fmLines.push(`status: ${newMeta.status}`);
    fmLines.push('---');
    
    const newContent = fmLines.join('\n') + '\n' + match[2];
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
}

console.log('Fixed:', fixed);
console.log('Skipped (pre-existing):', skipped);
console.log('Failed:', failed.length);
if (failed.length) {
  for (const f of failed.slice(0, 10)) console.log(' -', f.file, ':', f.reason);
}