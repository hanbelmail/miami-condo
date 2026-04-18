# Tech Stack

## Framework & Runtime

- Next.js 14.2.5 (App Router)
- React 18
- TypeScript 5
- Node.js 20+

## Hosting & Deployment

- Vercel (production hosting)
- Automatic deployments from git push

## Third-Party Integrations

- Hospitable booking widget (iframe embed)
- Meta Pixel + Conversions API (CAPI) for Facebook/Instagram ads
- Google Analytics 4

## Build System

Next.js handles all bundling, transpilation, and optimization automatically.

## Common Commands

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Create optimized production build
npm run start        # Run production server locally

# Code Quality
npm run lint         # Run ESLint checks
```

## Environment Variables

Required in `.env.local` (local) and Vercel dashboard (production):

- `NEXT_PUBLIC_META_PIXEL_ID` - Meta Pixel ID (public)
- `META_CAPI_ACCESS_TOKEN` - Meta CAPI token (server-only, never prefix with NEXT_PUBLIC_)
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` - Google Analytics 4 measurement ID (public)
- `NEXT_PUBLIC_SITE_URL` - Production domain URL (public)

## Key Dependencies

- `next` - Framework
- `react`, `react-dom` - UI library
- `typescript` - Type safety
- `eslint`, `eslint-config-next` - Code linting

## Deployment Process

1. Push to main branch
2. Vercel auto-builds and deploys
3. Environment variables must be set in Vercel dashboard before first deploy
