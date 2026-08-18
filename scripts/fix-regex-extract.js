// Extract each field from raw frontmatter using regex, clean, and write valid YAML
const fs = require('fs');
const path = require('path');

const blogDir = 'content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let fixed = 0;

function extractField(fmText, field) {
  const regex = new RegExp(`^${field}:\\s*(['"]?)([\\s\\S]*?)\\1$`, 'm');
  const match = fmText.match(regex);
  if (!match) return null;
  return match[2].trim();
}

function clean(val) {
  if (!val) return val;
  return val
    .replace(/\[[^\]]+\]/g, '')
    .replace(/'/g, "''")
    .trim();
}

for (const f of files) {
  const filePath = path.join(blogDir, f);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Find frontmatter boundaries
  let fmStart = -1, fmEnd = -1;
  let dashCount = 0;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '-' && (i === 0 || raw[i-1] === '\n' || raw[i-1] === '\r')) {
      if (i + 2 < raw.length && raw[i+1] === '-' && raw[i+2] === '-') {
        dashCount++;
        if (dashCount === 1) fmStart = i;
        else if (dashCount === 2) { fmEnd = i + 3; break; }
      }
    }
  }
  if (fmStart === -1 || fmEnd === -1) continue;
  
  const fmText = raw.substring(fmStart + 3, fmEnd - 3); // inner content
  const body = raw.substring(fmEnd);
  
  // Extract each field using regex
  const title = extractField(fmText, 'title');
  const description = extractField(fmText, 'description');
  const slug = extractField(fmText, 'slug');
  const primary_keyword = extractField(fmText, 'primary_keyword');
  const search_intent = extractField(fmText, 'search_intent');
  const article_style = extractField(fmText, 'article_style');
  const style_batch = extractField(fmText, 'style_batch');
  const word_count = extractField(fmText, 'word_count');
  const status = extractField(fmText, 'status');
  
  // Extract secondary_keywords array
  let secondary_keywords = [];
  const secMatch = fmText.match(/secondary_keywords:([\s\S]*?)(?:\n\w+:|\n---|$)/);
  if (secMatch) {
    const secLines = secMatch[1].split('\n');
    for (const line of secLines) {
      const m = line.match(/^\s*-\s*(.+)/);
      if (m) secondary_keywords.push(m[1].trim());
    }
  }
  
  // Check if style_batch is "3"
  if (String(style_batch) !== "3") continue;
  
  // Clean all fields
  const clean = (val) => {
    if (!val) return val;
    return val
      .replace(/\[[^\]]+\]/g, '')
      .replace(/'/g, "''")
      .trim();
  };
  
  const needsCleaning = 
    clean(title) !== title ||
    clean(description) !== description ||
    clean(primary_keyword) !== primary_keyword ||
    secondary_keywords.some(k => clean(k) !== k);
  
  if (!needsCleaning) continue;
  
  // Build new frontmatter
  const fmLines = ['---'];
  fmLines.push(`title: '${clean(title)}'`);
  fmLines.push(`description: '${clean(description)}'`);
  fmLines.push(`slug: ${slug}`);
  fmLines.push(`primary_keyword: '${clean(primary_keyword)}'`);
  fmLines.push('secondary_keywords:');
  for (const kw of secondary_keywords) {
    fmLines.push(`- '${clean(kw)}'`);
  }
  fmLines.push(`search_intent: ${search_intent}`);
  fmLines.push(`article_style: ${article_style}`);
  fmLines.push(`style_batch: ${style_batch}`);
  fmLines.push(`word_count: ${word_count}`);
  fmLines.push(`status: ${status}`);
  fmLines.push('---');
  
  const newContent = fmLines.join('\n') + '\n' + body;
  fs.writeFileSync(filePath, newContent);
  fixed++;
}

console.log('Fixed:', fixed);