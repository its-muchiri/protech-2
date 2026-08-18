// Fix the remaining 23 files with apostrophes in title - targeted fix
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const dir = 'content/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const problemFiles = [
  'adventure-tour-company-hell-s-gate-cycling-and-naivasha-boat-ride.md',
  'all-inclusive-kenya-safari-packages-definition-what-s-included.md',
  'all-inclusive-luxury-safari-kenya-what-s-included.md',
  'book-rock-climbing-hell-s-gate-safari-add-on-kenya-uk-adventure-gear-included-cost.md',
  'child-friendly-malaria-free-kenya-safari-note-difficult-combination.md',
  'doctor-s-stool-and-chair-suppliers-in-mombasa.md',
  'giraffe-safari-kenya-rothschild-s-reticulated.md',
  'grevy-s-zebra-safari-kenya.md',
  'hell-s-gate-national-park-cycling-and-gorge-walk-tour-from-naivasha-thika.md',
  'hell-s-gate-national-park-cycling-tour-company.md',
  'hell-s-gate-national-park-day-trip-cycling-hiking-tour-price.md',
  'hell-s-gate-national-park-safari.md',
  'kenya-safari-non-malarial-note-most-key-parks-are-malarial.md',
  'lake-naivasha-boat-safari-booking-hell-s-gate-tour-usa.md',
  'meru-national-park-safari-cost-europe-elsa-s-kopje-booking.md',
  'meru-national-park-safari-lodges-elsa-s-kopje-price.md',
  'pollman-s-tours-and-safaris-kenya-contact-services.md',
  'purchase-6-day-meru-elsa-s-kopje-luxury-fly-in-package-quote.md',
  'reliable-tour-operator-kenya-forum-recommendations-lonely-planet-fodor-s.md',
  'rock-climbing-hell-s-gate.md',
];

let fixed = 0;

for (const f of problemFiles) {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) {
    console.log('NOT FOUND:', f);
    continue;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    console.log('NO MATCH:', f);
    continue;
  }
  
  let fmText = match[1];
  const body = match[2];
  
  // Remove brackets
  fmText = fmText.replace(/\[[^\]]+\]/g, '');
  
  // Fix title line specifically: title: '...' with apostrophes inside
  // Match the title line and escape any ' inside the quoted string
  fmText = fmText.replace(/^(title:\s*)'([^']*(?:'[^']*)*)'$/gm, (m, prefix, val) => {
    return prefix + "'" + val.replace(/'/g, "''") + "'";
  });
  
  // Also fix description if needed
  fmText = fmText.replace(/^(description:\s*)'([^']*(?:'[^']*)*)'$/gm, (m, prefix, val) => {
    return prefix + "'" + val.replace(/'/g, "''") + "'";
  });
  
  let meta;
  try {
    meta = yaml.load(fmText) || {};
  } catch (e) {
    console.log('YAML ERROR:', f, e.message.slice(0, 80));
    continue;
  }
  
  if (meta.style_batch !== 3) {
    console.log('SKIP (not batch 3):', f);
    continue;
  }
  
  // Re-serialize
  const fmLines = ['---'];
  fmLines.push(`title: '${meta.title}'`);
  fmLines.push(`description: ${meta.description}`);
  fmLines.push(`slug: ${meta.slug}`);
  fmLines.push(`primary_keyword: ${meta.primary_keyword}`);
  fmLines.push('secondary_keywords:');
  for (const kw of meta.secondary_keywords || []) {
    fmLines.push(`- ${kw}`);
  }
  fmLines.push(`search_intent: ${meta.search_intent}`);
  fmLines.push(`article_style: ${meta.article_style}`);
  fmLines.push(`style_batch: ${meta.style_batch}`);
  fmLines.push(`word_count: ${meta.word_count}`);
  fmLines.push(`status: ${meta.status}`);
  fmLines.push('---');
  
  const newContent = fmLines.join('\n') + '\n' + body;
  fs.writeFileSync(filePath, newContent);
  fixed++;
  console.log('Fixed:', f);
}

console.log('Total fixed:', fixed);