# Project Structure

## Directory Organization

```
miami-condo/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Meta Pixel + GA4 scripts
│   ├── globals.css        # Global styles and design tokens
│   ├── page.tsx           # Homepage / landing page
│   ├── page.module.css    # Homepage styles
│   ├── booking/           # Booking page route
│   │   ├── page.tsx       # Hospitable widget embed
│   │   └── booking.module.css
│   ├── photo-tour/        # Photo tour page route
│   │   ├── page.tsx       # Property photo gallery
│   │   └── phototour.module.css
│   ├── thank-you/         # Confirmation page route
│   │   ├── page.tsx       # Purchase conversion tracking
│   │   └── thankyou.module.css
│   └── api/               # API routes
│       └── capi/
│           └── route.ts   # Server-side Meta CAPI endpoint
├── components/            # React components
│   ├── BookingClient.tsx  # Client component for booking widget + InitiateCheckout events
│   ├── PhotoTourClient.tsx # Client component for photo tour interactions
│   └── ThankYouClient.tsx # Client component for Purchase conversion events
├── lib/                   # Shared utilities
│   └── tracking.ts        # Tracking helpers (Meta Pixel, GA4, CAPI)
├── .kiro/                 # Kiro AI assistant configuration
│   └── steering/          # AI steering documents
├── .env.local             # Local environment variables (not committed)
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies and scripts
```

## Architecture Patterns

### Page Structure

- Server Components by default (app/*/page.tsx)
- Client Components marked with "use client" directive (components/*)
- CSS Modules for component-scoped styles (*.module.css)

### Tracking Architecture

- Browser-side: Meta Pixel + GA4 loaded in root layout
- Client components: Fire tracking events on user actions
- Server-side: CAPI endpoint at /api/capi for server-side conversion tracking
- Deduplication: Same eventId used for both pixel and CAPI events

### Data Flow

1. User lands on homepage → PageView tracked
2. User clicks "View Photos" → /photo-tour page with property gallery
3. User clicks "Book Now" → /booking page with Hospitable widget
4. User visits /booking → InitiateCheckout fired (pixel + CAPI + GA4)
5. Hospitable widget handles payment
6. postMessage from Hospitable triggers redirect to /thank-you
7. Thank-you page fires Purchase event (pixel + CAPI + GA4)

## File Naming Conventions

- Pages: `page.tsx` (Next.js App Router convention)
- Layouts: `layout.tsx`
- Client components: PascalCase (e.g., `BookingClient.tsx`)
- Utilities: camelCase (e.g., `tracking.ts`)
- Styles: `*.module.css` for component styles, `globals.css` for global styles

## Import Paths

- Use `@/` alias for root-level imports (configured in tsconfig.json)
- Example: `import { fbEvent } from "@/lib/tracking"`
