// Test that blog-content parse logic works for a sample of new articles
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parsePost(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  const meta = yaml.load(match[1]) || {};
  return { slug: meta.slug, title: meta.title, category: meta.category, status: meta.status, primary_keyword: meta.primary_keyword };
}

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
let parseFail = 0;
let checked = 0;
let failSamples = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const parsed = parsePost(raw);
  checked++;
  if (!parsed) {
    parseFail++;
    if (failSamples.length < 5) failSamples.push(f);
  }
}
console.log('Total files:', files.length);
console.log('Checked:', checked);
console.log('Parse failures:', parseFail);
if (failSamples.length) console.log('Fail samples:', failSamples.join(', '));