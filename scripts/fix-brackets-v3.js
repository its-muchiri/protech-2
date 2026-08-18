// Fix YAML-breaking issues in NEWLY generated articles (style_batch: 3 only)
// Pre-process frontmatter to remove brackets before YAML parsing
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let skipped = 0;
let failed = [];

function removeBrackets(str) {
  // Remove [bracket placeholders] like [Operator Name], [Season], [Month], [Date], [Year], [Lodge Name], etc.
  return str.replace(/\[[^\]]+\]/g, '').trim();
}

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Find frontmatter boundaries manually to handle CRLF
  let fmEnd = -1;
  let dashCount = 0;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '-' && (i === 0 || raw[i-1] === '\n' || raw[i-1] === '\r')) {
      if (i + 2 < raw.length && raw[i+1] === '-' && raw[i+2] === '-') {
        dashCount++;
        if (dashCount === 2) {
          fmEnd = i + 3;
          break;
        }
      }
    }
  }
  if (fmEnd === -1) {
    failed.push({ file: f, reason: 'no frontmatter end found' });
    continue;
  }
  
  let fmText = raw.substring(0, fmEnd);
  const body = raw.substring(fmEnd);
  
  // Pre-process frontmatter: remove brackets before YAML parsing
  fmText = fmText.replace(/^(\s*-\s*)\[[^\]]+\]/gm, '$1').replace(/\[[^\]]+\]/g, '');
  // Escape single quotes in values
  fmText = fmText.replace(/(:\s*['"]?)([^'"]*)'/g, (m, p1, p2) => p1 + p2.replace(/'/g, "''"));
  
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
    const fixed = removeBrackets(meta.primary_keyword).replace(/'/g, "''");
    if (fixed !== meta.primary_keyword) { newMeta.primary_keyword = fixed; changed = true; }
  }
  
  if (meta.secondary_keywords) {
    const fixed = meta.secondary_keywords
      .map(k => removeBrackets(k).replace(/'/g, "''"))
      .filter(k => k.length > 0);
    if (JSON.stringify(fixed) !== JSON.stringify(meta.secondary_keywords)) { newMeta.secondary_keywords = fixed; changed = true; }
  }
  
  if (meta.title) {
    const fixed = removeBrackets(meta.title).replace(/'/g, "''");
    if (fixed !== meta.title) { newMeta.title = fixed; changed = true; }
  }
  
  if (meta.description) {
    const fixed = removeBrackets(meta.description).replace(/'/g, "''");
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