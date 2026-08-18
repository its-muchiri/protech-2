const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const filePath = 'content/blog/specific-camp-collection-package-quote-e-g-governors-kicheche-porini.md';
const raw = fs.readFileSync(filePath, 'utf8');

const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (!match) {
  console.log('No match');
  process.exit(1);
}

let fmText = match[1];
const body = match[2];

console.log('fmText:');
console.log(fmText.slice(0, 500));
console.log('---');

let meta;
try {
  meta = yaml.load(fmText) || {};
} catch (e) {
  console.log('YAML error:', e.message);
  process.exit(1);
}

console.log('meta.style_batch:', meta.style_batch, typeof meta.style_batch);
console.log('meta.style_batch === 3:', meta.style_batch === 3);
console.log('String(meta.style_batch) === "3":', String(meta.style_batch) === "3");