"""Bulk article generator for ProTech.co.ke blog.

Reads the deduped keyword manifest and produces one keyword-tailored
markdown article per keyword in content/blog/, then registers every
article in content/content-index.json and content/article-counter.json.

Usage:
    python scripts/generate_articles.py
"""

import json
import os
import re
import unicodedata

import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFEST = r"C:\Users\KIMISH\AppData\Local\Temp\opencode\keyword-manifest.json"
BLOG_DIR = os.path.join(ROOT, "content", "blog")
INDEX_PATH = os.path.join(ROOT, "content", "content-index.json")
COUNTER_PATH = os.path.join(ROOT, "content", "article-counter.json")

QUOTE_CTA = (
    "Every project is different, so get a free, no-obligation quote from "
    "ProTech Consultants today. Our team will assess your needs, confirm "
    "current market pricing, and guide you through the best option for your "
    "situation in Kenya. Reach out through our quote form or call us to get started."
)

PRICE_CAVEAT = (
    "All prices quoted in this article are indicative 2026 market estimates in "
    "Kenya and are subject to change based on exchange rates, import duties, "
    "brand, specifications, and prevailing market conditions. Always request a "
    "current written quote before committing."
)

KENYA_LOCATIONS = [
    "Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru", "Thika", "Nyeri",
    "Machakos", "Naivasha", "Kericho", "Meru", "Garissa", "Kakamega", "Malindi",
]

ACRONYMS = {"ct", "mri", "mra", "dexa", "opg", "ge", "dr", "cr", "ppb", "nema", "kemsa", "ro", "uv"}


def slugify(text, max_len=70):
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    text = re.sub(r"-{2,}", "-", text)
    return text[:max_len].rstrip("-")


def title_case_keyword(kw):
    stopwords = {
        "in", "of", "the", "for", "and", "to", "a", "an", "or", "on",
        "vs", "at", "from", "with", "by", "is", "are", "its", "your",
    }
    words = kw.split()
    out = []
    for i, w in enumerate(words):
        low = w.lower()
        if low in ACRONYMS:
            out.append(low.upper())
        elif low == "kenya":
            out.append("Kenya")
        elif re.match(r"^[a-z]{1,4}-?\d{1,4}$", low) and re.search(r"[a-z]", low) and re.search(r"\d", low):
            parts = re.split(r"(-)", w)
            out.append("".join(p.upper() if p and p != "-" else p for p in parts))
        elif low.startswith("1.") or low.startswith("2.") or low.startswith("3.") or low.startswith("4.") or low.startswith("5."):
            out.append(w)
        elif i == 0 or i == len(words) - 1 or low not in stopwords:
            out.append(w.capitalize())
        else:
            out.append(low)
    return " ".join(out)


def has_kenya(kw):
    return bool(re.search(r"\bkenya\b|\bnairobi\b|\bmombasa\b|\bkisumu\b|\beldoret\b|\bnakuru\b|\bthika\b|\bnanyuki\b", kw, re.I))


STOP_WORDS = {
    "kenya", "nairobi", "mombasa", "kisumu", "eldoret", "nakuru", "thika",
    "for", "in", "the", "and", "price", "prices", "cost", "costs", "sale",
    "buy", "book", "package", "guide", "deal", "deals", "a", "an", "of", "to",
    "with", "from", "your", "you", "on", "at", "near", "best", "top", "affordable",
}


def find_secondary_keywords(kw, all_keywords):
    words = set(w for w in re.findall(r"[a-z0-9]+", kw.lower()) if len(w) > 2 and w not in STOP_WORDS)
    scored = []
    for other in all_keywords:
        o = other.lower()
        if o == kw.lower():
            continue
        owords = set(w for w in re.findall(r"[a-z0-9]+", o) if len(w) > 2 and w not in STOP_WORDS)
        shared = words & owords
        if len(shared) >= 1:
            scored.append((len(shared), len(owords), other))
    scored.sort(key=lambda t: (-t[0], t[1]))
    return [s[2] for s in scored[:5]]


CONSUMABLE_HINTS = [
    "mask", "glove", "syringe", "swab", "gauze", "bandage", "sanitizer", "cotton",
    "needle", "catheter", "tube", "bag", "pad", "tape", "lancet", "strip", "suture",
    "disinfect", "spirit", "drape", "gown", "shield", "goggle", "disposable",
    "dressing", "pack", "kit", "wool", "plaster", "blade", "cap", "bottle",
    "solution", "carrier", "cold chain", "logger", "glucometer", "thermometer",
]


