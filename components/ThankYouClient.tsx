"use client";
// components/ThankYouClient.tsx
// Fires Purchase conversion events on mount
// Must be client component to access URL params & window

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { fbEvent, gaEvent, sendCAPIEvent } from "@/lib/tracking";

function generateEventId() {
  return `purchase_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const ref = searchParams.get("ref") ?? "direct";
    const nights = Number(searchParams.get("nights") ?? 1);
    const total = Number(searchParams.get("total") ?? 0);
    const eventId = generateEventId();
    const sourceUrl = window.location.href;

    // ── Meta Pixel: Purchase ────────────────────────────
    fbEvent(
      "Purchase",
      {
        content_name: "47th Floor Ocean & Skyline View Condo — Miami",
        content_category: "Vacation Rental",
        content_ids: ["miami-condo-47f"],
        content_type: "vacation_rental",
        currency: "USD",
        value: total || undefined,
        num_nights: nights,
        booking_ref: ref,
      },
      eventId
    );

    // ── GA4: purchase ───────────────────────────────────
    gaEvent("purchase", {
      transaction_id: ref,
      currency: "USD",
      value: total || undefined,
      items: [
        {
          item_id: "miami-condo-47f",
          item_name: "47th Floor Ocean & Skyline View Condo",
          item_category: "Vacation Rental",
          quantity: 1,
          price: total || undefined,
        },
      ],
    });

    // ── Server-side CAPI: Purchase ──────────────────────
    sendCAPIEvent({
      eventName: "Purchase",
      eventId,
      sourceUrl,
      value: total || undefined,
      currency: "USD",
    });
  }, [searchParams]);

  return null; // purely behavioral — no UI
}
