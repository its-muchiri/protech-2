const fs = require('fs');
const yaml = require('js-yaml');
const raw = fs.readFileSync('content/blog/10-day-kenya-safari-tour-cost-estimate-europe.md', 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
let fmText = match[1];
// Only remove brackets, don't touch quotes
fmText = fmText.replace(/\[[^\]]+\]/g, '');
console.log('Loading YAML...');
const meta = yaml.load(fmText);
console.log('Success!');
console.log('style_batch:', meta.style_batch);
console.log('word_count:', meta.word_count);
console.log('secondary_keywords:', meta.secondary_keywords);