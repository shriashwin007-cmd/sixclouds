import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIXCLOUDS Gaming Cafe | Perambur, Chennai",
  description: "The ultimate gaming cafe in Perambur, Chennai. Private rooms, high-end setups, and non-stop action. Open 3 PM – 11 PM daily. 4.9★ on Google.",
  keywords: "gaming cafe, gaming centre, perambur, chennai, sixclouds, 6 clouds, private gaming room, gaming lounge near me, kennedy square",
  authors: [{ name: "SIXCLOUDS Gaming Cafe" }],
  openGraph: {
    title: "SIXCLOUDS Gaming Cafe — Game Above the Rest",
    description: "Private rooms. Premium setups. 4.9 stars. Perambur, Chennai. Book now.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
