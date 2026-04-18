// app/thank-you/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import ThankYouClient from "@/components/ThankYouClient";
import styles from "./thankyou.module.css";

export const metadata: Metadata = {
  title: "Booking Confirmed! — Miami Sky Condo",
  description: "Your stay is confirmed. We can't wait to welcome you to the 47th floor.",
  robots: { index: false }, // Don't index confirmation page
};

export default function ThankYouPage() {
  return (
    <main className={styles.page}>
      {/* Fires conversion events — no UI */}
      <Suspense fallback={null}>
        <ThankYouClient />
      </Suspense>

      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <p className={styles.eyebrow}>Booking Confirmed</p>
        <h1 className={styles.title}>
          See You in Miami,<br />
          <em>47 Floors Up</em>
        </h1>
        <p className={styles.body}>
          Your reservation is confirmed and you&apos;ll receive a confirmation
          email shortly. Your host Mike will be in touch with check-in details.
        </p>

        <div className={styles.infoGrid}>
          {[
            { icon: "📧", label: "Confirmation", text: "Check your email for full details" },
            { icon: "🏙️", label: "Location", text: "Downtown Miami, FL — 47th Floor" },
            { icon: "🔑", label: "Check-in", text: "Via 24/7 building front desk" },
            { icon: "📞", label: "Questions?", text: "Your host Mike will reach out directly" },
          ].map((item) => (
            <div key={item.label} className={styles.infoItem}>
              <span className={styles.infoIcon}>{item.icon}</span>
              <div>
                <p className={styles.infoLabel}>{item.label}</p>
                <p className={styles.infoText}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            Back to Listing
          </Link>
          <a
            href="https://www.airbnb.com/rooms/1091400351345330535"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            View on Airbnb
          </a>
        </div>

        <p className={styles.footnote}>
          ★★★★★ Rated 4.95 by 21 guests · Superhost Mike
        </p>
      </div>
    </main>
  );
}
