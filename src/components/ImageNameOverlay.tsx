"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NameInputForm from "./NameInputForm";
import ImagePreview from "./ImagePreview";
import CustomizationPanel from "./CustomizationPanel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ImageNameOverlayProps {
  className?: string;
}

const ImageNameOverlay = ({ className = "" }: ImageNameOverlayProps) => {
  const [name, setName] = useState("اسمك هنا");
  const imageUrl = "/eid-photo/eid.png";
  const [fontSize, setFontSize] = useState(40);
  const [fontColor, setFontColor] = useState("#ffffff");
  const [position, setPosition] = useState({ x: 50, y: 49 });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const previewRef = useRef<HTMLDivElement>(null);

  const handleNameChange = (newName: string) => {
    setName(newName || "اسمك هنا");
  };

  const handleDownload = async () => {
    if (!name.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسمك أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (!previewRef.current) {
        throw new Error("لم يتم العثور على الصورة");
      }

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement("a");
      link.download = `eid-greeting-${name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      setShowSuccessDialog(true);

      toast({
        title: "تم التنزيل بنجاح",
        description: "تم حفظ الصورة بنجاح",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تنزيل الصورة",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`bg-background min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 ${className}`}>
      <Card className="w-full max-w-4xl mx-auto shadow-lg border border-orange-200 bg-white dark:bg-slate-900 dark:border-orange-900">
        <CardContent className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-6">
              <NameInputForm onNameChange={handleNameChange} />

              <CustomizationPanel
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontColor={fontColor}
                setFontColor={setFontColor}
                position={position}
                setPosition={setPosition}
              />

              {/* عرض الصورة على الشاشات الصغيرة */}
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

                <Button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="w-full h-12 text-lg modern-button mt-4"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري التنزيل...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      تنزيل الصورة
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* عرض الصورة على الشاشات الكبيرة */}
            <div className="space-y-6">
              <div className="hidden lg:block canvas-container" ref={previewRef}>
                <ImagePreview
                  imageUrl={imageUrl}
                  nameText={name}
                  fontSize={fontSize}
                  textColor={fontColor}
                  textPosition={position}
                  rtl={true}
                  showDecorations={false}
                />
              </div>

              <div className="hidden lg:block">
                <Button
                  onClick={handleDownload}
                  disabled={isLoading}
                  className="w-full h-12 text-lg modern-button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      جاري التنزيل...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      تنزيل الصورة
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* رسالة النجاح */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl gradient-text">
              كل عام وأنت بخير يا {name} 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="mt-4 modern-button"
            >
              شكراً لك
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
};

export default ImageNameOverlay;
