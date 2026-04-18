// lib/tracking.ts
// ─────────────────────────────────────────────────────────────
// Unified tracking: Meta Pixel (browser) + GA4
// Server-side CAPI lives in /app/api/capi/route.ts
// ─────────────────────────────────────────────────────────────

// ── Meta Pixel (browser-side) ─────────────────────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    _fbq?: unknown;
    dataLayer?: unknown[];
  }
}

export const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** Fire a Meta Pixel standard event */
export function fbEvent(
  name: string,
  params?: Record<string, unknown>,
  eventId?: string
) {
  if (typeof window === "undefined" || !window.fbq) return;
  if (eventId) {
    window.fbq("track", name, params ?? {}, { eventID: eventId });
  } else {
    window.fbq("track", name, params ?? {});
  }
}

/** Fire a Meta Pixel custom event */
export function fbCustomEvent(
  name: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", name, params ?? {});
}

// ── Google Analytics 4 ───────────────────────────────────────
export const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";

/** Fire a GA4 event */
export function gaEvent(
  name: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params ?? {});
}

// ── Server-side CAPI helper ──────────────────────────────────
/**
 * Call our internal /api/capi route to send a server-side
 * Conversions API event to Meta (deduplication via eventId).
 */
export async function sendCAPIEvent(payload: {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  userEmail?: string;
  userPhone?: string;
  value?: number;
  currency?: string;
}) {
  try {
    await fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("CAPI send failed:", e);
  }
}
