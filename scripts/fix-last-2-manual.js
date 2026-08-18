// Fix the last 2 files - manual approach
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
  
  const fmText = raw.substring(4, fmEnd - 3); // Skip first '---' and last '---'
  const body = raw.substring(fmEnd);
  
  console.log('Original FM for', f + ':');
  console.log(fmText);
  console.log('---');
  
  // Parse line by line manually
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
      if (line.startsWith('  - ')) {
        meta.secondary_keywords.push(line.substring(4).trim());
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
  
  console.log('Parsed meta:', JSON.stringify(meta, null, 2));
  
  if (meta.style_batch !== '3') {
    console.log('SKIP:', f);
    continue;
  }
  
  // Re-serialize with proper quoting
  const fmLines = ['---'];
  fmLines.push(`title: '${meta.title}'`);
  fmLines.push(`description: '${meta.description}'`);
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
  console.log('Fixed:', f);
}

console.log('Done!');