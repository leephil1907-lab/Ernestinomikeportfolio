import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ernestachuka.com"),
  title: "Ernest Achuka — Founder & Product Builder",
  description: "Ernest Achuka builds digital products, intelligent systems and technology experiences for ambitious businesses.",
  alternates: { canonical: "/" },
  openGraph: { title: "Ernest Achuka — Founder & Product Builder", description: "Building what moves businesses forward.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${inter.variable} ${space.variable}`}>{children}<Analytics /></body></html>;
}