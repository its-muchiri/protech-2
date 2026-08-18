const fs = require('fs');
const raw = fs.readFileSync('content/blog/10-day-kenya-safari-tour-cost-estimate-europe.md', 'utf8');
const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
let fmText = match[1];
console.log('Original FM last lines:');
console.log(fmText.split('\n').slice(-5).join('\n'));
console.log('---');
// Apply my pre-processing
fmText = fmText.replace(/\[[^\]]+\]/g, '');
fmText = fmText.replace(/(^|\n)(\w+:)\s*['"]?([^'"]*)'/g, (m, p1, p2, p3) => {
  return p1 + p2 + " '" + p3.replace(/'/g, "''") + "'";
});
console.log('Processed FM last lines:');
console.log(fmText.split('\n').slice(-5).join('\n'));