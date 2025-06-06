"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Dynamically import Lucide icons with no SSR to prevent hydration errors
const Palette = dynamic(async () => (await import("lucide-react")).Palette, {
  ssr: false,
  loading: () => null,
});
const Type = dynamic(async () => (await import("lucide-react")).Type, {
  ssr: false,
  loading: () => null,
});
const MoveHorizontal = dynamic(
  async () => (await import("lucide-react")).MoveHorizontal,
  {
    ssr: false,
    loading: () => null,
  },
);
const MoveVertical = dynamic(
  async () => (await import("lucide-react")).MoveVertical,
  {
    ssr: false,
    loading: () => null,
  },
);

interface CustomizationPanelProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  fontColor: string;
  setFontColor: (color: string) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

const CustomizationPanel = ({
  fontSize = 60,
  setFontSize = () => {},
  fontColor = "#F06045",
  setFontColor = () => {},
  position = { x: 50, y: 49 },
  setPosition = () => {},
}: CustomizationPanelProps) => {
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handlePositionXChange = (value: number[]) => {
    setPosition({ ...position, x: value[0] });
  };

  const handlePositionYChange = (value: number[]) => {
    setPosition({ ...position, y: value[0] });
  };

  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card
      className="w-full bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-900 shadow-sm overflow-hidden"
      dir="rtl"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-orange-700 dark:text-orange-300">
          {isMounted && <Palette className="h-5 w-5" />}
          تخصيص النص
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6 space-y-6">
        <div className="space-y-4 border-b border-orange-200 dark:border-orange-800 pb-4">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-2">
            {isMounted && <Type className="h-5 w-5" />}
            <h3 className="font-medium">تخصيصات الخط</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="font-size"
                className="text-right text-orange-700 dark:text-orange-300"
              >
                حجم الخط: {fontSize}px
              </Label>
            </div>
            <Slider
              id="font-size"
              min={12}
              max={150}
              step={1}
              value={[fontSize]}
              onValueChange={handleFontSizeChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="font-color"
                className="text-right text-orange-700 dark:text-orange-300"
              >
                لون الخط
              </Label>
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: fontColor }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                id="font-color"
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer border-orange-200 dark:border-orange-800"
              />
              <Input
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="flex-1 text-right dir-rtl border-orange-200 dark:border-orange-800 focus-visible:ring-orange-500"
                placeholder="#ffffff"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-2">
            {isMounted && <MoveHorizontal className="h-5 w-5" />}
            <h3 className="font-medium">تخصيصات الموضع</h3>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="position-x"
                className="text-right flex items-center gap-1 text-orange-700 dark:text-orange-300"
              >
                {isMounted && <MoveHorizontal className="h-4 w-4" />}
                الموضع الأفقي: {position.x}%
              </Label>
            </div>
            <Slider
              id="position-x"
              min={0}
              max={100}
              step={1}
              value={[position.x]}
              onValueChange={handlePositionXChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="position-y"
                className="text-right flex items-center gap-1 text-orange-700 dark:text-orange-300"
              >
                {isMounted && <MoveVertical className="h-4 w-4" />}
                الموضع الرأسي: {position.y}%
              </Label>
            </div>
            <Slider
              id="position-y"
              min={0}
              max={100}
              step={1}
              value={[position.y]}
              onValueChange={handlePositionYChange}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationPanel;
