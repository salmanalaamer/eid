"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NameInputForm from "./NameInputForm";
import ImagePreview from "./ImagePreview";
import CustomizationPanel from "./CustomizationPanel";
import DownloadButton from "./DownloadButton";
// import { toPng } from "html-to-image";

interface ImageNameOverlayProps {
  className?: string;
}

const ImageNameOverlay = ({ className = "" }: ImageNameOverlayProps) => {
  const [name, setName] = useState("اسمك هنا");
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  );
  // Default image that can be replaced by user upload
  const [fontSize, setFontSize] = useState(40);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 50, y: 70 });

  const [isImageSelected, setIsImageSelected] = useState(true); // Set to true since we have a default image

  const previewRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (newName: string) => {
    setName(newName || "اسمك هنا");
  };

  const handleImageSelect = (file: File) => {
    // Create a FileReader to read the file as a data URL for high quality
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
        setIsImageSelected(true);
      }
    };
    reader.readAsDataURL(file);
  };

  // This function is not used, we're using the one in DownloadButton component instead

  return (
    <div
      className={`bg-background min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 ${className}`}
    >
      <Card className="w-full max-w-4xl mx-auto shadow-lg border border-orange-200 bg-white dark:bg-slate-900 dark:border-orange-900">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-6">
              <NameInputForm
                onNameChange={handleNameChange}
                onImageSelect={handleImageSelect}
              />

              <CustomizationPanel
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontColor={fontColor}
                setFontColor={setFontColor}
                position={position}
                setPosition={setPosition}
              />

              <div className="lg:hidden">
                <div ref={previewRef} className="canvas-container">
                  <ImagePreview
                    imageUrl={imageUrl}
                    nameText={name}
                    fontSize={fontSize}
                    textColor={fontColor}
                    textPosition={position}
                    rtl={true}
                  />
                </div>

                <DownloadButton
                  imageRef={previewRef}
                  nameText={name}
                  isDisabled={!isImageSelected || !name}
                  className="mt-4"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div
                className="hidden lg:block canvas-container"
                ref={previewRef}
              >
                <ImagePreview
                  imageUrl={imageUrl}
                  nameText={name}
                  fontSize={fontSize}
                  textColor={fontColor}
                  textPosition={position}
                  rtl={true}
                />
              </div>

              <div className="hidden lg:block">
                <DownloadButton
                  imageRef={previewRef}
                  nameText={name}
                  isDisabled={!isImageSelected || !name}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageNameOverlay;
