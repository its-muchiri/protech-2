// Extract, clean, and deduplicate all search terms from the 4 Excel files
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'blog articles');
const outDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.xlsx') && !f.startsWith('~$'));

const results = [];
const seen = new Set();

// Classification of each file
const fileMeta = {
  'events planning& safaris.xlsx': { category: 'safari', article_style: 'Travel Booking Guide' },
  'Main Flights.co.ke.xlsx': { category: 'flights', article_style: 'Flight Booking Guide' },
  'MAIN medicaequipment.co.ke.xlsx': { category: 'medical', article_style: 'Commercial Buying Guide' },
  'medical equipment n supplies kismet.xlsx': { category: 'medical', article_style: 'Commercial Buying Guide', prefix: 'BEST' },
};

function cleanKeyword(raw) {
  if (!raw) return null;
  let s = String(raw).trim();
  if (!s) return null;

  // Skip explanatory paragraphs (long sentences with many words, not keyword-like)
  // Keywords are short phrases, skip anything that looks like a full sentence/paragraph
  if (s.length > 120) return null;

  // Skip obvious header/instruction lines
  const skipPatterns = [
    /^okay,?/i,
    /^here( is|'s| are)/i,
    /^i\.? /i,  // roman numeral headings like "I. Direct Booking"
    /^(ii|iii|iv|v|vi|vii|viii|ix|x)\./i,
    /^(general|direct|how to|what to|where to|when to|why|top|best|list of|types of|common|key|important|choosing|finding|understanding|planning)/i,
    /^[A-Z][a-z]+( [A-Z][a-z]+)+:$/i, // Section headers like "General Booking:" "Direct Booking:"
    /^([IVX]+)\./i,
    /^include the word/i, // Instruction line in kismet file
    /^included? in (this|the) sheet/i,
    /^note:/i,
  ];
  for (const p of skipPatterns) {
    if (p.test(s)) return null;
  }

  // Strip leading numbering like "1.", "2)", "1) " etc
  s = s.replace(/^\d+[.)]\s*/, '');
  // Strip leading dashes/bullets
  s = s.replace(/^[-*•]\s*/, '');
  // Strip trailing punctuation
  s = s.replace(/[.,;:!?]+$/, '');
  s = s.trim();

  if (!s || s.length < 5) return null;

  return s;
}

function isHeaderLine(s) {
  // Pure category headers like "Diagnostic Imaging Equipment", "I. Direct Booking & Quote Requests"
  if (/^\d+[.)]/.test(s)) return false; // numbered items are keywords
  const words = s.split(/\s+/);
  if (words.length > 12) return false; // long sentences are not headers we keep
  if (s.endsWith(':')) return true;
  if (/^[IVX]+\./.test(s)) return true;
  if (/^[A-Z][a-z]+( [A-Z][a-z]+)+$/.test(s) && words.length >= 2 && words.length <= 6) {
    // All-caps-starting words like "Direct Booking" - could be a header OR a real keyword like "Kenya Safari"
    // But real keywords usually have lowercase words after first, e.g. "Book Kenya safari"
    const allCapsStart = s.split(/\s+/).every(w => /^[A-Z]/.test(w));
    return allCapsStart && words.length >= 2;
  }
  return false;
}

for (const file of files) {
  const filePath = path.join(sourceDir, file);
  const meta = fileMeta[file] || { category: 'other', article_style: 'Generic Guide' };
  const wb = XLSX.readFile(filePath);

  for (const sheetName of wb.SheetNames) {
    const ws = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
    let currentHeader = '';
    let currentSubheader = '';

    for (const row of rows) {
      for (let cell of row) {
        cell = String(cell).trim();
        if (!cell) continue;
        const cleaned = cleanKeyword(cell);
        if (!cleaned) continue;

        // Detect category headers
        if (isHeaderLine(cell)) {
          currentSubheader = cell.replace(/[.:]+$/, '').trim();
          continue;
        }

        // Detect parent sheet header (first few rows that are paragraph text)
        if (cleaned.length > 5 && cleaned.split(' ').length > 15) {
          continue; // skip long paragraph text
        }

        if (seen.has(cleaned)) continue;
        seen.add(cleaned);

        results.push({
          keyword: cleaned,
          category: meta.category,
          article_style: meta.article_style,
          file: file,
          sheet: sheetName,
          header: currentSubheader,
          prefix: meta.prefix || '',
        });
      }
    }
  }
}

console.log('Total unique keywords:', results.length);
const byCat = {};
for (const r of results) {
  byCat[r.category] = (byCat[r.category] || 0) + 1;
}
console.log('By category:', byCat);

// Write raw results
fs.writeFileSync(path.join(outDir, 'keywords-extracted.json'), JSON.stringify(results, null, 2));

// Write category-grouped file
const grouped = { medical: [], safari: [], flights: [] };
for (const r of results) grouped[r.category].push(r);
fs.writeFileSync(path.join(outDir, 'keywords-by-category.json'), JSON.stringify(grouped, null, 2));

console.log('Sample of each category:');
for (const cat of ['medical', 'safari', 'flights']) {
  console.log('\n---', cat, '---');
  console.log(grouped[cat].slice(0, 8).map(r => r.keyword).join('\n'));
}
