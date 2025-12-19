"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  Search,
  Sparkles,
  CheckCircle2,
  Zap,
  Brain,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Eye,
    label: "Menganalisa Visual Produk",
    description: "Mengidentifikasi kategori dan karakteristik produk",
    completed: "Visual produk teranalisis",
  },
  {
    icon: Search,
    label: "Riset Pasar & Target Audience",
    description: "Menentukan target market dan positioning",
    completed: "Data pasar ditemukan",
  },
  {
    icon: Brain,
    label: "Menyusun Brand Strategy",
    description: "Membuat persona brand dan key message",
    completed: "Strategi brand siap",
  },
  {
    icon: Sparkles,
    label: "Generate Content & Copywriting",
    description: "Membuat caption, hashtag, dan konten 7 hari",
    completed: "Konten siap digunakan",
  },
];

export function ProcessingState() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const targetProgress = ((currentStep + 1) / steps.length) * 100;
        if (prev < targetProgress) {
          return Math.min(prev + 1, targetProgress);
        }
        return prev;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, [currentStep]);

  return (
    <div className="items-center justify-center m-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">
            AI Sedang Bekerja
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Kami sedang menganalisis produk Anda dan menyiapkan strategi
            marketing yang sempurna
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-lg mx-auto space-y-2">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary to-amber-500 transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round(progress)}% Selesai</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              AI Processing
            </span>
          </div>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const Icon = step.icon;

          return (
            <Card
              key={index}
              className={cn(
                "transition-all duration-500 hover:shadow-lg",
                isActive &&
                  "border-primary shadow-lg shadow-primary/10 scale-[1.02]",
                isCompleted && "border-green-500/50"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                      isActive &&
                        "bg-primary text-primary-foreground shadow-lg shadow-primary/30",
                      isCompleted && "bg-green-500 text-white",
                      !isActive &&
                        !isCompleted &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <Icon
                        className={cn("w-6 h-6", isActive && "animate-pulse")}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={cn(
                          "font-semibold",
                          isActive && "text-foreground",
                          isCompleted && "text-muted-foreground",
                          !isActive && !isCompleted && "text-muted-foreground"
                        )}
                      >
                        {step.label}
                      </h3>
                      {isActive && (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      )}
                    </div>
                    <p
                      className={cn(
                        "text-sm",
                        isActive && "text-muted-foreground",
                        isCompleted && "text-muted-foreground/60",
                        !isActive && !isCompleted && "text-muted-foreground/50"
                      )}
                    >
                      {isCompleted ? step.completed : step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
