const fs = require('fs');
const yaml = require('js-yaml');
const raw = fs.readFileSync('content/blog/specific-camp-collection-package-quote-e-g-governors-kicheche-porini.md', 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (match) {
  const meta = yaml.load(match[1]);
  console.log('Success!');
  console.log('title:', meta.title);
  console.log('primary_keyword:', meta.primary_keyword);
  console.log('style_batch:', meta.style_batch);
}