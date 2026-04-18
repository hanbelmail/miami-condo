// app/page.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// Extracted from Airbnb listing data
const LISTING_DATA = {
  title: "47th Floor Ocean & Skyline View Condo with Balcony",
  location: "Miami, Florida, United States",
  rating: 4.95,
  reviewCount: 21,
  propertyType: "Entire rental unit",
  guests: 6,
  bedrooms: 2,
  beds: 2,
  baths: 2,
  host: {
    name: "Mike",
    isSuperhost: true,
    yearsHosting: 2,
    avatar: "https://a0.muscache.com/im/pictures/user/User-427073452/original/a34b9992-dcee-4bd9-be55-4ea0be8f6d4c.jpeg"
  },
  images: [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/89aa41c8-57f6-44d9-909a-738ae3f6222d.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ==/original/1e96df36-4d3b-4018-b146-6f1727a8d2d4.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2e88c7c6-670f-40e1-a45c-2faf281bb170.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2a4c03c7-3cdd-4665-84b3-e058d82ddf44.jpeg",
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/2a71c088-4aa3-479c-902c-6c9c62a863a3.jpeg",
  ],
  highlights: [
    { title: "Beautiful and walkable", subtitle: "This area is scenic and easy to get around.", icon: "📍" },
    { title: "Ocean and city views", subtitle: "Guests say the views are lovely.", icon: "🌊" },
    { title: "Mike is a Superhost", subtitle: "Superhosts are experienced, highly rated Hosts.", icon: "⭐" }
  ]
};

