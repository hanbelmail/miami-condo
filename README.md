# Miami Sky Condo — Direct Booking Website

## Stack
- **Next.js 14** (App Router) — hosted on Vercel
- **Hospitable** booking widget (iframe embed)
- **Meta Pixel** (browser) + **Conversions API / CAPI** (server-side)
- **Google Analytics 4**
- **Thank-you redirect** with Purchase conversion firing

---

## Project Structure

```
miami-condo/
├── app/
│   ├── layout.tsx              ← Meta Pixel + GA4 injected here (all pages)
│   ├── globals.css             ← Design tokens, fonts
│   ├── page.tsx                ← Homepage / landing page
│   ├── page.module.css
│   ├── booking/
│   │   ├── page.tsx            ← Booking page with Hospitable widget
│   │   └── booking.module.css
│   ├── thank-you/
│   │   ├── page.tsx            ← Confirmation + conversion fire
│   │   └── thankyou.module.css
│   └── api/
│       └── capi/
│           └── route.ts        ← Server-side Meta CAPI endpoint
├── components/
│   ├── BookingClient.tsx       ← InitiateCheckout events + iframe
│   └── ThankYouClient.tsx      ← Purchase conversion events
├── lib/
│   └── tracking.ts             ← Pixel, GA4, CAPI helpers
├── .env.local                  ← Your secret keys (never commit)
├── vercel.json
└── next.config.js
```

---

## Step 1 — Local Setup

```bash
cd miami-condo
npm install
cp .env.local .env.local   # already exists, just fill in the values
npm run dev
# → http://localhost:3000
```

---

## Step 2 — Fill in .env.local

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here
META_CAPI_ACCESS_TOKEN=your_capi_token_here
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Where to find each value:

**Meta Pixel ID**
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Click your Pixel → Settings
3. Copy the Pixel ID (a 15-digit number)

**Meta CAPI Access Token**
1. Meta Events Manager → your Pixel → Settings
2. Scroll to "Conversions API" → "Generate Access Token"
3. Copy the token (keep this secret — server-side only)

**GA4 Measurement ID**
1. [Google Analytics](https://analytics.google.com) → Admin
2. Data Streams → your web stream
3. Copy the Measurement ID (starts with G-)

---

## Step 3 — Deploy to Vercel

### Option A: Vercel CLI (fastest)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Next.js

### Add Environment Variables in Vercel
In your Vercel project → Settings → Environment Variables, add:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_META_PIXEL_ID` | your pixel id | Production, Preview |
| `META_CAPI_ACCESS_TOKEN` | your capi token | Production |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | G-XXXXXXXXXX | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | https://yourdomain.com | Production |

> ⚠️ `META_CAPI_ACCESS_TOKEN` is server-side only — never prefix it with `NEXT_PUBLIC_`.

---

## Step 4 — Connect Your Domain

In Vercel → Project → Settings → Domains:
1. Add your custom domain (e.g. `miamiskycondo.com`)
2. Update your DNS with the provided records
3. SSL is automatic

---

## Step 5 — Verify Tracking

### Meta Pixel
1. Install the [Meta Pixel Helper](https://chromewebstore.google.com/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit your site — you should see `PageView` fire
3. Visit `/booking` — you should see `InitiateCheckout` fire
4. Visit `/thank-you?status=confirmed&ref=test&total=500` — you should see `Purchase` fire

### CAPI (Server-side)
1. Meta Events Manager → your Pixel → Test Events
2. Enter your site URL and trigger the events above
3. You should see server-side events appear with an "S" badge (deduplication in action)

### GA4
1. GA4 → Reports → Realtime
2. Browse your site — events should appear live

---

## Step 6 — Facebook & Instagram Ads Setup

### Create a Campaign
1. Go to [Meta Ads Manager](https://adsmanager.facebook.com)
2. Create Campaign → Objective: **Conversions**
3. Conversion event: **Purchase** (on your pixel)

### Ad Set
- **Audience**: Custom Audience from your pixel data, or Lookalike from past buyers
- **Placements**: Facebook Feed + Instagram Feed + Instagram Stories + Reels
- **Budget**: Start with $20-50/day

### Ad Creative — Best Practices for Rentals
- **Video**: 15-30s walkthrough of the balcony view — views = scroll-stoppers
- **Headline**: "Wake Up 47 Floors Above Miami 🌊"
- **Primary text**: "Private balcony · Ocean views · Sleeps 6. Book direct and skip the Airbnb fees →"
- **CTA button**: "Book Now" → link to `yourdomain.com/booking`
- **UTM**: Add `?utm_source=facebook&utm_medium=paid&utm_campaign=retargeting` to track in GA4

### Retargeting Audiences
In Meta Audiences, create:
1. **Visitors** — people who visited your site but didn't book (pixel: PageView, exclude Purchase)
2. **Checkout starters** — visited `/booking` but no Purchase
3. **Lookalikes** — 1-3% lookalike of your Purchase event audience

---

## Booking Flow & Conversion Events

```
Homepage (PageView)
    ↓
/booking (InitiateCheckout → Pixel + CAPI)
    ↓
Hospitable widget — guest selects dates + pays
    ↓
Hospitable fires postMessage: booking_confirmed
    ↓
Redirect to /thank-you?ref=XXX&total=YYY&nights=Z
    ↓
Purchase event fires (Pixel + CAPI + GA4)
```

> **Note on Hospitable postMessage**: The widget fires a `booking_confirmed` message
> when a booking is completed. If your Hospitable plan supports a custom redirect URL,
> set it to `https://yourdomain.com/thank-you` in your Hospitable dashboard under
> Widget Settings → Confirmation redirect. This is the most reliable method.

---

## Customization Checklist

- [ ] Replace `NEXT_PUBLIC_META_PIXEL_ID` with your real Pixel ID
- [ ] Replace `META_CAPI_ACCESS_TOKEN` with your real CAPI token
- [ ] Replace `NEXT_PUBLIC_GA4_MEASUREMENT_ID` with your GA4 ID
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your domain
- [ ] Add your domain in Vercel
- [ ] In Hospitable dashboard → Widget Settings → set redirect URL to `/thank-you`
- [ ] Create Facebook/Instagram ad campaign targeting `/booking` page
- [ ] Set up retargeting audiences in Meta Audiences

---

## Tech Notes

- **CAPI deduplication**: Both pixel and CAPI events share the same `eventId` — Meta automatically deduplicates them so you don't double-count conversions.
- **PII hashing**: User email and phone are SHA-256 hashed before being sent to Meta CAPI (required by Meta policy).
- **No cookies banner needed** for the Pixel alone in many jurisdictions, but consult a lawyer for your target markets (GDPR for EU audiences requires consent).
