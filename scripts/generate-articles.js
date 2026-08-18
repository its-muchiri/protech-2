// Mass Article Generator - generates articles from extracted keywords following the site template
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const blogDir = path.join(__dirname, '..', 'content', 'blog');

// Load extracted keywords
const keywords = JSON.parse(fs.readFileSync(path.join(dataDir, 'keywords-extracted.json'), 'utf8'));
console.log('Total keywords to process:', keywords.length);

// Load existing blog slugs to avoid collisions
const existingSlugs = new Set();
const existingKeywords = new Set();
for (const f of fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))) {
  existingSlugs.add(f.replace(/\.md$/, ''));
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const kwMatch = content.match(/^primary_keyword: (.*)/m);
  if (kwMatch) existingKeywords.add(kwMatch[1].trim().toLowerCase());
}
console.log('Existing blog posts:', existingSlugs.size);

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick(arr, seed, n) {
  if (n >= arr.length) return [...arr];
  const result = [];
  const used = new Set();
  let i = 0;
  while (result.length < n) {
    const idx = (seed + i * 17) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    i++;
  }
  return result;
}

function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function titleCasePhrase(keyword) {
  return keyword
    .split(' ')
    .map((w, i) => {
      const lower = w.toLowerCase();
      const skip = ['a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from'];
      if (i !== 0 && skip.includes(lower)) return lower;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

// ---------- TEMPLATE ENGINE ----------

function buildMedicalArticle(kw, secondaryKeywords) {
  const kwLower = kw.keyword.toLowerCase();
  const kwTitle = titleCasePhrase(kw.keyword);
  const prefix = kw.prefix === 'BEST' ? 'BEST ' : '';
  const title = `${prefix}${kwTitle}: 2026 Price Guide`;
  const description = `Kenya buying guide to ${kwLower}. Learn what to consider, what it costs, and how to choose a reliable local supplier.`;
  const slug = slugify(kw.keyword);

  const sections = [
    ['## Understanding the Kenya Market',
     `The Kenyan market for medical equipment and supplies is driven by steady growth in private clinics, county hospitals, and specialist facilities in cities such as Nairobi, Mombasa, Kisumu, Eldoret, Nakuru. Buyers today expect reliable quality, genuine products, competitive pricing, and — critically — local after-sales support. Whether you are equipping a new facility or replacing ageing equipment, knowing the market landscape helps you negotiate better and avoid costly mistakes.\n\nFor ${kwLower}, demand continues to rise as more facilities upgrade their capabilities and expand services. Understanding current pricing, lead times, and supply channels is the first step towards a smart purchase.`],
    ['## Choosing a Trusted Supplier',
     `The most important decision you will make is who you buy from. Look for a supplier who can provide:\n\n- Genuine, certified products backed by proper documentation\n- Competitive, transparent, written quotations\n- Stock or reliable lead times for delivery in Kenya\n- Installation, training, and after-sales service where required\n- Warranty terms that are actually honoured locally\n\nA supplier with a physical presence in Kenya and trained technicians on the ground can respond quickly when issues arise, keeping downtime to a minimum and protecting your investment over the long term.`],
    ['## What Should It Cost?',
     `Pricing for ${kwLower} in Kenya varies widely depending on brand, configuration, age (new, demo, or refurbished), and what is bundled in the deal — such as delivery, installation, training, and warranty. As a general rule, budget for the equipment price plus an additional 10–25% to cover logistics, site preparation, and commissioning.\n\nFor consumable items in this category, buying in bulk from a distributor usually works out cheaper per unit, and ordering on a regular schedule helps you avoid stockouts and emergency purchases at higher prices.\n\nAll prices quoted in this article are indicative 2026 market estimates in Kenya and are subject to change based on exchange rates, import duties, brand, specifications, and prevailing market conditions. Always request a current written quote before committing.`],
    ['## Common Buying Mistakes to Avoid',
     `Some of the most common mistakes buyers in Kenya make include:\n\n- Choosing the cheapest option without checking quality and support\n- Ignoring warranty terms and service level agreements\n- Underestimating delivery, installation, and training costs\n- Not verifying product authenticity or documentation\n- Buying without comparing written quotations\n\nAvoiding these pitfalls saves money and headaches in the long run.`],
  ];

  const faqs = [
    [`### Where can I buy ${kwLower} in Kenya?`,
     `You can buy ${kwLower} from established medical suppliers and distributors in Kenya. Work with a supplier who can show genuine documentation, offer written quotations, and provide after-sales support.`],
    ['### What affects the price?',
     `Brand, model, specifications, age of the unit, import duties, and foreign exchange rates all affect price. Bundled services such as installation and training also add to the total.`],
    ['### Do you deliver across Kenya?',
     `Yes. ProTech Consultants delivers and supports customers across Nairobi and all counties in Kenya, with installation and training where needed.`],
  ];

  const intro = `Looking for ${kwLower} in Kenya? You are not alone. Procurement teams, clinic managers, and hospital administrators across the country search for terms like this every day when they are ready to buy, upgrade, or restock. This guide walks you through what to consider, what things cost, and how to work with a dependable local supplier so you can make a confident decision.`;

  return { title, description, slug, primary_keyword: kw.keyword, secondaryKeywords, search_intent: 'transactional', article_style: 'Commercial Buying Guide', sections, faqs, intro };
}

function buildSafariArticle(kw, secondaryKeywords) {
  const kwLower = kw.keyword.toLowerCase();
  const kwTitle = titleCasePhrase(kw.keyword);
  const title = `${kwTitle}: Complete Guide`;
  const description = `Kenya safari guide covering ${kwLower}, including what is included, pricing, and booking advice.`;
  const slug = slugify(kw.keyword);

  const sections = [
    ['## What a Safari Package Typically Includes',
     `Most Kenya safari packages bundle the essentials so you can focus on the experience: accommodation in lodges or camps, game drives in shared or private vehicles, park entry fees, meals, and an experienced guide. Some packages add internal flights, airport transfers, and activities such as hot-air balloon rides over the Masai Mara.\n\nUnderstanding exactly what is included — and what is not — is essential before you book. A clear package breakdown prevents surprises and lets you compare offers fairly. When considering ${kwLower}, confirm the accommodation standard, group size, and vehicle type before you commit.`],
    ["## Kenya's Iconic Destinations",
     `Kenya's safari circuit is world-famous. The Masai Mara is home to the Great Migration, Amboseli offers unrivalled views of Mount Kilimanjaro with its elephant herds, and Tsavo East and West reward visitors with vast wilderness and dramatic landscapes. Samburu, Lake Nakuru, Amboseli, Meru, and the Aberdares each bring something different — from rhinos and flamingos to rare northern species. Many travellers combine two or more parks for a richer experience.`],
    ['## When to Go and What It Costs',
     `Kenya safaris run year-round, but the experience changes with the seasons. The Great Migration is typically at its most dramatic in the Masai Mara between July and October, while the green season from November to May offers lush scenery, great birding, and lighter crowds — often at lower prices.\n\nSafari costs in Kenya depend on season, park, accommodation standard, group size, and how many days you travel. Longer and more exclusive packages cost more, but there are excellent options at every budget.\n\nAll prices quoted in this article are indicative 2026 market estimates in Kenya and are subject to change based on exchange rates, import duties, brand, specifications, and prevailing market conditions. Always request a current written quote before committing.`],
    ['## How to Choose an Operator and Book',
     `Your operator makes or breaks the trip. Look for a Kenya-based operator with transparent pricing, well-maintained vehicles, qualified guides, and real reviews from recent travellers. Ask directly about vehicle capacity, group size, accommodation standards, and what happens if your itinerary needs to change.\n\nWhen you are ready to book, confirm availability for your dates, understand the deposit and cancellation terms, and get a written confirmation outlining the full package before you pay.`],
  ];

  const faqs = [
    ['### Is a package better than booking everything myself?',
     `For most travellers, yes. Packages bundle accommodation, park fees, transport, and guides at rates you cannot easily match by booking separately, and they remove the stress of coordinating logistics while on safari.`],
    ['### What is the best season for a Kenya safari?',
     `July to October is ideal for the Great Migration in the Masai Mara. For fewer crowds and greener landscapes, the green season between November and May is excellent and often more affordable.`],
    ['### How do I secure my booking?',
     `Reputable operators confirm availability and take a deposit to secure your dates. Always get a written confirmation outlining the full package before paying.`],
  ];

  const intro = `Dreaming of a Kenya safari? ${capitalizeFirst(kwLower)} is exactly the kind of search travellers make when they are ready to plan the trip of a lifetime. This guide helps you understand what a safari package includes, how pricing works, and how to book with confidence.`;

  return { title, description, slug, primary_keyword: kw.keyword, secondaryKeywords, search_intent: 'transactional', article_style: 'Travel Booking Guide', sections, faqs, intro };
}

function buildFlightArticle(kw, secondaryKeywords) {
  const kwLower = kw.keyword.toLowerCase();
  const kwTitle = titleCasePhrase(kw.keyword);
  const title = `${kwTitle}: Complete Guide`;
  const description = `Everything you need to know about ${kwLower}, including routes, airlines, booking tips, and fares.`;
  const slug = slugify(kw.keyword);

  const sections = [
    ['## Understanding Your Options',
     `Kenya is served by a network of domestic and international carriers operating out of Jomo Kenyatta International Airport (JKIA) in Nairobi, Moi International Airport in Mombasa, Kisumu International Airport, Eldoret International Airport, and Wilson Airport, which handles scheduled regional and charter services. Whether you are flying within Kenya or connecting internationally, comparing your options before booking helps you find the best balance of price, schedule, and comfort.\n\nWhen it comes to ${kwLower}, the airline, timing, and class you choose all influence the total cost.`],
    ['## How to Book Smart',
     `When searching for ${kwLower}, a few habits make a big difference:\n\n- Compare fares across multiple airlines and booking platforms\n- Book early for the best domestic and international fares\n- Check baggage allowances and add-ons before paying\n- Confirm the identification and travel documents you need\n- Watch for seasonal demand peaks that push fares up\n\nFlexibility with dates and times almost always unlocks cheaper options, especially on popular Kenyan routes.`],
    ['## What You Can Expect to Pay',
     `Fares vary by route, airline, and season. Short hops between Nairobi and nearby towns are generally the most affordable, while longer routes and international connections cost more. Fares also rise sharply during holiday periods and school breaks.\n\nAll prices quoted in this article are indicative 2026 market estimates in Kenya and are subject to change based on exchange rates, import duties, brand, specifications, and prevailing market conditions. Always request a current written quote before committing.`],
    ['## Tips for a Smooth Journey',
     `- Arrive at the airport at least 2 hours before domestic departures\n- Check in online where available to save time at the counter\n- Keep essential documents within easy reach\n- Confirm terminal and gate information for your airline\n- Review the airline's baggage rules before packing\n\nA little preparation goes a long way toward a stress-free trip.`],
  ];

  const faqs = [
    ['### How far in advance should I book?',
     `For domestic flights within Kenya, booking 2–6 weeks ahead generally secures the best fares. For international flights, 2–4 months is a good rule of thumb.`],
    ['### Which airlines fly this route?',
     `Kenya Airways, Jambojet, Safarilink, Fly540, Skyward Express, and regional international carriers serve most Kenyan routes, with connecting options available internationally. Compare carriers to find the best schedule and fare for your plans.`],
    ['### Do flight prices change a lot?',
     `Yes. Airfares are dynamic and respond to demand, season, and how close the departure is. Comparing options and booking at the right time saves real money.`],
  ];

  const intro = `Planning travel and looking for information on ${kwLower}? You have come to the right place. This guide covers the routes, airlines, booking tips, and fares you need to know so you can travel with confidence and get the best value for your money.`;

  return { title, description, slug, primary_keyword: kw.keyword, secondaryKeywords, search_intent: 'informational', article_style: 'Flight Booking Guide', sections, faqs, intro };
}

const builders = {
  medical: buildMedicalArticle,
  safari: buildSafariArticle,
  flights: buildFlightArticle,
};

// ---------- GENERATION LOOP ----------

// Build pool of secondary keywords by category
const byCategory = {};
for (const kw of keywords) {
  if (!byCategory[kw.category]) byCategory[kw.category] = [];
  byCategory[kw.category].push(kw.keyword);
}

let generated = 0;
let skippedExisting = 0;
let collisions = 0;
const usedSlugs = new Set(existingSlugs);

const CTA = `## Get a Free Quote\n\nEvery project is different, so get a free, no-obligation quote from ProTech Consultants today. Our team will assess your needs, confirm current market pricing, and guide you through the best option for your situation in Kenya. Reach out through our quote form or call us to get started.`;

for (const kw of keywords) {
  const builder = builders[kw.category];
  if (!builder) continue;

  const seed = hashStr(kw.keyword);
  const categoryPool = byCategory[kw.category].filter(k => k.toLowerCase() !== kw.keyword.toLowerCase());
  const secondaryKeywords = pick(categoryPool, seed, 5);

  const article = builder(kw, secondaryKeywords);

  // Skip if keyword already covered in existing posts
  if (existingKeywords.has(kw.keyword.toLowerCase())) {
    skippedExisting++;
    continue;
  }

  // Check slug collision
  if (usedSlugs.has(article.slug)) {
    collisions++;
    continue;
  }
  usedSlugs.add(article.slug);

  const lines = [];
  lines.push(`# ${article.title}`);
  lines.push('');
  lines.push('## Introduction');
  lines.push('');
  lines.push(article.intro);
  lines.push('');
  for (const [h, content] of article.sections) {
    lines.push(h);
    lines.push('');
    lines.push(content);
    lines.push('');
  }
  lines.push('## Frequently Asked Questions');
  lines.push('');
  for (const [q, a] of article.faqs) {
    lines.push(q);
    lines.push('');
    lines.push(a);
    lines.push('');
  }
  lines.push(CTA);

  const frontmatter = [
    '---',
    `title: '${article.title}'`,
    `description: ${article.description.replace(/'/g, '')}`,
    `slug: ${article.slug}`,
    `primary_keyword: ${article.primary_keyword}`,
    'secondary_keywords:',
    ...secondaryKeywords.map(k => `- ${k}`),
    `search_intent: ${article.search_intent}`,
    `article_style: ${article.article_style}`,
    'style_batch: 3',
    'word_count: 550',
    'status: draft',
    '---',
    '',
  ];

  const full = frontmatter.join('\n') + lines.join('\n');
  fs.writeFileSync(path.join(blogDir, `${article.slug}.md`), full);
  generated++;
}

console.log('\n=== Generation Summary ===');
console.log('Total keywords:', keywords.length);
console.log('Generated:', generated);
console.log('Skipped (already exist):', skippedExisting);
console.log('Slug collisions (skipped):', collisions);