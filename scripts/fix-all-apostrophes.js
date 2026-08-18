// Fix ALL unescaped apostrophes in frontmatter fields across all style_batch: 3 articles
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
    // Parse failed - need to fix by escaping apostrophes in single-quoted values
    // First, let's manually parse the frontmatter line by line
    const lines = fmText.split(/\r?\n/);
    const newLines = [];
    for (const line of lines) {
      // Match: key: 'value with 'apostrophe''
      const m = line.match(/^(\s*\w+:\s*)'(.+)'$/);
      if (m) {
        // Escape any single quotes in the value
        const key = m[1];
        let val = m[2].replace(/'/g, "''");
        newLines.push(key + "'" + val + "'");
      } else {
        newLines.push(line);
      }
    }
    fmText = newLines.join('\n');
    
    try {
      meta = yaml.load(fmText) || {};
    } catch (e2) {
      errors++;
      continue;
    }
  }
  
  if (meta.style_batch !== 3) continue;
  
  // Now properly re-serialize with all string values quoted and escaped
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