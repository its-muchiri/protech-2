const fs = require('fs');
const path = require('path');

const dir = 'content/blog';
let fixed = 0;
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const titleMatch = content.match(/^title: '(.+)'$/m);
  const h1Match = content.match(/^# (.+)$/m);
  
  if (titleMatch && h1Match && titleMatch[1] !== h1Match[1]) {
    const correctH1 = '# ' + titleMatch[1].replace(/''/g, "'");
    content = content.replace(/^# .+$/, correctH1);
    fs.writeFileSync(fp, content);
    fixed++;
  }
}
console.log('Fixed H1 mismatches:', fixed);