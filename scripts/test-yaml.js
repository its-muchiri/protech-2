const fs = require('fs');
const yaml = require('js-yaml');
const raw = fs.readFileSync('content/blog/10-day-kenya-safari-tour-cost-estimate-europe.md', 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
if (match) {
  const meta = yaml.load(match[1]);
  console.log('Success!');
  console.log('secondary_keywords:', meta.secondary_keywords);
} else {
  console.log('No match');
}