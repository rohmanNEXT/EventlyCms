import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/byMe/navbar";
import Footer from "../components/byMe/footer";
import Script from "next/script";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evently — Discover Events Worldwide",
  description:
    "Browse, search, and explore curated events from around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading... </div>}>
          <Navbar />
          <main className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-12 min-h-screen flex flex-col">
            {children}
          </main>
          <Footer />
        </Suspense>

        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="ISI_ID_UMAMI_KAMU"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}