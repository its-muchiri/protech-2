const fs = require('fs');
const path = require('path');

const kw = JSON.parse(fs.readFileSync('data/keywords-extracted.json', 'utf8'));
const kismet = kw.filter(k => k.prefix === 'BEST');
console.log('Kismet keywords with BEST:', kismet.length);

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// Find BEST-prefixed articles
const bestFiles = files.filter(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  return content.includes("title: 'BEST ");
});
console.log('BEST files:', bestFiles.length);
for (const f of bestFiles) console.log(' -', f);

// Check which kismet keywords got generated
let generated = 0;
let skipped = 0;
for (const k of kismet) {
  const slug = k.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  const f = path.join(dir, slug + '.md');
  if (fs.existsSync(f)) generated++;
  else skipped++;
}
console.log('Kismet generated:', generated, 'skipped/missing:', skipped);

// Show first few missing
let shown = 0;
for (const k of kismet) {
  const slug = k.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  const f = path.join(dir, slug + '.md');
  if (!fs.existsSync(f) && shown < 10) {
    console.log('MISSING:', k.keyword, '-> slug:', slug);
    shown++;
  }
}