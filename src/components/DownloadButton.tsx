"use client";

import React from "react";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import the Download icon with no SSR
const DownloadIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Download })),
  { ssr: false, loading: () => null },
);
import { cn } from "@/lib/utils";

interface DownloadButtonProps {
  imageRef?: React.RefObject<HTMLDivElement>;
  nameText?: string;
  isDisabled?: boolean;
  className?: string;
}

const DownloadButton = ({
  imageRef,
  nameText = "اسم المستخدم",
  isDisabled = false,
  className,
}: DownloadButtonProps) => {
  const handleDownload = async () => {
    if (!imageRef?.current) return;

    try {
      // Find the canvas element inside the container
      const canvasElement = imageRef.current.querySelector("canvas");
      if (!canvasElement) {
        throw new Error("Canvas element not found");
      }

      // Use the canvas directly instead of capturing the whole container
      const canvas = canvasElement;

      // Convert to data URL with absolute maximum quality
      // Using image/png for completely lossless quality with maximum settings
      // The second parameter (1.0) ensures maximum quality, though for PNG it's lossless anyway
      const dataUrl = canvas.toDataURL("image/png", 1.0);

      // For PNG format, we're using the highest quality settings possible

      // For PNG format, the second parameter is ignored but we're keeping the code
      // structured this way for consistency and future format changes if needed

      // Download the image
      const element = document.createElement("a");
      element.setAttribute("href", dataUrl);
      element.setAttribute("download", `عيد مونتاجكو ${nameText}.png`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      // Show success message
      // Using a more elegant approach than alert
      const successMessage = document.createElement("div");
      successMessage.style.position = "fixed";
      successMessage.style.top = "20px";
      successMessage.style.left = "50%";
      successMessage.style.transform = "translateX(-50%)";
      successMessage.style.backgroundColor = "#F97316"; // Orange color
      successMessage.style.color = "white";
      successMessage.style.padding = "15px 20px";
      successMessage.style.borderRadius = "5px";
      successMessage.style.zIndex = "1000";
      successMessage.style.fontFamily = "IBM Plex Arabic, Arial, sans-serif";
      successMessage.style.direction = "rtl";
      successMessage.textContent = "تم تنزيل الصورة بنجاح!";
      document.body.appendChild(successMessage);

      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    } catch (error) {
      console.error("Error downloading image:", error);
      // Show error message with the same style as success message
      const errorMessage = document.createElement("div");
      errorMessage.style.position = "fixed";
      errorMessage.style.top = "20px";
      errorMessage.style.left = "50%";
      errorMessage.style.transform = "translateX(-50%)";
      errorMessage.style.backgroundColor = "#F44336";
      errorMessage.style.color = "white";
      errorMessage.style.padding = "15px 20px";
      errorMessage.style.borderRadius = "5px";
      errorMessage.style.zIndex = "1000";
      errorMessage.style.fontFamily = "IBM Plex Arabic, Arial, sans-serif";
      errorMessage.style.direction = "rtl";
      errorMessage.textContent =
        "حدث خطأ أثناء تنزيل الصورة. يرجى المحاولة مرة أخرى.";
      document.body.appendChild(errorMessage);

      // Remove after 3 seconds
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("w-full max-w-xs mx-auto mt-4", className)}>
      <Button
        onClick={handleDownload}
        disabled={isDisabled}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        {isMounted && <DownloadIcon className="h-5 w-5" />}
        <span className="font-medium">تنزيل الصورة</span>
      </Button>
      <p className="text-center text-sm text-orange-600 mt-2 dark:text-orange-400">
        انقر للتنزيل بعد الانتهاء من التخصيص
      </p>
    </div>
  );
};

export default DownloadButton;
