// Fix frontmatter by parsing line-by-line (no YAML loading needed)
const fs = require('fs');
const path = require('path');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let fixed = 0;

for (const f of files) {
  const filePath = path.join(dir, f);
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
  
  const fmText = raw.substring(fmStart, fmEnd);
  const body = raw.substring(fmEnd);
  
  // Parse line by line
  const lines = fmText.split(/\r?\n/);
  const newLines = ['---'];
  let inSecondary = false;
  let isBatch3 = false;
  
  for (let i = 1; i < lines.length - 1; i++) { // skip first and last ---
    const line = lines[i];
    
    if (line.startsWith('secondary_keywords:')) {
      inSecondary = true;
      newLines.push(line);
      continue;
    }
    
    if (inSecondary) {
      if (line.match(/^\s*-\s/)) {
        // Secondary keyword line - clean it
        const kw = line.replace(/^\s*-\s*/, '').trim();
        const cleaned = kw.replace(/\[[^\]]+\]/g, '').replace(/'/g, "''").trim();
        if (cleaned) newLines.push(`- '${cleaned}'`);
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
        
        // Clean value
        val = val.replace(/\[[^\]]+\]/g, '').replace(/'/g, "''").trim();
        
        if (key === 'style_batch') {
          isBatch3 = (val === '3' || val === '"3"');
        }
        
        // Re-add with proper quoting for string fields
        if (['title', 'description', 'primary_keyword', 'secondary_keywords'].includes(key)) {
          // These are handled above for secondary_keywords, so just re-add
          if (key !== 'secondary_keywords') {
            newLines.push(`${key}: '${val}'`);
          }
        } else {
          newLines.push(`${key}: ${val}`);
        }
      }
    }
  }
  
  newLines.push('---');
  
  if (!isBatch3) continue;
  
  // Check if anything changed
  const newFm = newLines.join('\n');
  if (newFm !== fmText) {
    const newContent = newFm + '\n' + body;
    fs.writeFileSync(filePath, newContent);
    fixed++;
  }
}

console.log('Fixed:', fixed);