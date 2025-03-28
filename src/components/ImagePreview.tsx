"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  imageUrl?: string;
  nameText?: string;
  fontSize?: number;
  textColor?: string;
  textPosition?: { x: number; y: number };
  rtl?: boolean;
}

const ImagePreview = ({
  imageUrl = "/eid-photo/eid.png", // Static image from public folder
  nameText = "اسمك هنا",
  fontSize = 40,
  textColor = "#ffffff",
  textPosition = { x: 50, y: 70 },
  rtl = true,
}: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    // For data URLs, no need to add timestamp
    const imgSrc = imageUrl.startsWith("data:")
      ? imageUrl
      : imageUrl.includes("?")
        ? `${imageUrl}&t=${new Date().getTime()}`
        : `${imageUrl}?t=${new Date().getTime()}`;

    img.src = imgSrc;

    img.onload = () => {
      // Set canvas dimensions based on loaded image - use higher resolution for better quality
      const aspectRatio = img.width / img.height;

      // For maximum quality, use the actual image dimensions if they're larger
      // but cap at an extremely high resolution for superior display and download quality
      let newWidth = Math.min(3600, img.width); // Ultra-high resolution for exceptional quality
      let newHeight = Math.floor(newWidth / aspectRatio);

      // If height is too large, adjust width instead but maintain ultra-high resolution
      if (newHeight > 2400) {
        newHeight = 2400;
        newWidth = Math.floor(newHeight * aspectRatio);
      }

      // Update dimensions state for display sizing
      setDimensions({ width: newWidth, height: newHeight });

      // Set actual canvas dimensions to the calculated size for high quality
      canvas.width = newWidth;
      canvas.height = newHeight;

      // Draw image
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Draw text with enhanced quality
      ctx.font = `${fontSize}px 'IBM Plex Arabic', Arial, sans-serif`; // Use IBM Plex Arabic font with fallbacks
      ctx.fillStyle = textColor;
      ctx.textAlign = rtl ? "right" : "left";
      ctx.textBaseline = "middle";

      // Enable maximum text anti-aliasing for ultra-smooth text rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // Remove shadow effects as requested
      ctx.lineJoin = "round";

      // Calculate position based on percentage
      const xPos = (textPosition.x / 100) * newWidth;
      const yPos = (textPosition.y / 100) * newHeight;

      // Add text with direction
      ctx.direction = rtl ? "rtl" : "ltr";
      ctx.fillText(nameText, xPos, yPos);
    };

    // Handle image loading errors
    img.onerror = () => {
      console.error("Error loading image:", imageUrl);

      // Try with a direct URL as fallback
      const fallbackUrl =
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
      console.log("Trying with fallback URL:", fallbackUrl);
      img.src = fallbackUrl;

      // Draw temporary message while loading fallback
      ctx.fillStyle = "#f8f9fa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#333333";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "16px 'IBM Plex Arabic', Arial, sans-serif";
      ctx.fillText("جاري تحميل الصورة...", canvas.width / 2, canvas.height / 2);
    };
  }, [imageUrl, nameText, fontSize, textColor, textPosition, rtl, dimensions]);

  return (
    <div className="w-full max-w-full sm:max-w-[500px] md:max-w-[600px] mx-auto">
      <div className="flex flex-col items-center">
        <div className="relative overflow-hidden rounded-lg shadow-lg border border-orange-200 dark:border-orange-900">
          <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            className="max-w-full h-auto"
          />
          {!imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-300">
              الرجاء اختيار صورة
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
