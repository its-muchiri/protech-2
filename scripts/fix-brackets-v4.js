// Fix YAML-breaking issues in NEWLY generated articles (style_batch: 3 only)
// Use robust regex to find frontmatter boundaries, pre-process to remove brackets
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
  
  // Robust regex: find first ---, then next --- at start of line
  // Handles both \n and \r\n
  const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---)/);
  if (!match) {
    failed.push({ file: f, reason: 'no frontmatter found' });
    continue;
  }
  
  let fmText = match[1];
  const body = raw.substring(match[1].length);
  
  // Pre-process: remove bracket placeholders before YAML parsing
  // But be careful: don't break the structure
  // Replace [anything] with empty string in values only
  // For simplicity: replace all [text] patterns in the whole frontmatter
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  // Also escape single quotes in string values
  // Pattern: key: 'value with 'quote''
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
    const fixed = removeBrackets(meta.primary_keyword);
    if (fixed !== meta.primary_keyword) { newMeta.primary_keyword = fixed; changed = true; }
  }
  
  if (meta.secondary_keywords) {
    const fixed = meta.secondary_keywords
      .map(k => removeBrackets(k))
      .filter(k => k.length > 0);
    if (JSON.stringify(fixed) !== JSON.stringify(meta.secondary_keywords)) { newMeta.secondary_keywords = fixed; changed = true; }
  }
  
  if (meta.title) {
    const fixed = removeBrackets(meta.title);
    if (fixed !== meta.title) { newMeta.title = fixed; changed = true; }
  }
  
  if (meta.description) {
    const fixed = removeBrackets(meta.description);
    if (fixed !== meta.description) { newMeta.description = fixed; changed = true; }
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