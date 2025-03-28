"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import dynamic from "next/dynamic";

const ImageIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Image })),
  { ssr: false, loading: () => null },
);

interface ImagePreviewProps {
  imageUrl?: string;
  nameText?: string;
  fontSize?: number;
  textColor?: string;
  textPosition?: { x: number; y: number };
  rtl?: boolean;
  showDecorations?: boolean;
}

const ImagePreview = ({
  imageUrl = "/eid-photo/eid.png",
  nameText = "اسمك هنا",
  fontSize = 40,
  textColor = "#ffffff",
  textPosition = { x: 50, y: 70 },
  rtl = true,
  showDecorations = true,
}: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    const imgSrc = imageUrl.startsWith("data:")
      ? imageUrl
      : imageUrl.includes("?")
        ? `${imageUrl}&t=${new Date().getTime()}`
        : `${imageUrl}?t=${new Date().getTime()}`;

    img.src = imgSrc;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      let newWidth = Math.min(3600, img.width);
      let newHeight = Math.floor(newWidth / aspectRatio);

      if (newHeight > 2400) {
        newHeight = 2400;
        newWidth = Math.floor(newHeight * aspectRatio);
      }

      setDimensions({ width: newWidth, height: newHeight });
      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      ctx.font = `${fontSize}px 'IBM Plex Arabic', Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.textAlign = rtl ? "right" : "left";
      ctx.textBaseline = "middle";

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.lineJoin = "round";

      const xPos = (textPosition.x / 100) * newWidth;
      const yPos = (textPosition.y / 100) * newHeight;

      ctx.direction = rtl ? "rtl" : "ltr";
      ctx.fillText(nameText, xPos, yPos);
    };

    img.onerror = () => {
      console.error("Error loading image:", imageUrl);
      const fallbackUrl =
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80";
      console.log("Trying with fallback URL:", fallbackUrl);
      img.src = fallbackUrl;

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
      <Card className={cn(
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200 dark:border-orange-900 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden",
        !showDecorations && "border-0 shadow-none bg-transparent"
      )}>
        <CardContent className={cn("p-4", !showDecorations && "p-0")}>
          <div className="flex flex-col items-center">
            <div className={cn(
              "relative overflow-hidden rounded-lg shadow-md border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950",
              !showDecorations && "border-0 shadow-none bg-transparent rounded-none"
            )}>
              <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
                className={cn(
                  "max-w-full h-auto transition-all duration-300",
                  !showDecorations && "w-full h-full"
                )}
              />
              {!imageUrl && showDecorations && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-50/80 dark:bg-orange-950/80 text-orange-500 dark:text-orange-300 p-4">
                  {isMounted && <ImageIcon className="h-12 w-12 mb-2" />}
                  <span className="text-lg font-medium">الرجاء اختيار صورة</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImagePreview;
