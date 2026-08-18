const fs = require('fs');
const path = require('path');
const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
console.log('Total blog files now:', files.length);

// Check for garbage keywords in generated articles
let garbage = 0;
const garbageTerms = ['include the word', 'okay,', 'here is', 'here are', 'i. ', 'ii. ', 'iii. '];
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const kw = content.match(/^primary_keyword: (.*)/m);
  if (kw) {
    const kwLower = kw[1].toLowerCase();
    for (const g of garbageTerms) {
      if (kwLower.includes(g)) {
        console.log('GARBAGE:', f, '->', kw[1]);
        garbage++;
        break;
      }
    }
  }
}
console.log('Garbage files:', garbage);

// Check BEST prefix count
let bestCount = 0;
for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  if (content.includes("title: 'BEST ")) bestCount++;
}
console.log('Articles with BEST prefix:', bestCount);