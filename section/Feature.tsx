"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import {
  BarChart3,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";

const tabs = [
  { id: "insight", label: "Insight" },
  { id: "pricing", label: "Pricing" },
  { id: "quality", label: "Quality" },
];

const featureContent = {
  insight: {
    images: [
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
    ],
    imageClasses: [
      "w-42 h-58 object-cover rounded-r-[50px] rounded-bl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-br-[50px]",
      "w-42 h-58 object-cover rounded-r-[50px] rounded-tl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-tr-[50px]",
    ],
    features: [
      {
        icon: BarChart3,
        title: "Product Analysis",
        description:
          "Analisis produk secara detail untuk memahami kekuatan dan peluang brand-mu",
      },
      {
        icon: Target,
        title: "Competitor Insights",
        description:
          "Pelajari strategi kompetitor dan temukan celah pasar yang bisa kamu manfaatkan",
      },
      {
        icon: TrendingUp,
        title: "Market Trends",
        description:
          "Pantau tren pasar terkini untuk tetap selangkah lebih maju",
      },
    ],
  },
  pricing: {
    images: [
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
    ],
    imageClasses: [
      "w-42 h-58 object-cover rounded-r-[50px] rounded-bl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-br-[50px]",
      "w-42 h-58 object-cover rounded-r-[50px] rounded-tl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-tr-[50px]",
    ],
    features: [
      {
        icon: DollarSign,
        title: "Competitive Pricing",
        description:
          "Bandingkan harga dengan kompetitor untuk menentukan posisi terbaik",
      },
      {
        icon: Target,
        title: "Value-Based Pricing",
        description: "Hitung nilai produk berdasarkan benefit dan posisi pasar",
      },
      {
        icon: TrendingUp,
        title: "Price Optimization",
        description:
          "Rekomendasi harga optimal untuk maksimalkan profit dan market share",
      },
    ],
  },
  quality: {
    imageClasses: [
      "w-42 h-58 object-cover rounded-r-[50px] rounded-bl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-br-[50px]",
      "w-42 h-58 object-cover rounded-r-[50px] rounded-tl-[50px]",
      "w-42 h-58 object-cover rounded-l-[50px] rounded-tr-[50px]",
    ],
    images: [
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
      "/hero/hero.png",
    ],
    features: [
      {
        icon: CheckCircle2,
        title: "Brand Consistency",
        description: "Jaga konsistensi brand identity di semua touchpoint",
      },
      {
        icon: Zap,
        title: "Content Quality Check",
        description:
          "Validasi kualitas konten marketing sebelum dipublikasikan",
      },
      {
        icon: Target,
        title: "Performance Metrics",
        description: "Monitor performa brand dengan metrics yang actionable",
      },
    ],
  },
};

export default function Feature() {
  const [activeTab, setActiveTab] = useState("insight");
  const currentContent =
    featureContent[activeTab as keyof typeof featureContent];

  return (
    <section className="w-full">
      <div className="container mx-auto px-24 py-16">
        <div className="flex flex-col items-start gap-8">
          <header className="flex items-center justify-between w-full">
            <div className="left flex flex-col items-start gap-6">
              <h2 className="text-5xl font-bold leading-15">
                Brand<span className="text-primary">Force</span> <br />
                Feature
              </h2>
              <p className="max-w-120 font-medium text-lg leading-7 text-muted-foreground">
                Coba fitur BrandForce dan mulai bangun brand-mu dengan cara yang
                simpel.
              </p>
              <div className="flex items-center gap-3">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className="rounded-full"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="right grid grid-cols-4 gap-4">
              {currentContent.images.map((image, index) => (
                <Image
                  key={index}
                  alt={`feature-img-${index + 1}`}
                  src={image}
                  width={720}
                  height={720}
                  className={currentContent.imageClasses[index]}
                />
              ))}
            </div>
          </header>
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentContent.features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
