const fs = require('fs');
const raw = fs.readFileSync('content/blog/10-day-kenya-tanzania-tour-sale-season.md', 'utf8');
const title = raw.match(/^title: '(.+)'$/m);
const h1 = raw.match(/^# (.+)$/m);
console.log('title raw:', JSON.stringify(title ? title[1] : 'none'));
console.log('h1 raw:', JSON.stringify(h1 ? h1[1] : 'none'));
console.log('title processed:', title ? title[1].replace(/''/g, "'").replace(/\[[^\]]+\]/g, '').trim() : 'none');
console.log('h1 processed:', h1 ? h1[1].replace(/\[[^\]]+\]/g, '').trim() : 'none');