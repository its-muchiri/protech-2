// Find and fix YAML-breaking keywords with brackets or special chars in generated articles
const fs = require('fs');
const path = require('path');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let bracketFiles = [];
let yamlFailFiles = [];

function findBrackets(content) {
  // Look for [ ... ] in frontmatter
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return false;
  return /\[.*\]/.test(fm[1]);
}

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (findBrackets(content)) {
    bracketFiles.push(f);
  }
}

console.log('Files with brackets in frontmatter:', bracketFiles.length);
for (const f of bracketFiles.slice(0, 20)) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const bracketLines = fm[1].split('\n').filter(l => /\[.*\]/.test(l));
  console.log(' -', f);
  for (const l of bracketLines) console.log('    ', l.trim());
}