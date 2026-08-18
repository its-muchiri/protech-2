// Fix ALL style_batch: 3 files - remove brackets and escape apostrophes in ALL frontmatter fields
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;

for (const f of files) {
  const filePath = path.join(dir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) continue;
  
  let fmText = match[1];
  const body = match[2];
  
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    continue;
  }
  
  // style_batch from YAML is a string "3"
  if (String(meta.style_batch) !== "3") continue;
  
  // Clean all string fields: remove brackets, escape apostrophes
  const clean = (val) => {
    if (typeof val !== 'string') return val;
    return val
      .replace(/\[[^\]]+\]/g, '')  // Remove [brackets]
      .replace(/'/g, "''");        // Escape apostrophes
  };
  
  // Check if any field needs cleaning
  const needsCleaning = 
    clean(meta.title) !== meta.title ||
    clean(meta.description) !== meta.description ||
    clean(meta.primary_keyword) !== meta.primary_keyword ||
    (meta.secondary_keywords && meta.secondary_keywords.some(k => clean(k) !== k));
  
  if (!needsCleaning) continue;
  
  // Clean all fields
  if (meta.title) meta.title = clean(meta.title);
  if (meta.description) meta.description = clean(meta.description);
  if (meta.primary_keyword) meta.primary_keyword = clean(meta.primary_keyword);
  if (meta.secondary_keywords) {
    meta.secondary_keywords = meta.secondary_keywords.map(clean);
  }
  
  // Re-serialize with proper quoting
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
  fixed++;
}

console.log('Fixed:', fixed);