def detect_medical_kind(kw):
    kw_l = kw.lower()
    if any(h in kw_l for h in CONSUMABLE_HINTS):
        return "supplies", "Medical Supplies", "medical supplies"
    eq_map = [
        ("ct scanner", "CT Scanner", "CT imaging equipment"),
        ("mri", "MRI Machine", "MRI imaging equipment"),
        ("ultrasound", "Ultrasound Machine", "ultrasound imaging equipment"),
        ("echo", "Echocardiography Machine", "echocardiography equipment"),
        ("x-ray", "X-Ray Machine", "X-ray imaging equipment"),
        ("x ray", "X-Ray Machine", "X-ray imaging equipment"),
        ("mammograph", "Mammography System", "mammography equipment"),
        ("densitometer", "Bone Densitometer (DEXA)", "bone density testing equipment"),
        ("dexa", "Bone Densitometer (DEXA)", "bone density testing equipment"),
        ("c-arm", "C-Arm Machine", "fluoroscopy equipment"),
        ("c arm", "C-Arm Machine", "fluoroscopy equipment"),
        ("opg", "OPG Dental X-Ray", "dental imaging equipment"),
        ("panoramic", "OPG Dental X-Ray", "dental imaging equipment"),
        ("endoscopy", "Endoscopy System", "endoscopy equipment"),
        ("endoscope", "Endoscopy System", "endoscopy equipment"),
        ("hematolog", "Hematology Analyzer", "laboratory analyzers"),
        ("analyzer", "Laboratory Analyzer", "laboratory analyzers"),
        ("coagulation", "Coagulation Analyzer", "laboratory analyzers"),
        ("monitor", "Patient Monitor", "patient monitoring equipment"),
        ("ventilator", "Ventilator", "respiratory care equipment"),
        ("defibrillator", "Defibrillator", "emergency care equipment"),
        ("surgical", "Surgical Equipment", "surgical equipment"),
        ("anesthesia", "Anesthesia Machine", "surgical theatre equipment"),
        ("electrosurgic", "Electrosurgical Unit", "surgical theatre equipment"),
        ("hospital bed", "Hospital Bed", "hospital furniture"),
        ("furniture", "Hospital Furniture", "hospital furniture"),
        ("incubator", "Incubator", "neonatal care equipment"),
        ("autoclave", "Autoclave", "sterilization equipment"),
        ("steriliz", "Sterilizer", "sterilization equipment"),
    ]
    for key, label, field in eq_map:
        if key in kw_l:
            return "equipment", label, field
    return "supplies", "Medical Supplies", "medical supplies"


def medical_sections(kw, kind, label, field):
    intro = (
        f"Looking for {kw} in Kenya? You are not alone. Procurement teams, clinic "
        f"managers, and hospital administrators across the country search for terms "
        f"like this every day when they are ready to buy, upgrade, or restock. This "
        f"guide walks you through what to consider, what things cost, and how to work "
        f"with a dependable local supplier so you can make a confident decision."
    )
    market = (
        f"## Understanding the Kenya Market\n\n"
        f"The Kenyan market for {field} is driven by steady growth in private clinics, "
        f"county hospitals, and specialist facilities in cities such as "
        f"{', '.join(KENYA_LOCATIONS[:5])}. Buyers today expect reliable quality, "
        f"genuine products, competitive pricing, and — critically — local after-sales "
        f"support. Whether you are equipping a new facility or replacing ageing "
        f"equipment, knowing the market landscape helps you negotiate better and avoid "
        f"costly mistakes."
    )
    sourcing = (
        f"## Choosing a Trusted Supplier\n\n"
        f"The most important decision you will make is who you buy from. Look for a "
        f"supplier who can provide:\n\n"
        f"- Genuine, certified products backed by proper documentation\n"
        f"- Competitive, transparent, written quotations\n"
        f"- Stock or reliable lead times for delivery in Kenya\n"
        f"- Installation, training, and after-sales service where required\n"
        f"- Warranty terms that are actually honoured locally\n\n"
        f"A supplier with a physical presence in Kenya and trained technicians on the "
        f"ground can respond quickly when issues arise, keeping downtime to a minimum "
        f"and protecting your investment over the long term."
    )
    pricing = (
        f"## What Should It Cost?\n\n"
        f"Pricing for {field} in Kenya varies widely depending on brand, configuration, "
        f"age (new, demo, or refurbished), and what is bundled in the deal — such as "
        f"delivery, installation, training, and warranty. As a general rule, budget for "
        f"the equipment price plus an additional 10–25% to cover logistics, site "
        f"preparation, and commissioning.\n\n"
        f"For consumable {field}, buying in bulk from a distributor usually works out "
        f"cheaper per unit, and ordering on a regular schedule helps you avoid stockouts "
        f"and emergency purchases at higher prices.\n\n"
        f"{PRICE_CAVEAT}"
    )
    mistakes = (
        f"## Common Buying Mistakes to Avoid\n\n"
        f"Some of the most common mistakes buyers in Kenya make include:\n\n"
        f"- Choosing the cheapest option without checking quality and support\n"
        f"- Ignoring warranty terms and service level agreements\n"
        f"- Underestimating delivery, installation, and training costs\n"
        f"- Not verifying product authenticity or documentation\n"
        f"- Buying without comparing written quotations\n\n"
        f"Avoiding these pitfalls saves money and headaches in the long run."
    )
    faqs = (
        f"## Frequently Asked Questions\n\n"
        f"### Where can I buy {kw} in Kenya?\n\n"
        f"You can buy from established medical suppliers and distributors in Kenya. "
        f"Work with a supplier who can show genuine documentation, offer written "
        f"quotations, and provide after-sales support.\n\n"
        f"### What affects the price?\n\n"
        f"Brand, model, specifications, age of the unit, import duties, and foreign "
        f"exchange rates all affect price. Bundled services such as installation and "
        f"training also add to the total.\n\n"
        f"### Do you deliver across Kenya?\n\n"
        f"Yes. ProTech Consultants delivers and supports customers across Nairobi and "
        f"all counties in Kenya, with installation and training where needed."
    )
    return intro, [market, sourcing, pricing, mistakes], faqs


