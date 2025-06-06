"use client";

import { TempoInit } from "@/components/tempo-init";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// Using local IBM Plex Arabic font instead of Google Fonts
// Metadata is defined in metadata.ts for the root route

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo-orange.png" />
      </head>
      <body className="font-ibm-plex-arabic">
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
        {children}
        <SpeedInsights />
        <Analytics />
        <TempoInit />
      </body>
    </html>
  );
}
