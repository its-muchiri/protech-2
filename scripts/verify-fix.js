const fs = require('fs');
const yaml = require('js-yaml');
const raw = fs.readFileSync('content/blog/adventure-tour-company-hell-s-gate-cycling-and-naivasha-boat-ride.md', 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (match) {
  const meta = yaml.load(match[1]);
  console.log('Success! title:', meta.title);
  console.log('style_batch:', meta.style_batch);
} else {
  console.log('No match');
}