def flights_sections(kw):
    intro = (
        f"Planning travel to, from, or within Kenya and looking for information on "
        f"{kw}? You have come to the right place. This guide covers the routes, "
        f"airlines, booking tips, and fares you need to know so you can travel with "
        f"confidence and get the best value for your money."
    )
    market = (
        f"## Understanding Your Options\n\n"
        f"Kenya is served by a network of domestic and international carriers operating "
        f"out of Jomo Kenyatta International Airport (JKIA) in Nairobi, Moi "
        f"International Airport in Mombasa, Kisumu International Airport, Eldoret "
        f"International Airport, and Wilson Airport, which handles scheduled regional "
        f"and charter services. Whether you are flying between Nairobi and Mombasa or "
        f"connecting internationally, comparing your options before booking helps you "
        f"find the best balance of price, schedule, and comfort."
    )
    booking = (
        f"## How to Book Smart\n\n"
        f"When searching for {kw}, a few habits make a big difference:\n\n"
        f"- Compare fares across multiple airlines and booking platforms\n"
        f"- Book early for the best domestic and international fares\n"
        f"- Check baggage allowances and add-ons before paying\n"
        f"- Confirm the identification and travel documents you need\n"
        f"- Watch for seasonal demand peaks that push fares up\n\n"
        f"Flexibility with dates and times almost always unlocks cheaper options, "
        f"especially on popular Kenyan routes."
    )
    fares = (
        f"## What You Can Expect to Pay\n\n"
        f"Domestic fares in Kenya vary by route and season. Short hops between Nairobi "
        f"and nearby towns are generally the most affordable, while longer routes and "
        f"international connections cost more. Fares also rise sharply during holiday "
        f"periods and school breaks.\n\n"
        f"{PRICE_CAVEAT}"
    )
    tips = (
        f"## Tips for a Smooth Journey\n\n"
        f"- Arrive at the airport at least 2 hours before domestic departures\n"
        f"- Check in online where available to save time at the counter\n"
        f"- Keep essential documents within easy reach\n"
        f"- Confirm terminal and gate information for your airline\n"
        f"- Review the airline's baggage rules before packing\n\n"
        f"A little preparation goes a long way toward a stress-free trip."
    )
    faqs = (
        f"## Frequently Asked Questions\n\n"
        f"### How far in advance should I book?\n\n"
        f"For domestic flights within Kenya, booking 2–6 weeks ahead generally secures "
        f"the best fares. For international flights, 2–4 months is a good rule of "
        f"thumb.\n\n"
        f"### What is the difference between Wilson Airport and JKIA?\n\n"
        f"Wilson Airport mainly handles regional and domestic scheduled and charter "
        f"flights to destinations such as the Masai Mara and Lamu, while JKIA is "
        f"Kenya's main hub for domestic and international scheduled services.\n\n"
        f"### Do flight prices change a lot?\n\n"
        f"Yes. Airfares are dynamic and respond to demand, season, and how close the "
        f"departure is. Comparing options and booking at the right time saves real "
        f"money."
    )
    return intro, [market, booking, fares, tips], faqs


