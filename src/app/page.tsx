"use client";

import React from "react";
import ImageNameOverlay from "@/components/ImageNameOverlay";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";

const SparklesIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Sparkles })),
  { ssr: false, loading: () => null },
);

const StarIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Star })),
  { ssr: false, loading: () => null },
);

const DownloadIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Download })),
  { ssr: false, loading: () => null },
);

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Morphing Background */}
      <div className="fixed inset-0 morphing-bg -z-10" />
      
      {/* Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full floating-element animate-morph" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full floating-element animate-morph" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/10 rounded-full floating-element animate-morph" />
      </div>

      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="relative">
          {/* Main Content */}
          <Card className="relative creative-card mb-4 sm:mb-6 md:mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#25A09B]/5 to-orange-400/5 animate-shimmer"></div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 p-4 sm:p-6 md:p-8 relative">
              <div className="sm:ml-6 md:ml-12 relative order-1 sm:order-none group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#25A09B] to-orange-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-slate-900 p-2 rounded-lg">
                  <Image
                    src="/logo-orange.png"
                    alt="مونتاجكو"
                    width={100}
                    height={100}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="text-center flex-1 order-2 sm:order-none space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                    معايدة مونتاجكو لعيد الفطر المبارك
                  </h1>
                  <SparklesIcon className="h-6 w-6 text-[#25A09B] animate-pulse" />
                </div>
                <p className="text-lg text-orange-700 dark:text-orange-300" dir="rtl">
                  أضف اسمك على صورة معايدة وقم بتنزيلها بسهولة
                </p>
              </div>
            </div>
          </Card>

          <ImageNameOverlay />

          <footer className="mt-12 text-center text-sm text-orange-700 dark:text-orange-300">
            <p dir="rtl">
              جميع الحقوق محفوظة لمونتاجكو © {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
