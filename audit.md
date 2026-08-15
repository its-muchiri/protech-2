# System Audit: ProTech Consulting Website

**Project Code**: `protech2` / `kenya-consultancy`
**Audit Date**: August 10, 2026
**Auditor**: Automated System Review

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture](#4-architecture)
5. [Data Layer](#5-data-layer)
6. [Authentication & Security](#6-authentication--security)
7. [API Endpoints](#7-api-endpoints)
8. [Frontend Pages](#8-frontend-pages)
9. [Components](#9-components)
10. [Services Catalog](#10-services-catalog)
11. [Forms & Lead Capture](#11-forms--lead-capture)
12. [SEO & Structured Data](#12-seo--structured-data)
13. [Third-Party Integrations](#13-third-party-integrations)
14. [Deployment & Configuration](#14-deployment--configuration)
15. [Known Issues & Risks](#15-known-issues--risks)
16. [Recommendations](#16-recommendations)

---

## 1. System Overview

This is a **lead generation website** for a Kenyan multi-service consultancy firm based in Nairobi. The site markets 17+ professional services including construction, solar power, plumbing, borehole drilling, security systems, and more.

**Business Model**: The website captures visitor inquiries via contact forms, WhatsApp, and phone calls, then routes those leads to the sales team via email notifications.

**Core Functionality**:
- Marketing pages for 17 different services
- Lead capture forms (email + WhatsApp)
- Interactive price estimator
- Blog with 6 articles
- Portfolio showcase
- JSON-LD structured data for search engines

**What it is NOT**:
- No e-commerce or payment processing
- No user accounts or authentication
- No admin panel or CMS
- No database — all data is static JavaScript files

---

## 2. Technology Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js (App Router) | 14.2+ |
| UI Library | React | 18.3+ |
| Language | JavaScript | ES2017+ |
| Styling | Tailwind CSS | 3.4 |
| Form Handling | react-hook-form | 7.51+ |
| Animations | framer-motion | 11+ (declared, minimally used) |
| Icons | lucide-react | 0.400+ |
| Hosting | Vercel | — |
| Email Service | SendGrid API v3 | REST (direct fetch) |
| Package Manager | npm | with lockfile |

**Fonts**: Inter (body) + Poppins (headings) via Google Fonts

**Color System**:
- `primary` — Green (brand primary)
- `accent` — Orange (call-to-action highlights)
- `navy` — Dark Blue (text/headings)

---

## 3. Project Structure

```
protech2/
├── app/                          # Next.js App Router (pages + API)
│   ├── layout.js                 # Root layout (Header, Footer, WhatsAppFloat, StickyBar, GA)
│   ├── page.js                   # Homepage
│   ├── globals.css               # Global styles
│   ├── about/page.js             # About page
│   ├── blog/
│   │   ├── page.js               # Blog listing (6 posts)
│   │   └── [slug]/page.js        # Blog post detail (6 posts)
│   ├── contact/page.js           # Contact page
│   ├── portfolio/page.js         # Portfolio page (6 projects)
│   ├── request-a-quote/page.js   # Quote request page
│   ├── services/
│   │   ├── page.js               # Services listing
│   │   └── [slug]/page.js        # Service detail (17 services)
│   └── api/
│       ├── lead/route.js         # Lead capture endpoint
│       └── whatsapp/route.js     # WhatsApp redirect/URL builder
├── components/                   # Reusable React components
│   ├── Header.js                 # Navigation (client)
│   ├── Footer.js                 # Footer (server)
│   ├── Hero.js                   # Homepage hero (client)
│   ├── LeadForm.js               # Lead capture form (client)
│   ├── FAQ.js                    # FAQ accordion (client)
│   ├── PriceEstimator.js         # Price calculator (client)
│   ├── SchemaMarkup.js           # JSON-LD structured data (server)
│   ├── TrustBadges.js            # Certification badges (server)
│   ├── WhatsAppFloat.js          # Floating WhatsApp button (client)
│   └── StickyBar.js              # Sticky bottom CTA (client)
├── data/
│   ├── services.js               # 17 service definitions
│   └── faqs.js                   # 8 site-wide FAQs
├── lib/
│   └── whatsapp.js               # WhatsApp URL utilities
├── assets/images/                # Empty — no images present
├── services/                     # Empty directory
└── [config files]                # next.config.js, tailwind.config.js, etc.
```

---

## 4. Architecture

### Rendering Model
- **Server Components** (default): Footer, TrustBadges, SchemaMarkup, all page shells
- **Client Components** (`'use client'`): Header, Hero, LeadForm, FAQ, PriceEstimator, WhatsAppFloat, StickyBar

### Routing
- Uses Next.js **App Router** with file-based routing
- Dynamic routes: `/services/[slug]`, `/blog/[slug]`
- Static generation via `generateStaticParams()` for all 17 services and 6 blog posts
- API routes for lead capture and WhatsApp integration

### Data Flow
```
Visitor → Page (Server Rendered)
       → Fills LeadForm (Client Component)
       → POST /api/lead
       → Phone formatted to +254 format
       → SendGrid API → Email to protech.ke.group@gmail.com
       → Response returned to form
```

---

## 5. Data Layer

**Critical Finding: No database exists.** All data is hardcoded in JavaScript files.

### Static Data Files

| File | Contents | Records |
|------|----------|---------|
| `/data/services.js` | Service definitions | 17 services |
| `/data/faqs.js` | Site-wide FAQs | 8 questions |
| `/app/blog/page.js` | Blog post listings | 6 posts (inline) |
| `/app/blog/[slug]/page.js` | Blog post content | 6 posts (inline HTML) |
| `/app/portfolio/page.js` | Portfolio items | 6 projects (inline) |

### Service Object Schema
Each service contains:
```
{
  slug: string,           // URL-friendly identifier
  name: string,           // Display name
  icon: string,           // Emoji icon
  description: string,    // Short description
  longDescription: string, // Full description
  subServices: string[],  // 8 sub-services per service
  faqs: {                 // 3-4 FAQs per service
    question: string,
    answer: string
  }[],
  pricing: string,        // Price or "Custom Quote"
  metaTitle: string,      // SEO title
  metaDescription: string // SEO meta description
}
```

### Implications
- Content changes require code deployment
- No CMS for non-technical users
- Blog posts are embedded as raw HTML strings in JSX
- No image management system

---

## 6. Authentication & Security

### Authentication: NONE
- No login/logout functionality
- No user accounts or roles
- No admin panel
- No session management
- No JWT, cookies, or token-based auth
- All pages are publicly accessible

### Security Measures Present
- Phone number validation (Kenyan format regex)
- Input validation on lead form (name + phone required)
- SendGrid API key stored in environment variable
- HTTPS enforced via Vercel

### Security Gaps
- **No rate limiting** on `/api/lead` — vulnerable to spam/abuse
- **No CSRF protection** — forms can be submitted cross-origin
- **No input sanitization** — `dangerouslySetInnerHTML` used in blog posts (XSS risk if content were dynamic)
- **No Content Security Policy** headers configured
- **No abuse prevention** on WhatsApp redirect endpoint
- Admin email now set to `protech.ke.group@gmail.com`

---

## 7. API Endpoints

### POST `/api/lead` — Lead Capture

**Purpose**: Captures form submissions and sends email notifications.

**Request Body**:
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| name | string | Yes | Full name |
| phone | string | Yes | Kenyan phone number |
| email | string | No | Email address |
| service | string | No | Selected service |
| location | string | No | Nairobi, Kiambu, Mombasa, etc. |
| details | string | No | Project description |
| budget | string | No | Budget range |
| page | string | No | Page where form was submitted |

**Processing**:
1. Validates name and phone are present
2. Strips spaces, dashes, parentheses from phone
3. Converts `07xx`/`01xx` to `+254` format
4. Sends HTML email via SendGrid REST API
5. Returns `{ success, message, emailSent }`

**Error Responses**: 400 (missing fields), 500 (internal error)

---

### GET `/api/whatsapp` — WhatsApp Redirect

**Purpose**: Redirects user to WhatsApp with pre-filled message.

**Query Parameters**: `text` (optional, defaults to "Hello, I am interested in your services.")

**Response**: 302 redirect to `https://wa.me/254707526602?text=...`

**Note**: WhatsApp phone number set to `254707526602` (0707526602).

---

### POST `/api/whatsapp` — WhatsApp URL Builder

**Purpose**: Returns a WhatsApp URL without redirecting.

**Request Body**: `{ message, phone, service, location, name }`

**Response**: `{ url: string, message: string }`

---

## 8. Frontend Pages

### Homepage (`/`)
- Hero section with stats (500+ projects, 17+ services, 5+ years, 24/7 support)
- Featured services grid (6 of 17)
- Trust badges (NCA, EPRA, NEMA, KRA, ERC, ISO)
- "Why Choose Us" section with Quick Quote form
- Interactive Price Estimator
- 3 testimonials (James Mwangi, Sarah Wanjiku, David Ochieng)
- FAQ section
- CTA with quote request + WhatsApp buttons

### Services List (`/services`)
- Grid of all 17 service cards
- Each links to `/services/{slug}`

### Service Detail (`/services/[slug]`)
- Generated statically for all 17 slugs
- Dynamic metadata + JSON-LD schema markup
- Hero banner, sub-services grid (8 items)
- Pricing, FAQs (3-4 per service)
- CTA with WhatsApp + Phone buttons

### About (`/about`)
- Company story, stats, values
- Lead capture form

### Blog (`/blog`)
- 6 hardcoded posts with titles, excerpts, dates
- Categories: solar, construction compliance, borehole, water filtration, security, office design

### Blog Post (`/blog/[slug]`)
- 6 posts with full HTML content
- Static generation via `generateStaticParams()`
- Share links (Facebook, Twitter, WhatsApp — currently `href="#"` placeholders)

### Portfolio (`/portfolio`)
- 6 hardcoded projects
- Placeholder images (gray boxes — no actual images)

### Contact (`/contact`)
- Phone, email, location, working hours info cards
- WhatsApp CTA + Lead form

### Request a Quote (`/request-a-quote`)
- Dedicated quote form
- Phone + WhatsApp direct contact links

---

## 9. Components

| Component | Type | Purpose |
|-----------|------|---------|
| `Header.js` | Client | Responsive navigation with mobile menu |
| `Footer.js` | Server | Site footer with links and contact info |
| `Hero.js` | Client | Homepage hero with animated stats |
| `LeadForm.js` | Client | Reusable lead capture form |
| `FAQ.js` | Client | Expandable FAQ accordion |
| `PriceEstimator.js` | Client | Interactive price calculator |
| `SchemaMarkup.js` | Server | JSON-LD structured data injection |
| `TrustBadges.js` | Server | Certification badge display |
| `WhatsAppFloat.js` | Client | Fixed floating WhatsApp button |
| `StickyBar.js` | Client | Fixed bottom CTA bar |

### LeadForm Component Details
- **Props**: `compact`, `showServiceSelector`, `className`
- **Fields**: Name (required), Phone (required), Email, Service (dropdown), Location (dropdown), Project Details
- **Phone Validation**: Regex `/^(\+254|07|01)\d{7,9}$/`
- **Submission Options**: "Send via Email" (POST to `/api/lead`) + "WhatsApp" (opens WhatsApp)

---

## 10. Services Catalog

| # | Service | Slug | Starting Price |
|---|---------|------|----------------|
| 1 | Construction & Civil Engineering | construction-civil-engineering | Custom Quote |
| 2 | Swimming Pool Construction | swimming-pool-construction | KES 300,000 |
| 3 | Medical Equipment & Supplies | medical-equipment-supplies | Varies |
| 4 | Logistics & Freight | logistics-freight-services | KES 5,000 |
| 5 | Technical Repairs | technical-repairs-appliance | KES 2,000 |
| 6 | Water Filtration & Purification | water-filtration-purification | KES 50,000 |
| 7 | Solar Power & Renewable Energy | solar-power-renewable-energy | KES 150,000 |
| 8 | Roofing & Waterproofing | roofing-systems-waterproofing | KES 100,000 |
| 9 | Plumbing & Drainage | plumbing-drainage-services | KES 1,000 |
| 10 | Security Systems | security-systems-physical-security | KES 50,000 |
| 11 | Garage & Automotive | garage-automotive-services | KES 1,000 |
| 12 | Borehole Drilling | borehole-drilling-water-services | KES 200,000 |
| 13 | Architectural Design | architectural-design-house-plans | KES 30,000 |
| 14 | Generator Sales & Repair | generator-sales-repair | KES 50,000 |
| 15 | Electrical Installation | electrical-installation-wiring | KES 50,000 |
| 16 | Interior Design & Fit-Outs | interior-design-office-fitouts | KES 100,000 |
| 17 | Office Partitions & Glass | office-partitions-glass-works | KES 20,000/sqm |

---

## 11. Forms & Lead Capture

### Form Fields
| Field | Validation | Required |
|-------|-----------|----------|
| Full Name | Non-empty | Yes |
| Phone Number | Kenyan format (+254/07/01 prefix, 7-10 digits) | Yes |
| Email | Standard email format | No |
| Service | Dropdown selection | Yes |
| Location | Dropdown (Nairobi, Kiambu, Mombasa, Nakuru, Kisumu, Eldoret, Other) | No |
| Project Details | Free text | No |

### Submission Flow
1. Client-side validation via react-hook-form
2. Phone number normalized to `+254XXXXXXXXX` format
3. POST to `/api/lead` with JSON body
4. Server validates required fields
5. SendGrid API sends HTML email to admin
6. Success/error response returned

### Dual Submission
- **Email**: Sends structured lead data to sales team
- **WhatsApp**: Opens WhatsApp with pre-filled message to company number

---

## 12. SEO & Structured Data

### Page Metadata
- Dynamic `title` and `description` for all pages via Next.js `generateMetadata()`
- Service pages include service-specific meta titles and descriptions

### JSON-LD Schema (on service pages)
- `ServicePage` schema
- `FAQPage` schema (from service FAQs)
- `LocalBusiness` schema (Nairobi-based)

### Trust Badges Referenced
- NCA (National Construction Authority)
- EPRA (Energy and Petroleum Regulatory Authority)
- NEMA (National Environment Management Authority)
- KRA (Kenya Revenue Authority)
- ERC (Energy Regulatory Commission)
- ISO Certification

**Note**: Badge images are referenced but the `assets/images/` directory is empty — badges may not render correctly.

---

## 13. Third-Party Integrations

### SendGrid (Email)
- **Method**: Direct REST API call (`https://api.sendgrid.com/v3/mail/send`)
- **Auth**: API key via `SENDGRID_API_KEY` environment variable
- **To**: `ADMIN_EMAIL` env var (set to `protech.ke.group@gmail.com`)
- **From**: Same admin email
- **Format**: HTML email with lead details

### WhatsApp
- **Phone**: `254707526602` (0707526602)
- **Method**: URL redirect to `wa.me` with pre-filled text
- **Usage**: Floating button + form submission option

### Google Analytics
- Referenced in root layout (`app/layout.js`) as `GA Measurement ID`

### Vercel
- Hosting platform
- Project ID: `prj_bxFXbIkvVkmB0MAUyY6GNPzO0gB9`
- Organization: `team_9QdcIMYlTuxx9YtAsczK13Gr`

---

## 14. Deployment & Configuration

### Environment Variables Required
| Variable | Purpose | Status |
|----------|---------|--------|
| `SENDGRID_API_KEY` | SendGrid API authentication | Required |
| `ADMIN_EMAIL` | Lead notification recipient | Set to `protech.ke.group@gmail.com` |

**Template**: `.env.local.example` exists with SMTP settings (but code uses SendGrid REST, not SMTP).

### Next.js Configuration
- Path alias: `@/*` maps to project root
- URL rewrite: `/whatsapp` → `/api/whatsapp`
- Image domains: None configured (no images used)

### Build & Deploy
- **Build Command**: `next build`
- **Deploy Target**: Vercel (auto-deploy on git push)
- **Node Version**: Not specified in config

### ESLint
- Config: `next/core-web-vitals`
- No custom rules

---

## 15. Known Issues & Risks

### Critical Issues
| # | Issue | Impact |
|---|-------|--------|
| 1 | ~~WhatsApp phone number is `254700000000` (placeholder)~~ | **RESOLVED** — Set to `254707526602` |
| 2 | ~~Admin email is `sales@yourdomain.co.ke` (placeholder)~~ | **RESOLVED** — Set to `protech.ke.group@gmail.com` |
| 3 | No rate limiting on `/api/lead` | Vulnerable to spam/abuse |
| 4 | No CSRF protection | Forms can be submitted cross-origin |

### High Issues
| # | Issue | Impact |
|---|-------|--------|
| 5 | No database — all data hardcoded | Content changes require deployment |
| 6 | No admin panel | Cannot manage content without developer |
| 7 | Blog posts use `dangerouslySetInnerHTML` | XSS risk if content source changes |
| 8 | Portfolio/blog images are placeholders | Unprofessional appearance |
| 9 | Trust badge images missing | Certification claims not visually backed |

### Medium Issues
| # | Issue | Impact |
|---|-------|--------|
| 10 | Blog share links are `href="#"` placeholders | Social sharing broken |
| 11 | No Content Security Policy headers | Security best practice gap |
| 12 | `.env.local.example` lists SMTP but code uses SendGrid | Configuration confusion |
| 13 | framer-motion declared but barely used | Unnecessary bundle size |
| 14 | No image optimization configured | Performance impact if images added |
| 15 | No 404 page defined | Default error page shown |

### Low Issues
| # | Issue | Impact |
|---|-------|--------|
| 16 | Empty `services/` directory | Unused code artifact |
| 17 | Empty `assets/images/` directory | No image assets present |
| 18 | No TypeScript | Less type safety |
| 19 | No testing framework | No automated tests |
| 20 | No i18n support | Kenya-only market (acceptable) |

---

## 16. Recommendations

### Immediate (Pre-Launch)
1. ~~Replace placeholder WhatsApp number~~ **Done** — Set to `254707526602`
2. ~~Replace placeholder admin email~~ **Done** — Set to `protech.ke.group@gmail.com`
3. **Add rate limiting** to `/api/lead` (e.g., 5 submissions per IP per hour)
4. **Add CSRF token** to lead form
5. **Add actual images** for trust badges and portfolio items
6. **Test SendGrid integration** with real API key

### Short-Term (Post-Launch)
7. **Add a CMS** (e.g., Sanity, Contentful, or Strapi) for blog/service management
8. **Add Content Security Policy** headers
9. **Implement proper 404 page**
10. **Fix blog share links** to use actual URLs
11. **Add analytics tracking** (GA4 event tracking for form submissions)
12. **Add error monitoring** (e.g., Sentry)

### Long-Term (Growth)
13. **Add admin dashboard** for lead management
14. **Implement lead status tracking** (new → contacted → converted)
15. **Add SMS notifications** for new leads (e.g., via Africa's Talking)
16. **Add multi-language support** (Swahili, English)
17. **Implement A/B testing** for conversion optimization
18. **Add image optimization** with Next.js Image component
19. **Consider adding a database** for lead storage and analytics

---

*End of Audit*
