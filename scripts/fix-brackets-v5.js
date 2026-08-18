// Fix YAML-breaking issues in NEWLY generated articles (style_batch: 3 only)
// Use exact working regex from lib/blog-content.js
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let skipped = 0;
let failed = [];

function removeBrackets(str) {
  return str.replace(/\[[^\]]+\]/g, '').trim();
}

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Exact regex from lib/blog-content.js
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    failed.push({ file: f, reason: 'frontmatter regex no match' });
    continue;
  }
  
  let fmText = match[1];
  const body = match[2];
  
  // Pre-process: remove bracket placeholders before YAML parsing
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  // Escape single quotes in string values
  fmText = fmText.replace(/(^|\n)(\w+:)\s*['"]?([^'"]*)'/g, (m, p1, p2, p3) => {
    return p1 + p2 + " '" + p3.replace(/'/g, "''") + "'";
  });
  
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    failed.push({ file: f, reason: 'yaml parse: ' + e.message.slice(0, 100) });
    continue;
  }
  
  // Only fix style_batch: 3 (newly generated)
  if (meta.style_batch !== 3) {
    skipped++;
    continue;
  }
  
  // Fix values
  let changed = false;
  const newMeta = { ...meta };
  
  if (meta.primary_keyword) {
    const fixedVal = removeBrackets(meta.primary_keyword);
    if (fixedVal !== meta.primary_keyword) { newMeta.primary_keyword = fixedVal; changed = true; }
  }
  
  if (meta.secondary_keywords) {
    const fixedVal = meta.secondary_keywords
      .map(k => removeBrackets(k))
      .filter(k => k.length > 0);
    if (JSON.stringify(fixedVal) !== JSON.stringify(meta.secondary_keywords)) { newMeta.secondary_keywords = fixedVal; changed = true; }
  }
  
  if (meta.title) {
    const fixedVal = removeBrackets(meta.title);
    if (fixedVal !== meta.title) { newMeta.title = fixedVal; changed = true; }
  }
  
  if (meta.description) {
    const fixedVal = removeBrackets(meta.description);
    if (fixedVal !== meta.description) { newMeta.description = fixedVal; changed = true; }
  }
  
  if (changed) {
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
    
    const newContent = fmLines.join('\n') + '\n' + body;
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
}

console.log('Fixed:', fixed);
console.log('Skipped (pre-existing):', skipped);
console.log('Failed:', failed.length);
if (failed.length) {
  for (const f of failed.slice(0, 20)) console.log(' -', f.file, ':', f.reason);
}