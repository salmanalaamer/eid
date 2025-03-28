"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface NameInputFormProps {
  onNameChange: (name: string) => void;
  onImageSelect: (file: File) => void;
  className?: string;
}

const NameInputForm = ({
  onNameChange = () => {},
  onImageSelect = () => {},
  className,
}: NameInputFormProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    // Clear previous errors
    setError("");

    // Basic validation for Arabic text
    if (value && !/[\u0600-\u06FF]/.test(value)) {
      setError("الرجاء إدخال اسم باللغة العربية");
    } else {
      onNameChange(value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      onImageSelect(file);
    }
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-slate-900 p-3 sm:p-4 md:p-6 rounded-lg shadow-md border border-orange-200 dark:border-orange-900",
        className,
      )}
    >
      <div className="space-y-4 text-right" dir="rtl">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-right block text-lg font-medium text-orange-700 dark:text-orange-300"
          >
            أدخل اسمك
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="اكتب اسمك هنا"
            className={cn(
              "text-right placeholder:text-right border-orange-200 dark:border-orange-800 focus-visible:ring-orange-500",
              error && "border-red-500 focus-visible:ring-red-500",
            )}
            dir="rtl"
          />
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="image"
            className="text-right block text-lg font-medium text-orange-700 dark:text-orange-300"
          >
            اختر صورة
          </Label>
          <div className="flex flex-col items-end gap-2">
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-right file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 border-orange-200 dark:border-orange-800"
              dir="rtl"
            />
            <p className="text-sm text-orange-600 dark:text-orange-400 text-right">
              اختر صورة عالية الجودة للحصول على أفضل النتائج
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInputForm;
