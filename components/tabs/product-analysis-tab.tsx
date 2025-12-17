"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Star, DollarSign } from "lucide-react"
import type { GeminiResponse } from "@/lib/types"

interface ProductAnalysisTabProps {
  result: GeminiResponse
  productImage: string
}

export function ProductAnalysisTab({ result, productImage }: ProductAnalysisTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Product Image */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square bg-muted flex items-center justify-center">
            <img src={productImage || "/placeholder.svg"} alt="Produk" className="w-full h-full object-contain p-4" />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Cards */}
      <div className="space-y-4">
        {/* Kategori Produk */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              Kategori Produk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {result.kategori_produk}
            </Badge>
          </CardContent>
        </Card>

        {/* Target Market */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-500" />
              </div>
              Target Market
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Usia</p>
                <p className="font-semibold text-sm">{result.target_market.usia}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Gender</p>
                <p className="font-semibold text-sm">{result.target_market.gender}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted">
                <p className="text-xs text-muted-foreground mb-1">Segment</p>
                <p className="font-semibold text-sm">{result.target_market.segment}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selling Points */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              Selling Point
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.selling_point.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Rekomendasi Harga */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              Rekomendasi Harga
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                Rp {result.rekomendasi_harga.min.toLocaleString("id-ID")}
              </Badge>
              <span className="text-muted-foreground">—</span>
              <Badge variant="outline" className="text-lg font-bold px-4 py-2">
                Rp {result.rekomendasi_harga.max.toLocaleString("id-ID")}
              </Badge>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-primary rounded-full"
                style={{ width: "70%" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
