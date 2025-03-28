"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveHorizontal, MoveVertical, Type, Palette } from "lucide-react";

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
  position = { x: 50, y: 50 },
  setPosition = () => {},
}: CustomizationPanelProps) => {
  const [activeTab, setActiveTab] = useState("font");

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handlePositionXChange = (value: number[]) => {
    setPosition({ ...position, x: value[0] });
  };

  const handlePositionYChange = (value: number[]) => {
    setPosition({ ...position, y: value[0] });
  };

  return (
    <Card className="w-full bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-900 shadow-sm overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center gap-2 text-orange-700 dark:text-orange-300">
          <Palette className="h-5 w-5" />
          تخصيص النص
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 bg-orange-100 dark:bg-orange-950">
            <TabsTrigger
              value="font"
              className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <Type className="h-4 w-4" />
              الخط
            </TabsTrigger>
            <TabsTrigger
              value="position"
              className="flex items-center gap-2 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <MoveHorizontal className="h-4 w-4" />
              الموضع
            </TabsTrigger>
          </TabsList>

          <TabsContent value="font" className="space-y-4">
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
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="position" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="position-x"
                  className="text-right flex items-center gap-1 text-orange-700 dark:text-orange-300"
                >
                  <MoveHorizontal className="h-4 w-4" />
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
                  <MoveVertical className="h-4 w-4" />
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomizationPanel;
