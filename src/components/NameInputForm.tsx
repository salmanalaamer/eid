"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import the AlertCircle icon with no SSR
const AlertCircleIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.AlertCircle })),
  { ssr: false, loading: () => null },
);

const PenSquareIcon = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.PenSquare })),
  { ssr: false, loading: () => null },
);

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setError("");
    if (value && !/[\u0600-\u06FF]/.test(value)) {
      setError("الرجاء إدخال اسم باللغة العربية");
    } else {
      onNameChange(value);
    }
  };

  return (
    <Card
      className={cn(
        "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-orange-200 dark:border-orange-900 shadow-lg hover:shadow-xl transition-all duration-300",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-orange-700 dark:text-orange-300">
          {isMounted && <PenSquareIcon className="h-6 w-6" />}
          تخصيص البطاقة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-right" dir="rtl">
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
              "text-right placeholder:text-right border-orange-200 dark:border-orange-800 focus-visible:ring-orange-500 h-12 text-lg transition-all duration-200",
              error && "border-red-500 focus-visible:ring-red-500",
            )}
            dir="rtl"
          />
          {error && isMounted && (
            <div className="flex items-center gap-2 text-red-500 text-sm mt-1 animate-fade-in">
              <AlertCircleIcon className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NameInputForm;
