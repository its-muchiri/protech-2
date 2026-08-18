// Add "BEST " prefix to titles of all articles whose primary keyword comes from the kismet file
const fs = require('fs');
const path = require('path');

const kw = JSON.parse(fs.readFileSync('data/keywords-extracted.json', 'utf8'));
const kismet = kw.filter(k => k.prefix === 'BEST');
console.log('Kismet keywords:', kismet.length);

const dir = 'content/blog';
let updated = 0;
let already = 0;

for (const k of kismet) {
  const slug = k.keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  const f = path.join(dir, slug + '.md');
  if (!fs.existsSync(f)) continue;

  let content = fs.readFileSync(f, 'utf8');

  // Find the title in frontmatter
  const titleMatch = content.match(/^title: '(.+)'$/m);
  if (!titleMatch) continue;

  const oldTitle = titleMatch[1];
  if (oldTitle.startsWith('BEST ')) {
    already++;
    continue;
  }

  const newTitle = 'BEST ' + oldTitle;
  content = content.replace(/^title: '(.*)'$/m, `title: '${newTitle}'`);

  // Also update H1
  content = content.replace(/# (.*)/, `# ${newTitle}`);

  fs.writeFileSync(f, content);
  updated++;
}

console.log('Updated with BEST prefix:', updated);
console.log('Already had BEST:', already);