# Kenya Consultancy - Multi-Service Lead Generation Website

A high-performance, mobile-optimized, SEO-optimized multi-service consultancy website for the Kenyan market. Built with Next.js 14, Tailwind CSS, and designed for lead generation across 17+ service verticals.

## Features

- **17 Service Vertical Pages** - Dedicated landing pages for each service line with local SEO
- **Mobile-First Design** - Sticky bottom navigation with WhatsApp and Call CTAs
- **Dual Lead Distribution** - Email (SMTP/SendGrid) + WhatsApp Business integration
- **SEO Optimized** - Schema markup (LocalBusiness, FAQPage, ProfessionalService), clean URLs, meta tags
- **CRO Optimized** - Quick quote estimator, trust badges, testimonials, sticky CTAs
- **Fast Performance** - Next.js SSR, image optimization, Cloudflare-ready

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3.4
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: next-seo + custom JSON-LD Schema

## Project Structure

```
kenya-consultancy/
├── app/
│   ├── layout.js          # Root layout with metadata
│   ├── page.js            # Homepage
│   ├── globals.css        # Global styles
│   ├── services/
│   │   ├── page.js        # Services listing
│   │   └── [slug]/
│   │       └── page.js    # Dynamic service pages
│   ├── request-a-quote/
│   │   └── page.js        # Quote request page
│   ├── contact/
│   │   └── page.js        # Contact page
│   ├── blog/
│   │   └── page.js        # Blog page
│   └── api/
│       ├── lead/
│       │   └── route.js   # Lead submission API
│       └── whatsapp/
│           └── route.js   # WhatsApp routing API
├── components/
│   ├── Header.js          # Global header with nav
│   ├── Footer.js          # Global footer
│   ├── LeadForm.js        # Reusable quote form
│   ├── WhatsAppFloat.js   # Floating WhatsApp button
│   ├── StickyBar.js       # Sticky bottom CTA bar
│   ├── Hero.js            # Hero section component
│   ├── FAQ.js             # FAQ accordion component
│   ├── PriceEstimator.js  # Interactive price estimator
│   ├── TrustBadges.js     # Trust badge display
│   ├── SchemaMarkup.js    # JSON-LD schema components
│   └── ServiceCard.js     # Service card component
├── data/
│   ├── services.js        # All 17 service definitions
│   ├── faqs.js            # Site-wide FAQs
│   └── testimonials.js    # Client testimonials
├── lib/
│   ├── whatsapp.js        # WhatsApp URL builder
│   └── email.js           # Email utility functions
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

### Vercel (Recommended)

```bash
npx vercel deploy
```

### Self-Hosted (Node.js)

```bash
npm run build
npm run start
```

## Customization

### Update WhatsApp Number

Edit `WHATSAPP_NUMBER` in:
- `components/WhatsAppFloat.js`
- `components/LeadForm.js`
- `app/api/whatsapp/route.js`
- `lib/whatsapp.js`

### Update Admin Email

Edit `ADMIN_EMAIL` in `app/api/lead/route.js`

### Add New Services

Add to `data/services.js` following the existing structure. The service page will auto-generate.

### Update Google Analytics

Replace `G-XXXXXXXXXX` in `app/layout.js` with your actual GA4 measurement ID.

### Update SendGrid

Replace SMTP credentials in `.env.local` with your SendGrid API key.

## SEO Features

- JSON-LD structured data (LocalBusiness, FAQPage, ProfessionalService)
- Clean URL structure (`/services/solar-installation-kenya`)
- Dynamic meta titles and descriptions per service page
- Open Graph and Twitter Card meta tags
- Mobile-first responsive design
- Fast load times (< 2s on 3G/4G)

## Lead Routing

1. **Form Submission** → POST to `/api/lead` → Email via SendGrid → Auto-responder to client
2. **WhatsApp Click** → Pre-filled message with page context → Opens WhatsApp app
3. **Phone Click** → Direct `tel:` link to +254 7XX XXX XXX

## License

Proprietary. All rights reserved.