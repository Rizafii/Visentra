"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Star, DollarSign } from "lucide-react";
import type { GeminiResponse } from "@/lib/types";

interface ProductAnalysisTabProps {
  result: GeminiResponse;
  productImage: string;
}

export function ProductAnalysisTab({
  result,
  productImage,
}: ProductAnalysisTabProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Identitas Produk */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="w-4 h-4 text-primary" />
            </div>
            Identitas Produk
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {/* Product Image */}
            <div className="w-40 h-40 bg-muted rounded-lg overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={productImage || "/placeholder.svg"}
                alt="Produk"
                className="w-full h-full object-contain p-2"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-3 flex flex-col items-start min-w-0">
              <div className="w-full">
                <p className="text-xs text-muted-foreground mb-1">
                  Nama Produk
                </p>
                <p className="font-semibold text-sm break-words">
                  {result.nama_produk}
                </p>
              </div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground mb-1">Deskripsi</p>
                <p className="text-sm text-foreground leading-relaxed break-words">
                  {result.deskripsi_produk}
                </p>
              </div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground mb-1">Kategori</p>
                <Badge
                  variant="secondary"
                  className="text-sm px-3 py-1 break-words whitespace-normal text-left"
                >
                  {result.kategori_produk}
                </Badge>
              </div>
            </div>
          </div>
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
              <p className="font-semibold text-sm">
                {result.target_market.usia}
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted">
              <p className="text-xs text-muted-foreground mb-1">Gender</p>
              <p className="font-semibold text-sm">
                {result.target_market.gender}
              </p>
            </div>
            <div className="text-center p-3 rounded-xl bg-muted">
              <p className="text-xs text-muted-foreground mb-1">Segment</p>
              <p className="font-semibold text-sm">
                {result.target_market.segment}
              </p>
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
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">
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
              className="h-full bg-linear-to-r from-green-500 to-primary rounded-full"
              style={{ width: "70%" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