// ── SVG ICONS ──────────────────────────────────────────
const IconCitySkyline = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="2" y="14" width="6" height="14"/><rect x="10" y="8" width="6" height="20"/><rect x="18" y="11" width="6" height="17"/>
    <rect x="26" y="16" width="4" height="12"/><line x1="0" y1="28" x2="32" y2="28"/>
    <rect x="11" y="10" width="2" height="2"/><rect x="15" y="10" width="2" height="2"/>
  </svg>
);
const IconOcean = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M2 20 Q8 16 14 20 Q20 24 26 20 Q29 18 30 20"/><path d="M2 25 Q8 21 14 25 Q20 29 26 25 Q29 23 30 25"/>
    <path d="M16 4 L16 14"/><path d="M10 8 L16 4 L22 8"/>
  </svg>
);
const IconBathtub = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M4 16 H28 V22 Q28 26 24 26 H8 Q4 26 4 22 Z"/><path d="M8 16 V8 Q8 5 11 5 Q14 5 14 8"/>
    <line x1="8" y1="26" x2="6" y2="30"/><line x1="24" y1="26" x2="26" y2="30"/>
  </svg>
);
const IconHairDryer = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M6 8 Q6 4 12 4 L22 4 Q28 4 28 10 Q28 16 22 16 L16 16 L16 28"/><path d="M16 16 L12 20"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);
const IconWasher = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="4" width="24" height="26" rx="2"/><circle cx="16" cy="18" r="6"/>
    <circle cx="16" cy="18" r="3"/><circle cx="9" cy="8" r="1.5" fill="currentColor"/>
    <line x1="13" y1="8" x2="22" y2="8"/>
  </svg>
);
const IconTV = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="2" y="5" width="28" height="18" rx="2"/><line x1="12" y1="27" x2="20" y2="27"/>
    <line x1="16" y1="23" x2="16" y2="27"/>
  </svg>
);
const IconWifi = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M4 12 Q16 2 28 12"/><path d="M8 17 Q16 10 24 17"/><path d="M12 22 Q16 18 20 22"/>
    <circle cx="16" cy="26" r="1.5" fill="currentColor"/>
  </svg>
);
const IconPool = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M2 22 Q8 18 14 22 Q20 26 26 22 Q29 20 30 22"/><path d="M2 17 Q8 13 14 17 Q20 21 26 17 Q29 15 30 17"/>
    <line x1="10" y1="4" x2="10" y2="14"/><line x1="22" y1="4" x2="22" y2="14"/><line x1="10" y1="9" x2="22" y2="9"/>
  </svg>
);
const IconSauna = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="8" width="24" height="20" rx="2"/><line x1="4" y1="16" x2="28" y2="16"/>
    <path d="M10 4 Q12 2 10 0"/><path d="M16 4 Q18 2 16 0"/><path d="M22 4 Q24 2 22 0"/>
  </svg>
);
const IconElevator = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="2" width="24" height="28" rx="2"/><line x1="16" y1="2" x2="16" y2="30"/>
    <path d="M8 12 L11 8 L14 12"/><path d="M18 20 L21 24 L24 20"/>
  </svg>
);
const IconCamera = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M2 10 L8 10 L10 6 L22 6 L24 10 L30 10 L30 26 L2 26 Z"/>
    <circle cx="16" cy="18" r="5"/><circle cx="26" cy="13" r="1.5" fill="currentColor"/>
  </svg>
);
const IconKitchen = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="14" width="24" height="14" rx="1"/><line x1="4" y1="20" x2="28" y2="20"/>
    <circle cx="10" cy="8" r="3"/><circle cx="22" cy="8" r="3"/>
    <line x1="10" y1="5" x2="10" y2="2"/><line x1="22" y1="5" x2="22" y2="2"/>
  </svg>
);
const IconGym = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <line x1="16" y1="10" x2="16" y2="22"/><line x1="8" y1="14" x2="24" y2="14"/>
    <rect x="2" y="12" width="4" height="8" rx="1"/><rect x="6" y="13" width="2" height="6" rx="1"/>
    <rect x="26" y="12" width="4" height="8" rx="1"/><rect x="24" y="13" width="2" height="6" rx="1"/>
  </svg>
);
const IconParking = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="4" width="24" height="24" rx="2"/>
    <path d="M11 22 L11 10 L18 10 Q22 10 22 14 Q22 18 18 18 L11 18" strokeWidth="2"/>
  </svg>
);
const IconCrib = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="10" width="24" height="14" rx="2"/><line x1="4" y1="17" x2="28" y2="17"/>
    <line x1="10" y1="10" x2="10" y2="24"/><line x1="16" y1="10" x2="16" y2="24"/><line x1="22" y1="10" x2="22" y2="24"/>
    <line x1="4" y1="24" x2="4" y2="28"/><line x1="28" y1="24" x2="28" y2="28"/>
  </svg>
);
const IconAC = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="2" y="8" width="28" height="10" rx="2"/><line x1="2" y1="13" x2="30" y2="13"/>
    <path d="M8 18 L6 24"/><path d="M14 18 L13 24"/><path d="M20 18 L21 24"/><path d="M26 18 L28 24"/>
  </svg>
);
const IconSmoke = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="16" cy="16" r="12"/><line x1="8" y1="8" x2="24" y2="24"/>
    <path d="M10 16 L22 16"/>
  </svg>
);
const IconShampoo = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M10 6 L10 4 Q10 2 13 2 L19 2 Q22 2 22 4 L22 6 Q26 8 26 14 L26 26 Q26 30 22 30 L10 30 Q6 30 6 26 L6 14 Q6 8 10 6 Z"/>
    <line x1="10" y1="14" x2="22" y2="14"/>
  </svg>
);
const IconHanger = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M16 6 Q20 6 20 10 Q20 13 16 14 L4 22 Q2 23 2 25 Q2 27 4 27 L28 27 Q30 27 30 25 Q30 23 28 22 L16 14"/>
    <circle cx="16" cy="4" r="2"/>
  </svg>
);
const IconBalcony = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="16" width="24" height="12" rx="1"/><line x1="4" y1="16" x2="28" y2="16"/>
    <line x1="10" y1="16" x2="10" y2="28"/><line x1="16" y1="16" x2="16" y2="28"/><line x1="22" y1="16" x2="22" y2="28"/>
    <path d="M8 8 L16 4 L24 8"/>
  </svg>
);
const IconCoffee = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M6 12 L6 24 Q6 28 10 28 L22 28 Q26 28 26 24 L26 12 Z"/>
    <path d="M26 14 Q30 14 30 18 Q30 22 26 22"/>
    <path d="M11 6 Q13 4 11 2"/><path d="M16 6 Q18 4 16 2"/><path d="M21 6 Q23 4 21 2"/>
  </svg>
);
const IconDryer = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="4" width="24" height="26" rx="2"/><circle cx="16" cy="18" r="6"/>
    <path d="M13 15 Q16 12 19 15 Q22 18 19 21 Q16 24 13 21" strokeDasharray="2 2"/>
    <circle cx="9" cy="8" r="1.5" fill="currentColor"/><line x1="13" y1="8" x2="22" y2="8"/>
  </svg>
);
const IconFire = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M16 28 Q6 24 6 16 Q6 10 12 6 Q10 12 14 14 Q14 8 20 4 Q18 12 22 14 Q26 16 26 22 Q26 28 16 28 Z"/>
  </svg>
);
const IconFirstAid = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="4" width="24" height="24" rx="3"/>
    <line x1="16" y1="10" x2="16" y2="22"/><line x1="10" y1="16" x2="22" y2="16"/>
  </svg>
);
const IconDishwasher = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="4" y="4" width="24" height="26" rx="2"/><line x1="4" y1="12" x2="28" y2="12"/>
    <circle cx="16" cy="20" r="5"/><circle cx="16" cy="20" r="2"/>
    <line x1="9" y1="8" x2="14" y2="8"/>
  </svg>
);
const IconHost = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="16" cy="10" r="6"/><path d="M4 28 Q4 20 16 20 Q28 20 28 28"/>
    <path d="M22 14 L26 18 L30 12"/>
  </svg>
);
const IconUnavailable = () => (
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="16" cy="16" r="12"/><line x1="10" y1="10" x2="22" y2="22"/>
  </svg>
);

