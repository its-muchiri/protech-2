# Google Search Console & Indexing API Setup Guide

## Overview
This document explains how to set up Google Search Console verification and the Google Indexing API for automatic blog post indexing on pro-tech.co.ke.

## Part 1: Google Search Console Verification (HTML Meta Tag)

### 1. Get Your Verification Code
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (pro-tech.co.ke)
3. Go to **Settings** → **Ownership verification**
3. Click **HTML tag** method
4. Copy the meta tag: `<meta name="google-site-verification" content="YOUR_CODE_HERE" />`

### 2. Add to Site
The meta tag has already been added to `app/layout.js` in the `<head>` section:

```html
<meta name="google-site-verification" content="REPLACE_WITH_YOUR_GSC_VERIFICATION_CODE" />
```

**Action Required:** Replace `REPLACE_WITH_YOUR_GSC_VERIFICATION_CODE` with your actual verification code from GSC.

### 3. Verify in GSC
1. Return to GSC Ownership verification page
2. Click **Verify** under the HTML tag method
3. Both the existing file method (`googleedc1b6f85d61f393.html`) and the meta tag will work simultaneously

---

## Part 2: Google Indexing API Setup

### 1. Google Cloud Project Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one (e.g., "pro-tech-indexing")
3. Enable **Indexing API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Indexing API"
   - Click **Enable**

### 2. Create Service Account
1. Go to **IAM & Admin** → **Service Accounts**
2. Click **Create Service Account**
3. Name: `pro-tech-indexing-api`
4. Grant **Owner** or **Editor** role on the project
5. Click **Done**

### 3. Create JSON Key
1. Click on the created service account
2. Go to **Keys** tab → **Add Key** → **Create new key**
3. Select **JSON** format
4. Save the file securely (e.g., `/home/user/secrets/protech-indexing-key.json`)

### 4. Add Service Account to Google Search Console
1. Go to **Google Search Console** → **Settings** → **Users and permissions**
2. Click **Add user**
3. Enter the service account email (e.g., `pro-tech-indexing@my-project.iam.gserviceaccount.com`)
4. Set permission to **Owner**

### 5. Configure Environment Variables
Add these to your deployment environment (Vercel, Netlify, or server):

```bash
# Required
GOOGLE_INDEXING_KEY_PATH=/path/to/your/service-account-key.json

# Optional (defaults to https://www.pro-tech.co.ke)
SITE_URL=https://www.pro-tech.co.ke
```

**For Vercel:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `GOOGLE_INDEXING_KEY_PATH` with the key content (or path if using file)
3. Add `SITE_URL` = `https://www.pro-tech.co.ke`

### 6. Install Dependencies
```bash
npm install googleapis --save
```

---

## Part 3: How It Works

### Automatic Post-Build Submission
The `postbuild` script in `package.json` runs automatically after `next build`:

```json
"postbuild": "node scripts/submit-to-indexing-api.js"
```

This script:
1. Detects new/updated blog posts by comparing with previous build manifest
2. Submits only new/changed URLs to Google Indexing API
3. Logs all submissions to `logs/indexing-api.log`
4. Respects API quota (200 requests/day default)

### Manual Commands
```bash
# Submit new/updated posts from last build
npm run indexing:submit

# Backfill ALL existing posts (run once)
npm run indexing:backfill

# Resume interrupted backfill
npm run indexing:backfill:resume

# Dry run to see what would be submitted
npm run indexing:backfill:dry-run
```

### Backfill Historical Posts
To index all 1,640+ existing blog posts:
```bash
# Run once (takes ~9 days at 180/day quota)
npm run indexing:backfill

# Or resume if interrupted
npm run indexing:backfill:resume

# Dry run to preview
npm run indexing:backfill:dry-run
```

---

## File Structure Created

```
protech2/
├── app/
│   └── layout.js              # ← GSC meta tag added here
├── lib/
│   ├── indexing-api.js        # Google Indexing API client
│   └── blog-content.js        # Blog post loader
├── scripts/
│   ├── submit-to-indexing-api.js    # Post-build auto-submission
│   ├── backfill-indexing-api.js     # Historical backfill script
│   └── generate-sitemap.js          # Sitemap generator
├── logs/
│   └── indexing-api.log       # Submission audit log
├── .last-deploy-manifest.json # Tracks last deploy state
├── .indexing-backfill-checkpoint.json  # Backfill resume point
└── public/sitemap.xml         # Generated sitemap
```

