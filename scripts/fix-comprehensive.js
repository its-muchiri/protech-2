// Comprehensive fix: remove ALL bracket placeholders and escape ALL apostrophes in frontmatter
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let errors = 0;

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    errors++;
    continue;
  }
  
  let fmText = match[1];
  const body = match[2];
  
  // Try to parse - if it fails, we need to fix
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    // Parse failed - fix the frontmatter text directly
    // 1. Remove ALL [bracketed placeholders] like [Specific Camp Collection], [Operator Name], etc.
    fmText = fmText.replace(/\[[^\]]+\]/g, '');
    
    // 2. Escape single quotes in single-quoted values (key: 'value')
    fmText = fmText.replace(/^(\s*\w+:\s*)'([^']*)'$/gm, (m, prefix, val) => {
      return prefix + "'" + val.replace(/'/g, "''") + "'";
    });
    
    // 3. Also handle unquoted values that contain colons (like description)
    fmText = fmText.replace(/^(\s*(description|primary_keyword):\s*)([^'"][^\n]*[^'"])$/gm, (m, prefix, key, val) => {
      return prefix + "'" + val.trim().replace(/'/g, "''") + "'";
    });
    
    try {
      meta = yaml.load(fmText) || {};
    } catch (e2) {
      errors++;
      continue;
    }
  }
  
  if (meta.style_batch !== 3) continue;
  
  // Now properly re-serialize with ALL string values properly quoted and escaped
  const fmLines = ['---'];
  fmLines.push(`title: '${(meta.title || '').replace(/'/g, "''")}'`);
  fmLines.push(`description: '${(meta.description || '').replace(/'/g, "''")}'`);
  fmLines.push(`slug: ${meta.slug}`);
  fmLines.push(`primary_keyword: '${(meta.primary_keyword || '').replace(/'/g, "''")}'`);
  fmLines.push('secondary_keywords:');
  for (const kw of meta.secondary_keywords || []) {
    fmLines.push(`- '${kw.replace(/'/g, "''")}'`);
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
console.log('Errors:', errors);