// ── ALL AMENITIES DATA ──────────────────────────────────
const AMENITY_CATEGORIES = [
  {
    category: "Scenic views",
    items: [
      { icon: <IconCitySkyline />, label: "City skyline view" },
      { icon: <IconOcean />, label: "Ocean view" },
    ],
  },
  {
    category: "Bathroom",
    items: [
      { icon: <IconBathtub />, label: "Bathtub" },
      { icon: <IconHairDryer />, label: "Hair dryer" },
      { icon: <IconShampoo />, label: "Cleaning products" },
      { icon: <IconShampoo />, label: "Shampoo" },
      { icon: <IconShampoo />, label: "Conditioner" },
      { icon: <IconShampoo />, label: "Body soap" },
      { icon: <IconShampoo />, label: "Hot water" },
      { icon: <IconShampoo />, label: "Shower gel" },
    ],
  },
  {
    category: "Bedroom and laundry",
    items: [
      { icon: <IconWasher />, label: "Washer – In unit" },
      { icon: <IconDryer />, label: "Dryer" },
      { icon: <IconHanger />, label: "Essentials" },
      { icon: <IconHanger />, label: "Hangers" },
      { icon: <IconHanger />, label: "Bed linens" },
      { icon: <IconHanger />, label: "Extra pillows and blankets" },
      { icon: <IconHanger />, label: "Iron" },
      { icon: <IconHanger />, label: "Drying rack for clothing" },
      { icon: <IconHanger />, label: "Clothing storage" },
    ],
  },
  {
    category: "Entertainment",
    items: [
      { icon: <IconTV />, label: "TV" },
      { icon: <IconGym />, label: "Exercise equipment" },
    ],
  },
  {
    category: "Family",
    items: [
      { icon: <IconCrib />, label: "Pack 'n play/Travel crib" },
    ],
  },
  {
    category: "Heating and cooling",
    items: [
      { icon: <IconAC />, label: "Air conditioning" },
      { icon: <IconAC />, label: "Ceiling fan" },
      { icon: <IconAC />, label: "Heating" },
    ],
  },
  {
    category: "Home safety",
    items: [
      { icon: <IconCamera />, label: "Exterior security cameras on property" },
      { icon: <IconCamera />, label: "Video and Audio recording in public spaces" },
      { icon: <IconSmoke />, label: "Smoke alarm" },
      { icon: <IconSmoke />, label: "Carbon monoxide alarm" },
      { icon: <IconFire />, label: "Fire extinguisher" },
      { icon: <IconFirstAid />, label: "First aid kit" },
    ],
  },
  {
    category: "Internet and office",
    items: [
      { icon: <IconWifi />, label: "Wifi" },
    ],
  },
  {
    category: "Kitchen and dining",
    items: [
      { icon: <IconKitchen />, label: "Kitchen" },
      { icon: <IconKitchen />, label: "Refrigerator" },
      { icon: <IconKitchen />, label: "Microwave" },
      { icon: <IconKitchen />, label: "Cooking basics" },
      { icon: <IconKitchen />, label: "Dishes and silverware" },
      { icon: <IconKitchen />, label: "Freezer" },
      { icon: <IconDishwasher />, label: "Dishwasher" },
      { icon: <IconKitchen />, label: "Stove" },
      { icon: <IconKitchen />, label: "Single oven" },
      { icon: <IconCoffee />, label: "Coffee maker" },
      { icon: <IconKitchen />, label: "Wine glasses" },
      { icon: <IconKitchen />, label: "Dining table" },
      { icon: <IconCoffee />, label: "Coffee" },
    ],
  },
  {
    category: "Outdoor",
    items: [
      { icon: <IconBalcony />, label: "Patio or balcony" },
      { icon: <IconBalcony />, label: "Outdoor furniture" },
      { icon: <IconBalcony />, label: "Outdoor dining area" },
      { icon: <IconBalcony />, label: "Sun loungers" },
    ],
  },
  {
    category: "Parking and facilities",
    items: [
      { icon: <IconPool />, label: "Pool" },
      { icon: <IconSauna />, label: "Sauna" },
      { icon: <IconElevator />, label: "Elevator" },
      { icon: <IconGym />, label: "Gym" },
      { icon: <IconParking />, label: "Paid parking on premises" },
    ],
  },
  {
    category: "Services",
    items: [
      { icon: <IconHost />, label: "Host greets you" },
    ],
  },
  {
    category: "Not included",
    items: [
      { icon: <IconUnavailable />, label: "Private entrance", unavailable: true },
    ],
    unavailable: true,
  },
];

