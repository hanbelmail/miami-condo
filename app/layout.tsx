// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export const metadata: Metadata = {
  title: "47th Floor Ocean & Skyline View Condo with Balcony — Miami Direct Booking",
  description:
    "Wake up on the 47th floor to breathtaking ocean and skyline views in this modern 2BR/2BA Downtown Miami condo. Sleeps 6 guests. Book direct and save on platform fees. ★4.95 rating from 21 reviews.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "47th Floor Ocean & Skyline View Condo with Balcony — Miami",
    description:
      "2BR/2BA luxury condo on the 47th floor with panoramic ocean and Miami skyline views. Private balcony, resort amenities, sleeps 6. Book direct for best rates.",
    url: siteUrl,
    siteName: "Miami Sky Condo",
    images: [
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTA5MTQwMDM1MTM0NTMzMDUzNQ%3D%3D/original/89aa41c8-57f6-44d9-909a-738ae3f6222d.jpeg",
        width: 1200,
        height: 630,
        alt: "47th Floor Miami condo balcony with ocean and skyline views",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "47th Floor Ocean & Skyline View Condo — Miami",
    description: "Book direct. 2BR/2BA luxury condo, panoramic Miami views, sleeps 6. ★4.95 rating.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ── Meta Pixel Base Code ───────────────────────── */}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
        {pixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}

        {/* ── Google Analytics 4 ────────────────────────── */}
        {ga4Id && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
        )}
        {ga4Id && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', {
                page_title: document.title,
                page_location: window.location.href
              });
            `}
          </Script>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
