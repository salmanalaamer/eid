import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// Using local IBM Plex Arabic font instead of Google Fonts

// Metadata is now imported from metadata.ts
// This metadata will be overridden by the one in metadata.ts for the root route
export const metadata: Metadata = {
  title: "معايدة مونتاجكو لعيد الفطر المبارك",
  description: "أداة لإضافة اسمك على صور معايدة عيد الفطر وتنزيلها",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>{/* Using local IBM Plex Arabic font */}</head>
      <body className="font-ibm-plex-arabic">
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
        {children}
        <TempoInit />
      </body>
    </html>
  );
}
