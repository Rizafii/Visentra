"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Clock,
  MessageSquareQuote,
  Palette,
  Heart,
  Zap,
} from "lucide-react";
import type { GeminiResponse } from "@/lib/types";

interface BrandStrategyTabProps {
  result: GeminiResponse;
}

export function BrandStrategyTab({ result }: BrandStrategyTabProps) {
  const { brand_persona, waktu_posting_terbaik, key_message_brand } = result;

  return (
    <div className="space-y-6">
      <header className="flex flex-col items-start text-start">
        <h2 className="text-xl font-bold text-foreground">Strategi Brand</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Panduan lengkap untuk membangun brand Anda
        </p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Brand Persona */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              Brand Persona
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* Tone */}
              <div className="p-4 rounded-xl bg-muted space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm font-medium">Tone</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {brand_persona.tone}
                </p>
              </div>

              {/* Style */}
              <div className="p-4 rounded-xl bg-muted space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm font-medium">Style</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {brand_persona.style}
                </p>
              </div>

              {/* Karakter */}
              <div className="p-4 rounded-xl bg-muted space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm font-medium">Karakter</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {brand_persona.karakter}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Time to Post */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              Waktu Posting Terbaik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {waktu_posting_terbaik.map((time, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-base px-4 py-2 font-semibold"
                  >
                    🕐 {time}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Waktu optimal untuk menjangkau audiens target Anda
              </p>

              {/* Visual Time Bar */}
              <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 border-r border-background/20 ${
                        waktu_posting_terbaik.some((t) => {
                          const hour = Number.parseInt(t.split(":")[0]);
                          return hour === i;
                        })
                          ? "bg-primary"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Message */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <MessageSquareQuote className="w-5 h-5 text-amber-500" />
              </div>
              Key Message Brand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="relative">
              <div className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif">
                "
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed pl-6 pr-4 py-4 bg-muted rounded-xl italic">
                {key_message_brand}
              </p>
              <div className="absolute -bottom-4 right-4 text-4xl text-primary/20 font-serif rotate-180">
                "
              </div>
            </blockquote>
            <p className="text-sm text-muted-foreground mt-6">
              Gunakan pesan ini sebagai fondasi komunikasi brand Anda
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