---

## Logging & Monitoring

### Submission Log (`logs/indexing-api.log`)
Each submission is logged as JSON:
```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://www.pro-tech.co.ke/blog/my-new-post",
  "type": "URL_UPDATED",
  "status": "success",
  "response": { "urlNotificationMetadata": { ... } }
}
```

### View Logs
```bash
# View recent submissions
tail -20 logs/indexing-api.log

# View failed submissions
grep '"status":"error"' logs/indexing-api.log

# Count submissions today
grep "$(date +%Y-%m-%d)" logs/indexing-api.log | wc -l
```

---

## Quota Management

### Default Quotas
- **Daily**: 200 URL notifications
- **Per minute**: ~300 requests/minute (burst)

### Handling Large Volumes
- **Daily posts ≤ 180**: Auto-submits all in one day
- **Daily posts > 180**: Script submits first 190, logs warning
- **Backfill 1,640 posts**: Takes ~9 days at 180/day

### Request Quota Increase
1. Go to [Google Cloud Quotas](https://console.cloud.google.com/iam-admin/quotas)
2. Search for "Indexing API"
3. Click **Edit Quotas** → Request increase
4. Justify with: "News/blog site with daily content updates requiring timely indexing"

---

## Troubleshooting

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid service account key | Check `GOOGLE_INDEXING_KEY_PATH` path and file permissions |
| `403 Forbidden` | Service account not owner in GSC | Add service account email as Owner in GSC |
| `429 Too Many Requests` | Quota exceeded | Wait for quota reset (midnight UTC) or request increase |
| `404 Not Found` | URL doesn't exist | Ensure URL is publicly accessible before submitting |

### Testing Locally
```bash
# Test with dry run
npm run indexing:backfill:dry-run

# Submit single URL for testing
node -e "
const { submitUrlUpdated } = require('./lib/indexing-api');
submitUrlUpdated('https://www.pro-tech.co.ke/blog/test-post').then(console.log);
"
```

---

## Security Notes

1. **Never commit the service account key** to git (add to `.gitignore`)
2. **Store key securely** on server (outside web root)
3. **Rotate keys periodically** (every 90 days recommended)
4. **Use least privilege** - only grant Owner in GSC, not entire project
5. **Monitor logs** for unauthorized submissions

---

## Verification Checklist

- [ ] GSC verification meta tag added to `app/layout.js`
- [ ] Verification successful in GSC (both methods active)
- [ ] Google Cloud project created with Indexing API enabled
- [ ] Service account created with JSON key
- [ ] Service account added as Owner in GSC
- [ ] `GOOGLE_INDEXING_KEY_PATH` set in deployment environment
- [ ] `npm install googleapis` completed
- [ ] `npm run build` completes with post-build indexing
- [ ] `npm run indexing:backfill:dry-run` works
- [ ] Historical backfill scheduled/run
- [ ] Logs being written to `logs/indexing-api.log`
- [ ] Sitemap.xml still submitted in GSC (complementary)

---

## File Locations Summary

| File | Purpose |
|------|---------|
| `app/layout.js` | GSC verification meta tag |
| `lib/indexing-api.js` | Indexing API client module |
| `scripts/submit-to-indexing-api.js` | Post-build auto-submission |
| `scripts/backfill-indexing-api.js` | Historical backfill |
| `scripts/generate-sitemap.js` | Sitemap generator |
| `logs/indexing-api.log` | Submission audit log |
| `.last-deploy-manifest.json` | Deploy state tracking |
| `.indexing-backfill-checkpoint.json` | Backfill resume point |

---

## Support & References

- [Google Indexing API Docs](https://developers.google.com/search/apis/indexing-api/v3/quickstart)
- [GSC Verification Methods](https://support.google.com/webmasters/answer/9008080)
- [Indexing API Quotas](https://developers.google.com/search/apis/indexing-api/v3/quotas)
- [Next.js App Router Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)