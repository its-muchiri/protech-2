const fs = require('fs');
const f = 'content/blog/adventure-tour-company-hell-s-gate-cycling-and-naivasha-boat-ride.md';
const raw = fs.readFileSync(f, 'utf8');
const match = raw.match(/^title: '(.+)'$/m);
console.log('title:', match ? match[1] : 'none');
console.log('has Hell:', raw.includes('Hell'));
console.log('has apostrophe in title:', raw.includes("Hell's"));