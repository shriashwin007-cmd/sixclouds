import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIXCLOUDS Gaming Cafe | Perambur, Chennai",
  description: "The ultimate gaming cafe experience in Perambur, Chennai. Private rooms, high-end gaming setups, and non-stop action. Open 3 PM – 11 PM.",
  keywords: "gaming cafe, gaming centre, perambur, chennai, sixclouds, 6 clouds, private gaming room, ps5, gaming lounge",
  openGraph: {
    title: "SIXCLOUDS Gaming Cafe",
    description: "Game like never before. Private rooms. Premium setups. Perambur, Chennai.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
