"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Upload, ImageIcon, Link2, Rocket, X, Tag } from "lucide-react";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadWorkspaceProps {
  onStartAutopilot: (image: string, productInfo: string) => void;
}

export function UploadWorkspace({ onStartAutopilot }: UploadWorkspaceProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState("");

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const handleSubmit = () => {
    if (uploadedImage) {
      onStartAutopilot(uploadedImage, productInfo);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-start space-y-2 flex flex-col items-start">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          AI UMKM Autopilot
        </h1>
        <p className="text-muted-foreground ">
          Upload foto produk Anda dan biarkan AI menghasilkan strategi marketing
          yang lengkap
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left - Upload Card */}
        <Card className="border-2 border-dashed border-border bg-card">
          <CardContent className="p-6">
            {!uploadedImage ? (
              <div
                className={cn(
                  "relative rounded-xl transition-colors cursor-pointer",
                  dragActive ? "bg-primary/5" : "hover:bg-muted/50"
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center py-12 lg:py-16 gap-4">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors",
                      dragActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Upload className="w-8 h-8" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">
                      Upload Foto Produk
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Drag & drop atau klik untuk upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Format: JPG, PNG
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Preview produk"
                    className="w-full h-full object-contain"
                  />
                </div>
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                  <ImageIcon className="w-4 h-4" />
                  <span>Foto produk siap dianalisis</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right - Product Info & Button */}
        <div className="space-y-6 flex flex-col">
          <Card className="">
            <CardContent className="p-6 h-full flex flex-col justify-center gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="productInfo"
                  className="flex items-center gap-2"
                >
                  <Tag className="w-4 h-4" />
                  Nama Produk *
                </Label>
                <Input
                  id="productInfo"
                  placeholder="Contoh : Keripik Singkong"
                  value={productInfo}
                  onChange={(e) => setProductInfo(e.target.value)}
                  className="bg-background"
                />
              </div>
              {/* CTA Button */}
              <Button
                onClick={handleSubmit}
                disabled={!uploadedImage}
                size="lg"
                className="w-full h-14 text-lg font-semibold gap-3"
              >
                <Rocket className="w-5 h-5" />
                Mulai Autopilot
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
