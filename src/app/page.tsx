"use client";

import React from "react";
import ImageNameOverlay from "@/components/ImageNameOverlay";
import Image from "next/image";

// Metadata must be in a separate file for app router or in a server component
// Cannot export metadata from a client component

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 dark:bg-slate-900">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <header className="mb-4 sm:mb-6 md:mb-8 bg-orange-50 dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-900 p-3 sm:p-4 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="sm:ml-6 md:ml-12 relative order-1 sm:order-none">
              <Image
                src="/logo-orange.png"
                alt="مونتاجكو"
                width={100}
                height={100}
                priority
                className="object-contain"
              />
            </div>
            <div className="text-center flex-1 order-2 sm:order-none">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2 sm:mb-3">
                معايدة مونتاجكو لعيد الأضحى المبارك
              </h1>
              <p
                className="text-lg text-orange-700 dark:text-orange-300"
                dir="rtl"
              >
                أضف اسمك على صورة معايدة وقم بتنزيلها بسهولة
              </p>
            </div>
          </div>
        </header>

        <ImageNameOverlay />

        <footer className="mt-12 text-center text-sm text-orange-700 dark:text-orange-300">
          <p dir="rtl">
            جميع الحقوق محفوظة لمونتاجكو © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
