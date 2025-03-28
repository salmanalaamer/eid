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
  fontColor = "#ffffff",
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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card
      className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200 dark:border-orange-900 shadow-lg hover:shadow-xl transition-all duration-300"
      dir="rtl"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-orange-700 dark:text-orange-300">
          {isMounted && <Palette className="h-6 w-6" />}
          تخصيص النص
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="space-y-4 border-b border-orange-200 dark:border-orange-800 pb-4">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-3">
            {isMounted && <Type className="h-5 w-5" />}
            <h3 className="font-medium text-lg">تخصيصات الخط</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="font-size"
                className="text-right text-orange-700 dark:text-orange-300 text-base"
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="font-color"
                className="text-right text-orange-700 dark:text-orange-300 text-base"
              >
                لون الخط
              </Label>
              <div
                className="w-8 h-8 rounded-full border-2 border-orange-200 dark:border-orange-800 shadow-sm"
                style={{ backgroundColor: fontColor }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Input
                id="font-color"
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-14 h-12 p-1 cursor-pointer border-orange-200 dark:border-orange-800 rounded-lg"
              />
              <Input
                type="text"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="flex-1 text-right dir-rtl border-orange-200 dark:border-orange-800 focus-visible:ring-orange-500 h-12 text-base"
                placeholder="#ffffff"
                dir="rtl"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-3">
            {isMounted && <MoveHorizontal className="h-5 w-5" />}
            <h3 className="font-medium text-lg">تخصيصات الموضع</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="position-x"
                className="text-right flex items-center gap-2 text-orange-700 dark:text-orange-300 text-base"
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="position-y"
                className="text-right flex items-center gap-2 text-orange-700 dark:text-orange-300 text-base"
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