def safari_sections(kw):
    intro = (
        f"Dreaming of a Kenya safari? {title_case_keyword(kw)} is exactly the kind of "
        f"search travellers make when they are ready to plan the trip of a lifetime. "
        f"This guide helps you understand what a safari package includes, how pricing "
        f"works, and how to book with confidence."
    )
    planning = (
        f"## What a Safari Package Typically Includes\n\n"
        f"Most Kenya safari packages bundle the essentials so you can focus on the "
        f"experience: accommodation in lodges or camps, game drives in shared or "
        f"private vehicles, park entry fees, meals, and an experienced guide. Some "
        f"packages add internal flights, airport transfers, and activities such as "
        f"hot-air balloon rides over the Masai Mara.\n\n"
        f"Understanding exactly what is included — and what is not — is essential "
        f"before you book. A clear package breakdown prevents surprises and lets you "
        f"compare offers fairly."
    )
    parks = (
        f"## Kenya's Iconic Destinations\n\n"
        f"Kenya's safari circuit is world-famous. The Masai Mara is home to the Great "
        f"Migration, Amboseli offers unrivalled views of Mount Kilimanjaro with its "
        f"elephant herds, and Tsavo East and West reward visitors with vast wilderness "
        f"and dramatic landscapes. Samburu, Lake Nakuru, Amboseli, Meru, and the "
        f"Aberdares each bring something different — from rhinos and flamingos to "
        f"rare northern species. Many travellers combine two or more parks for a "
        f"richer experience."
    )
    timing = (
        f"## When to Go and What It Costs\n\n"
        f"Kenya safaris run year-round, but the experience changes with the seasons. "
        f"The Great Migration is typically at its most dramatic in the Masai Mara "
        f"between July and October, while the green season from November to May offers "
        f"lush scenery, great birding, and lighter crowds — often at lower prices.\n\n"
        f"Safari costs in Kenya depend on season, park, accommodation standard, group "
        f"size, and how many days you travel. Longer and more exclusive packages cost "
        f"more, but there are excellent options at every budget.\n\n"
        f"{PRICE_CAVEAT}"
    )
    booking = (
        f"## How to Choose an Operator and Book\n\n"
        f"Your operator makes or breaks the trip. Look for a Kenya-based operator with "
        f"transparent pricing, well-maintained vehicles, qualified guides, and real "
        f"reviews from recent travellers. Ask directly about vehicle capacity, group "
        f"size, accommodation standards, and what happens if your itinerary needs to "
        f"change.\n\n"
        f"When you are ready to book, confirm availability for your dates, understand "
        f"the deposit and cancellation terms, and get a written confirmation outlining "
        f"the full package before you pay."
    )
    faqs = (
        f"## Frequently Asked Questions\n\n"
        f"### Is a package better than booking everything myself?\n\n"
        f"For most travellers, yes. Packages bundle accommodation, park fees, "
        f"transport, and guides at rates you cannot easily match by booking "
        f"separately, and they remove the stress of coordinating logistics while on "
        f"safari.\n\n"
        f"### What is the best season for a Kenya safari?\n\n"
        f"July to October is ideal for the Great Migration in the Masai Mara. For "
        f"fewer crowds and greener landscapes, the green season between November and "
        f"May is excellent and often more affordable.\n\n"
        f"### How do I secure my booking?\n\n"
        f"Reputable operators confirm availability and take a deposit to secure your "
        f"dates. Always get a written confirmation outlining the full package before "
        f"paying."
    )
    return intro, [planning, parks, timing, booking], faqs


