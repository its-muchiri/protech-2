// Fix the last 2 files with unquoted description containing colons
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
  if (!fs.existsSync(filePath)) {
    console.log('NOT FOUND:', f);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  
  const match = raw.match(/^(---\r?\n[\s\S]*?\r?\n---)/);
  if (!match) {
    console.log('NO MATCH:', f);
    continue;
  }
  
  let fmText = match[1];
  const body = raw.substring(match[1].length);
  
  // Remove brackets
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  // Fix: ensure description is quoted (it currently has no quotes and contains colons)
  // Pattern: description: value without quotes
  fmText = fmText.replace(/^(description:)\s*([^'"][^\n]*[^'"])$/gm, (m, key, val) => {
    return key + " '" + val.trim().replace(/'/g, "''") + "'";
  });
  
  // Also fix title if unquoted (shouldn't happen but safe)
  fmText = fmText.replace(/^(title:)\s*([^'"][^\n]*[^'"])$/gm, (m, key, val) => {
    return key + " '" + val.trim().replace(/'/g, "''") + "'";
  });
  
  // Also escape single quotes in already-quoted values
  fmText = fmText.replace(/^(\w+:)\s*'([^']*(?:'[^']*)*)'$/gm, (m, key, val) => {
    return key + " '" + val.replace(/'/g, "''") + "'";
  });
  
  // Remove brackets
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    console.log('YAML ERROR:', f, e.message.slice(0, 100));
    console.log('fmText was:');
    console.log(fmText.split('\n').slice(0, 10).join('\n'));
    continue;
  }
  
  if (meta.style_batch !== 3) {
    console.log('SKIP (not batch 3):', f);
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