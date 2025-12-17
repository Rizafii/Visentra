"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RotateCcw, Package, CalendarDays, Lightbulb } from "lucide-react"
import { ProductAnalysisTab } from "@/components/tabs/product-analysis-tab"
import { ContentPlanTab } from "@/components/tabs/content-plan-tab"
import { BrandStrategyTab } from "@/components/tabs/brand-strategy-tab"
import type { GeminiResponse } from "@/lib/types"

interface ResultDashboardProps {
  result: GeminiResponse
  productImage: string
  onReset: () => void
}

export function ResultDashboard({ result, productImage, onReset }: ResultDashboardProps) {
  const [activeTab, setActiveTab] = useState("analysis")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hasil Analisis AI</h1>
          <p className="text-muted-foreground">Strategi marketing untuk produk Anda sudah siap</p>
        </div>
        <Button variant="outline" onClick={onReset} className="gap-2 bg-transparent">
          <RotateCcw className="w-4 h-4" />
          Analisis Baru
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-muted">
          <TabsTrigger value="analysis" className="gap-2 py-3 data-[state=active]:bg-background">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Analisa Produk</span>
            <span className="sm:hidden">Analisa</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2 py-3 data-[state=active]:bg-background">
            <CalendarDays className="w-4 h-4" />
            <span className="hidden sm:inline">Paket Konten 7 Hari</span>
            <span className="sm:hidden">Konten</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="gap-2 py-3 data-[state=active]:bg-background">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Strategi Brand</span>
            <span className="sm:hidden">Strategi</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="mt-6">
          <ProductAnalysisTab result={result} productImage={productImage} />
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <ContentPlanTab contentPlan={result.paket_konten_7_hari} />
        </TabsContent>

        <TabsContent value="strategy" className="mt-6">
          <BrandStrategyTab result={result} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
