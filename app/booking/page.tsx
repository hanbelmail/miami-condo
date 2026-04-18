// app/booking/page.tsx
import Link from "next/link";
import type { Metadata } from "next";
import BookingClient from "@/components/BookingClient";
import styles from "./booking.module.css";

export const metadata: Metadata = {
  title: "Book Your Stay — 47th Floor Miami Condo",
  description:
    "Check availability and book directly. 2BR/2BA luxury condo on the 47th floor with panoramic ocean and skyline views in Downtown Miami.",
};

export default function BookingPage() {
  return (
    <main className={styles.page}>
      {/* ── NAV ──────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <Link href="/" className={styles.logo}>← Miami Sky Condo</Link>
          <span className={styles.navTag}>Secure Direct Booking</span>
        </div>
      </nav>

      <div className="container">
        <div className={styles.layout}>
          {/* ── LEFT SIDEBAR ──────────────────────────── */}
          <aside className={styles.sidebar}>
            <div className={styles.propertyCard}>
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/89aa41c8-57f6-44d9-909a-738ae3f6222d.jpeg"
                alt="47th floor condo exterior view"
                className={styles.propertyImg}
              />
              <div className={styles.propertyInfo}>
                <p className={styles.eyebrow}>Downtown Miami · 47th Floor</p>
                <h1 className={styles.propertyTitle}>
                  Ocean &amp; Skyline View Condo
                </h1>
                <p className={styles.propertySub}>
                  2 Bedrooms · 2 Baths · Sleeps 6
                </p>
                <div className={styles.rating}>
                  <span className={styles.stars}>★★★★★</span>
                  <span>4.95 · 21 reviews</span>
                </div>
              </div>
            </div>

            <div className={styles.benefitsCard}>
              <h2 className={styles.benefitsTitle}>Why Book Direct?</h2>
              {[
                { icon: "💰", text: "No Airbnb service fees — save up to 15%" },
                { icon: "🔒", text: "Same secure payment & instant confirmation" },
                { icon: "📅", text: "Real-time availability, always synced" },
                { icon: "🤝", text: "Direct communication with your host Mike" },
              ].map((b) => (
                <div key={b.text} className={styles.benefit}>
                  <span className={styles.benefitIcon}>{b.icon}</span>
                  <span className={styles.benefitText}>{b.text}</span>
                </div>
              ))}
            </div>

            <div className={styles.hostCard}>
              <div className={styles.hostInfo}>
                <div className={styles.hostAvatar}>M</div>
                <div>
                  <p className={styles.hostName}>Mike</p>
                  <p className={styles.hostBadge}>🏅 Superhost · 2 years</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ── BOOKING WIDGET ────────────────────────── */}
          <div className={styles.widgetWrap}>
            <div className={styles.widgetHeader}>
              <h2 className={styles.widgetTitle}>Select Your Dates</h2>
              <p className={styles.widgetSub}>
                Real-time availability · Instant confirmation
              </p>
            </div>
            <BookingClient />
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <p>© {new Date().getFullYear()} Miami Sky Condo · Hosted by Mike · Superhost ★ 4.95</p>
          <p>
            <Link href="/">Back to listing</Link>
            {" · "}
            <a href="https://www.airbnb.com/rooms/1091400351345330535" target="_blank" rel="noopener noreferrer">
              View on Airbnb
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
