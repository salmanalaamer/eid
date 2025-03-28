"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface NameInputFormProps {
  onNameChange: (name: string) => void;
  className?: string;
}

const NameInputForm = ({
  onNameChange = () => {},
  className,
}: NameInputFormProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  // Image selection state removed as we're using a static image

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

  // Image selection handler removed as we're using a static image

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

        {/* Image selection section removed as we're using a static image */}
      </div>
    </div>
  );
};

export default NameInputForm;
