// Fix YAML-breaking bracket placeholders in generated articles
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;
let failed = 0;

function fixBracketsInArray(arr) {
  if (!Array.isArray(arr)) return arr;
  return arr.map(item => {
    if (typeof item !== 'string') return item;
    // Remove or replace bracket placeholders like [Operator Name], [Season], [Month], etc.
    return item
      .replace(/\[[^\]]+\]/g, '') // Remove [anything] placeholders
      .trim();
  }).filter(item => item.length > 0);
}

for (const f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract and fix frontmatter
  const fmMatch = content.match(/^(---\r?\n[\s\S]*?\r?\n---)/);
  if (!fmMatch) continue;
  
  let fmText = fmMatch[1];
  let meta;
  try {
    meta = yaml.load(fmText);
  } catch (e) {
    console.log('YAML parse failed:', f, e.message);
    failed++;
    continue;
  }
  
  let changed = false;
  if (meta.secondary_keywords) {
    const fixedKw = fixBracketsInArray(meta.secondary_keywords);
    if (JSON.stringify(fixedKw) !== JSON.stringify(meta.secondary_keywords)) {
      meta.secondary_keywords = fixedKw;
      changed = true;
    }
  }
  
  // Also fix primary_keyword if it has brackets
  if (meta.primary_keyword && /\[.*\]/.test(meta.primary_keyword)) {
    meta.primary_keyword = meta.primary_keyword.replace(/\[[^\]]+\]/g, '').trim();
    changed = true;
  }
  
  // Also fix title/description if they have brackets
  if (meta.title && /\[.*\]/.test(meta.title)) {
    meta.title = meta.title.replace(/\[[^\]]+\]/g, '').trim();
    changed = true;
  }
  if (meta.description && /\[.*\]/.test(meta.description)) {
    meta.description = meta.description.replace(/\[[^\]]+\]/g, '').trim();
    changed = true;
  }
  
  if (changed) {
    // Rebuild frontmatter
    let newFm = '---\n';
    newFm += `title: '${meta.title}'\n`;
    newFm += `description: ${meta.description}\n`;
    newFm += `slug: ${meta.slug}\n`;
    newFm += `primary_keyword: ${meta.primary_keyword}\n`;
    newFm += 'secondary_keywords:\n';
    for (const kw of meta.secondary_keywords || []) {
      newFm += `- ${kw}\n`;
    }
    newFm += `search_intent: ${meta.search_intent}\n`;
    newFm += `article_style: ${meta.article_style}\n`;
    newFm += `style_batch: ${meta.style_batch}\n`;
    newFm += `word_count: ${meta.word_count}\n`;
    newFm += `status: ${meta.status}\n`;
    newFm += '---\n';
    
    content = content.replace(/^---[\s\S]*?---/, newFm);
    fs.writeFileSync(filePath, content);
    fixed++;
  }
}

console.log('Fixed:', fixed);
console.log('Failed (unparsable):', failed);