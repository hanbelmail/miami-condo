"use client";
// components/BookingClient.tsx
// Embeds Hospitable widget and fires Meta Pixel + GA4 events
// on page load (InitiateCheckout) and listens for booking completion

import { useEffect, useRef } from "react";
import { fbEvent, gaEvent, sendCAPIEvent } from "@/lib/tracking";

function generateEventId() {
  return `ev_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function BookingClient() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const eventId = generateEventId();
    const sourceUrl = window.location.href;

    // 1. Browser-side pixel
    fbEvent(
      "InitiateCheckout",
      {
        content_name: "47th Floor Ocean & Skyline View Condo — Miami",
        content_category: "Vacation Rental",
        currency: "USD",
        num_items: 1,
      },
      eventId
    );

    // 2. GA4 event
    gaEvent("begin_checkout", {
      currency: "USD",
      items: [
        {
          item_id: "miami-condo-47f",
          item_name: "47th Floor Ocean & Skyline View Condo",
          item_category: "Vacation Rental",
        },
      ],
    });

    // 3. Server-side CAPI (deduplicated via same eventId)
    sendCAPIEvent({
      eventName: "InitiateCheckout",
      eventId,
      sourceUrl,
    });
  }, []);

  // ── Listen for Hospitable booking confirmation ──────────
  // Hospitable posts a message when booking is completed.
  // We redirect to /thank-you with booking params for conversion tracking.
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      // Accept messages from Hospitable
      if (!event.origin.includes("hospitable.com") && !event.origin.includes("booking.hospitable.com")) return;

      const data = event.data;

      // Hospitable fires booking_confirmed or similar
      if (
        data?.type === "booking_confirmed" ||
        data?.type === "BOOKING_CONFIRMED" ||
        data?.event === "booking_confirmed"
      ) {
        const params = new URLSearchParams({
          status: "confirmed",
          ref: data?.bookingId ?? data?.reservation_id ?? "direct",
          nights: String(data?.nights ?? ""),
          total: String(data?.total ?? data?.price ?? ""),
        });
        window.location.href = `/thank-you?${params.toString()}`;
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="hospitable-wrap">
      <iframe
        id="booking-iframe"
        sandbox="allow-top-navigation allow-scripts allow-same-origin"
        style={{ width: "100%", height: 900, border: "none" }}
        src="https://booking.hospitable.com/widget/a0d25333-efcd-4a54-819d-47d920f4acb9/1345312"
        title="Book your stay — Miami Sky Condo"
      />
    </div>
  );
}
