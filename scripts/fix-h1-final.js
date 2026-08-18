const fs = require('fs');
const path = require('path');

const dir = 'content/blog';
let fixed = 0;
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const fp = path.join(dir, f);
  let content = fs.readFileSync(fp, 'utf8');
  
  const titleMatch = content.match(/^title: '(.+)'$/m);
  const h1Match = content.match(/^# (.+)$/m);
  
  if (titleMatch && h1Match) {
    // Normalize: remove brackets, collapse spaces around colon
    const normalize = (s) => s
      .replace(/\[[^\]]+\]/g, '')
      .replace(/\s+:/g, ':')
      .replace(/''/g, "'")
      .trim();
    
    const titleVal = normalize(titleMatch[1]);
    const h1Val = normalize(h1Match[1]);
    
    if (titleVal !== h1Val) {
      const correctH1 = '# ' + titleVal;
      content = content.replace(/^# .+$/, correctH1);
      fs.writeFileSync(fp, content);
      fixed++;
    }
  }
}
console.log('Fixed H1 mismatches:', fixed);