// Preview items shown before "Show all"
const PREVIEW_AMENITIES = [
  { icon: <IconCitySkyline />, label: "City skyline view" },
  { icon: <IconOcean />, label: "Ocean view" },
  { icon: <IconKitchen />, label: "Kitchen" },
  { icon: <IconWifi />, label: "Wifi" },
  { icon: <IconPool />, label: "Pool" },
  { icon: <IconSauna />, label: "Sauna" },
  { icon: <IconTV />, label: "TV" },
  { icon: <IconElevator />, label: "Elevator" },
  { icon: <IconWasher />, label: "Washer – In unit" },
  { icon: <IconCamera />, label: "Exterior security cameras on property" },
];

function AmenitiesSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className={styles.amenities}>
      <div className="container">
        <p className={styles.sectionLabel}>What&apos;s Included</p>
        <h2 className={`${styles.sectionTitle} ${styles.amenitiesTitle}`}>What this place offers</h2>

        {/* 2-col preview grid */}
        <div className={styles.amenityListGrid}>
          {PREVIEW_AMENITIES.map((a) => (
            <div key={a.label} className={styles.amenityListItem}>
              <span className={styles.amenityListIcon}>{a.icon}</span>
              <span className={styles.amenityListLabel}>{a.label}</span>
            </div>
          ))}
        </div>

        <button className={styles.showAllBtn} onClick={() => setOpen(true)}>
          Show all 54 amenities
        </button>
      </div>

      {/* ── DIALOG ── */}
      {open && (
        <div className={styles.dialogOverlay} onClick={() => setOpen(false)}>
          <div className={styles.dialogPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dialogHeader}>
              <h2 className={styles.dialogTitle}>What this place offers</h2>
              <button className={styles.dialogClose} onClick={() => setOpen(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className={styles.dialogBody}>
              {AMENITY_CATEGORIES.map((cat) => (
                <div key={cat.category} className={styles.dialogCategory}>
                  <h3 className={`${styles.dialogCatTitle} ${cat.unavailable ? styles.dialogCatUnavailable : ""}`}>
                    {cat.category}
                  </h3>
                  <div className={styles.dialogItemList}>
                    {cat.items.map((item) => (
                      <div key={item.label} className={`${styles.dialogItem} ${(item as { unavailable?: boolean }).unavailable ? styles.dialogItemUnavailable : ""}`}>
                        <span className={styles.dialogItemIcon}>{item.icon}</span>
                        <span className={styles.dialogItemLabel}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main>
      {/* ── NAV ────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={`container ${styles.navInner}`}>
          <span className={styles.logo}>Miami Sky Condo</span>
          <Link href="/booking" className={styles.navCta}>
            Book Direct — Best Rate
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <p className={`${styles.eyebrow} fade-up`}>{LISTING_DATA.location}</p>
          <h1 className={`${styles.headline} fade-up-delay-1`}>
            {LISTING_DATA.title}
          </h1>
          <p className={`${styles.subheadline} fade-up-delay-2`}>
            {LISTING_DATA.bedrooms} Bedrooms · {LISTING_DATA.baths} Baths · Sleeps {LISTING_DATA.guests} · Private Balcony · Resort Amenities
          </p>
          <div className={`${styles.heroCtas} fade-up-delay-3`}>
            <Link href="/booking" className={styles.btnPrimary}>
              Check Availability &amp; Book
            </Link>
            <a href="#about" className={styles.btnGhost}>
              Explore the Space
            </a>
          </div>
          <div className={`${styles.heroRating} fade-up-delay-3`}>
            <span className={styles.stars}>★★★★★</span>
            <span>{LISTING_DATA.rating} · {LISTING_DATA.reviewCount} Guest Reviews · {LISTING_DATA.host.isSuperhost && 'Superhost'}</span>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────── */}
      <section className={styles.trustBar}>
        <div className="container">
          <div className={styles.trustGrid}>
            {LISTING_DATA.highlights.map((h) => (
              <div key={h.title} className={styles.trustItem}>
                <span className={styles.trustIcon}>{h.icon}</span>
                <div>
                  <strong>{h.title}</strong>
                  <p className={styles.trustSubtitle}>{h.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────── */}
      <section id="about" className={styles.about}>
        <div className="container">
          {/* Photo Gallery Grid - Airbnb Style */}
          <div className={styles.photoGrid}>
            <div className={styles.photoMain}>
              <img src={LISTING_DATA.images[0]} alt={LISTING_DATA.title} />
            </div>
            <div className={styles.photoSecondary}>
              {LISTING_DATA.images.slice(1, 5).map((img, i) => (
                <div key={i} className={styles.photoItem}>
                  <img src={img} alt={`${LISTING_DATA.title} - View ${i + 2}`} />
                </div>
              ))}
            </div>
            <Link href="/photo-tour" className={styles.showAllPhotos}>
              <span className={styles.photoIcon}>⊞</span> Show all photos
            </Link>
          </div>

          {/* ── LISTING INFO ───────────────────────────────── */}
          <div className={styles.listingInfo}>

            {/* Overview intro */}
            <div className={styles.listingIntro}>
              <p className={styles.sectionLabel}>The Space</p>
              <h2 className={styles.sectionTitle}>
                Your Private Sky Retreat<br />
                <em>in Downtown Miami</em>
              </h2>
              <p className={styles.body}>
                Wake up on the 47th floor to breathtaking ocean and skyline views in this modern 2BR/2BA Downtown Miami condo. Step onto the private balcony and take in the city from above. Smart ambient lighting with preset moods for day and night. The space comfortably sleeps up to 6 guests and features stylish interiors designed for a relaxing stay. Enjoy resort-style amenities including a pool, gym, sauna, and more — located just steps from Miami&apos;s best dining, shopping, nightlife, and waterfront attractions.
              </p>
            </div>

            {/* Key features chips */}
            <div className={styles.featureChips}>
              {[
                { icon: "🛏️", label: "Sleeps 6" },
                { icon: "🌊", label: "Ocean & Skyline Views" },
                { icon: "🏙️", label: "47th Floor" },
                { icon: "🛁", label: "2 Beds · 2 Baths" },
                { icon: "🏊", label: "Pool & Sauna" },
                { icon: "📍", label: "Downtown Miami" },
              ].map((c) => (
                <div key={c.label} className={styles.chip}>
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>

            {/* Two-column: The Space + Key Features */}
            <div className={styles.listingGrid}>
              <div className={styles.listingCol}>
                <h3 className={styles.colTitle}>About the Space</h3>
                <p className={styles.body}>
                  Welcome to your bright and airy retreat on the 47th floor, where floor-to-ceiling windows showcase breathtaking panoramic views of the Miami skyline and ocean. The open-concept living space is filled with natural light and features a bold floral accent wall that adds a touch of tropical style to the modern design.
                </p>
                <p className={styles.body}>
                  Relax in the comfortable living area with a smart TV and convertible sofa bed, or step onto your private furnished balcony to take in the stunning views above the city. The fully equipped kitchen features stainless steel appliances, light wood cabinetry, and elegant terrazzo countertops — perfect for cooking or enjoying a quiet morning coffee.
                </p>
                <p className={styles.body}>
                  This condo is thoughtfully designed for a comfortable and seamless stay, ideal for couples, families, or small groups visiting Miami.
                </p>
              </div>

              <div className={styles.listingCol}>
                <h3 className={styles.colTitle}>Key Features</h3>
                <div className={styles.featureList}>
                  {[
                    "Sleeps up to 6 guests (1 king bed, 1 queen bed, convertible sofa bed)",
                    "Private furnished balcony with panoramic city & ocean views",
                    "High-speed Wi-Fi and central air conditioning",
                    "In-unit washer and dryer",
                    "Fully equipped kitchen with stainless steel appliances",
                    "Family-friendly amenities including crib and pack 'n play",
                  ].map((f) => (
                    <div key={f} className={styles.featureItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest Access */}
            <div className={styles.infoBlock}>
              <h3 className={styles.colTitle}>Guest Access</h3>
              <p className={styles.body}>
                Guests will have private and exclusive access to the entire 2-bedroom, 2-bathroom condo. The only space not accessible is a small locked owner&apos;s closet. Check-in is easy and convenient through the building&apos;s 24/7 front desk.
              </p>
              <p className={styles.body}>During your stay, you&apos;ll also have access to the building&apos;s resort-style amenities:</p>
              <div className={styles.featureList}>
                {[
                  "Expansive swimming pool with poolside bar",
                  "Second tranquil pool deck with lounge chairs",
                  "Wood-paneled sauna for relaxation",
                  "State-of-the-art fitness center and yoga studio",
                  "Stylish resident lounges for relaxing or socializing",
                ].map((f) => (
                  <div key={f} className={styles.featureItem}>
                    <span className={styles.checkmark}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className={styles.notesGrid}>
              <div className={styles.noteCard}>
                <span className={styles.noteIcon}>🏨</span>
                <h4 className={styles.noteTitle}>Resort Fee</h4>
                <p className={styles.noteBody}>A mandatory resort fee of $35/day is required at check-in. This provides access to all building amenities for registered guests.</p>
              </div>
              <div className={styles.noteCard}>
                <span className={styles.noteIcon}>🧳</span>
                <h4 className={styles.noteTitle}>Luggage Storage</h4>
                <p className={styles.noteBody}>The building does not offer luggage storage before check-in or after check-out. Please plan your arrival and departure accordingly.</p>
              </div>
              <div className={styles.noteCard}>
                <span className={styles.noteIcon}>💳</span>
                <h4 className={styles.noteTitle}>Outstanding Charges</h4>
                <p className={styles.noteBody}>Any charges incurred during your stay (such as valet) must be settled with the building before departure, or a $300 administrative fee will apply.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── AMENITIES ──────────────────────────────────── */}
      <AmenitiesSection />

      {/* ── REVIEWS ────────────────────────────────────── */}
      <section className={styles.reviews}>
        <div className="container">
          <p className={styles.sectionLabel}>What Guests Say</p>
          <h2 className={styles.sectionTitle}>
            ★ {LISTING_DATA.rating} · {LISTING_DATA.reviewCount} Reviews
          </h2>
          <div className={styles.reviewGrid}>
            {[
              {
                text: "The views were absolutely stunning — we woke up every morning to the most beautiful sunrise over the ocean. The condo was spotless and had everything we needed.",
                author: "Sarah M.",
                date: "March 2025",
              },
              {
                text: "Perfect location, incredible views, and Mike was a wonderful host. The building amenities were fantastic — we spent every afternoon at the pool. Will definitely return!",
                author: "James R.",
                date: "February 2025",
              },
              {
                text: "Exceptional stay. The 47th floor views are unlike anything else in Miami. The condo is modern, clean, and very well-equipped. Highly recommend booking direct!",
                author: "Camille D.",
                date: "January 2025",
              },
            ].map((r) => (
              <div key={r.author} className={styles.reviewCard}>
                <div className={styles.reviewStars}>★★★★★</div>
                <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                <div className={styles.reviewAuthor}>
                  <strong>{r.author}</strong> · {r.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECT BOOKING CTA ─────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox}>
            <p className={styles.sectionLabel} style={{ color: "var(--gold-lt)" }}>
              Skip the Platform Fees
            </p>
            <h2 className={styles.ctaTitle}>
              Book Direct &amp; Get the Best Rate
            </h2>
            <p className={styles.ctaBody}>
              By booking directly you avoid Airbnb service fees — saving up to 15%
              on your stay. Same seamless checkout, secure payment, and instant
              calendar confirmation.
            </p>
            <Link href="/booking" className={styles.btnPrimary}>
              Check Dates &amp; Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerLogo}>{LISTING_DATA.title}</p>
          <p className={styles.footerSub}>
            {LISTING_DATA.propertyType} · {LISTING_DATA.location} · Hosted by {LISTING_DATA.host.name}
          </p>
          <p className={styles.footerLinks}>
            <Link href="/booking">Book Direct</Link>
            {" · "}
            <a
              href="https://www.airbnb.com/rooms/1091400351345330535"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Airbnb
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
