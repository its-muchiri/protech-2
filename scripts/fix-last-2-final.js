// Fix the last 2 files - ensure description is properly quoted
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const problemFiles = [
  'child-friendly-malaria-free-kenya-safari-note-difficult-combination.md',
  'kenya-safari-non-malarial-note-most-key-parks-are-malarial.md',
];

for (const f of problemFiles) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Manual parse: find the frontmatter boundaries
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
    console.log('NO FM END:', f);
    continue;
  }
  
  const fmText = raw.substring(4, fmEnd - 3);
  const body = raw.substring(fmEnd);
  
  // Parse manually but handle multi-word values with colons
  const lines = fmText.split(/\r?\n/);
  const meta = {};
  let inSecondary = false;
  
  for (const line of lines) {
    if (line.startsWith('secondary_keywords:')) {
      inSecondary = true;
      meta.secondary_keywords = [];
      continue;
    }
    if (inSecondary) {
      if (line.match(/^\s*-\s/)) {
        meta.secondary_keywords.push(line.replace(/^\s*-\s*/, '').trim());
      } else {
        inSecondary = false;
      }
    }
    if (!inSecondary) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const key = line.substring(0, colonIdx).trim();
        let val = line.substring(colonIdx + 1).trim();
        // Remove surrounding quotes if present
        if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
          val = val.slice(1, -1);
        }
        // Remove brackets
        val = val.replace(/\[[^\]]+\]/g, '').trim();
        meta[key] = val;
      }
    }
  }
  
  // Fix secondary_keywords - they might have been lost, restore from original
  if (meta.secondary_keywords.length === 0) {
    // Extract from original raw
    const origMatch = raw.match(/secondary_keywords:([\s\S]*?)(?:\n\w+:|\n---)/);
    if (origMatch) {
      const secLines = origMatch[1].split('\n');
      for (const l of secLines) {
        const m = l.match(/-\s*(.+)/);
        if (m) meta.secondary_keywords.push(m[1].replace(/\[[^\]]+\]/g, '').trim());
      }
      meta.secondary_keywords = meta.secondary_keywords.filter(k => k.length > 0);
    }
  }
  
  console.log(f, 'secondary_keywords:', meta.secondary_keywords.length);
  
  if (meta.style_batch !== '3') {
    console.log('SKIP:', f);
    continue;
  }
  
  // Re-serialize with proper quoting - ALL string values in single quotes
  const fmLines = ['---'];
  fmLines.push(`title: '${meta.title}'`);
  fmLines.push(`description: '${meta.description}'`);
  fmLines.push(`slug: ${meta.slug}`);
  fmLines.push(`primary_keyword: '${meta.primary_keyword}'`);
  fmLines.push('secondary_keywords:');
  for (const kw of meta.secondary_keywords || []) {
    fmLines.push(`- '${kw}'`);
  }
  fmLines.push(`search_intent: ${meta.search_intent}`);
  fmLines.push(`article_style: ${meta.article_style}`);
  fmLines.push(`style_batch: ${meta.style_batch}`);
  fmLines.push(`word_count: ${meta.word_count}`);
  fmLines.push(`status: ${meta.status}`);
  fmLines.push('---');
  
  const newContent = fmLines.join('\n') + '\n' + body;
  fs.writeFileSync(filePath, newContent);
  console.log('Fixed:', f);
}

console.log('Done!');