def build_article(kw, source, all_keywords):
    source_l = source.lower()
    if "medical" in source_l or "medicaequipment" in source_l or "kismet" in source_l:
        niche = "medical"
    elif "safari" in source_l:
        niche = "safari"
    else:
        niche = "flights"

    kw_l = kw.lower()
    has_k = has_kenya(kw)
    title = title_case_keyword(kw)

    if niche == "medical":
        kind, label, field = detect_medical_kind(kw)
        has_price = "price" in kw_l or "cost" in kw_l
        suffix = ": 2026 Price Guide" if has_price else ": Buying Guide"
        if has_k:
            title = f"{title}{suffix}"
        else:
            title = f"{title} in Kenya: Buying Guide & Prices 2026"
        intro, sections, faqs = medical_sections(kw, kind, label, field)
        description = (
            f"Kenya buying guide to {kw}. Learn what to consider, what it costs, "
            f"and how to choose a reliable local supplier."
        )
        search_intent = "transactional" if any(
            w in kw_l for w in ["buy", "price", "cost", "for sale", "rental", "quote", "supplier", "dealer", "wholesale"]
        ) else "informational"
        style = "Commercial Buying Guide"
    elif niche == "flights":
        title = f"{title}: Complete Guide"
        intro, sections, faqs = flights_sections(kw)
        description = (
            f"Everything you need to know about {kw}, including routes, airlines, "
            f"booking tips, and fares."
        )
        search_intent = "informational"
        style = "Travel Guide"
    else:
        title = f"{title}: Complete Guide"
        intro, sections, faqs = safari_sections(kw)
        description = (
            f"Kenya safari guide covering {kw}, including what is included, pricing, "
            f"and booking advice."
        )
        search_intent = "transactional" if any(
            w in kw_l for w in ["book", "buy", "quote", "price", "cost", "deal", "package"]
        ) else "informational"
        style = "Travel Booking Guide"

    secondary = find_secondary_keywords(kw, all_keywords)

    body_blocks = [f"# {title}", "", "## Introduction", "", intro, ""]
    for sec in sections:
        body_blocks.append(sec)
        body_blocks.append("")
    body_blocks.append(faqs)
    body_blocks.append("")
    body_blocks.append("## Get a Free Quote")
    body_blocks.append("")
    body_blocks.append(QUOTE_CTA)
    body = "\n".join(body_blocks)

    word_count = len(re.findall(r"\b[\w'-]+\b", body))

    frontmatter_meta = {
        "title": title,
        "description": description,
        "slug": slugify(kw),
        "primary_keyword": kw,
        "secondary_keywords": secondary,
        "search_intent": search_intent,
        "article_style": style,
        "style_batch": 2,
        "word_count": word_count,
        "status": "draft",
    }
    frontmatter = "---\n" + yaml.safe_dump(frontmatter_meta, sort_keys=False, allow_unicode=True) + "---\n"
    return frontmatter + body, slugify(kw), word_count, niche, title, description, search_intent, secondary


def main():
    if not os.path.exists(MANIFEST):
        print("Manifest not found at:", MANIFEST)
        return
    with open(MANIFEST, encoding="utf-8") as f:
        manifest = json.load(f)

    os.makedirs(BLOG_DIR, exist_ok=True)
    all_keywords = [m["keyword"] for m in manifest]

    with open(INDEX_PATH, encoding="utf-8") as f:
        index = json.load(f)
    with open(COUNTER_PATH, encoding="utf-8") as f:
        counter = json.load(f)

    existing_slugs = {a["url_slug"] for a in index.get("articles", [])}
    existing_files = {os.path.splitext(x)[0] for x in os.listdir(BLOG_DIR) if x.endswith(".md")}

    new_articles = []
    generated = 0
    skipped = 0
    seen_slug = set()
    for m in manifest:
        kw = m["keyword"]
        slug = slugify(kw)
        if slug in existing_slugs or slug in existing_files or slug in seen_slug:
            skipped += 1
            continue
        content, slug, wc, niche, title, desc, intent, secondary = build_article(
            kw, m["source"], all_keywords
        )
        path = os.path.join(BLOG_DIR, f"{slug}.md")
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        existing_files.add(slug)
        seen_slug.add(slug)
        new_articles.append(
            {
                "title": title,
                "primary_keyword": kw,
                "secondary_keywords": secondary,
                "search_intent": intent,
                "article_style": style_for_niche(niche),
                "style_batch": 2,
                "word_count": wc,
                "status": "draft",
                "url_slug": slug,
                "related_topics": [],
                "potential_internal_links": [],
            }
        )
        generated += 1

    index["articles"].extend(new_articles)
    counter["articles_generated"] = counter.get("articles_generated", 0) + generated

    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(COUNTER_PATH, "w", encoding="utf-8") as f:
        json.dump(counter, f, ensure_ascii=False, indent=2)

    print(f"Generated: {generated}  Skipped (exists): {skipped}  Total articles now: {len(index['articles'])}")


def style_for_niche(niche):
    return {
        "medical": "Commercial Buying Guide",
        "flights": "Travel Guide",
        "safari": "Travel Booking Guide",
    }.get(niche, "Informational")


if __name__ == "__main__":
    main()
