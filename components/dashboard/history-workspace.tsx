"use client";

import { useState } from "react";
import { HistoryList } from "@/components/dashboard/history-list";
import { ResultDashboard } from "@/components/dashboard/result-dashboard";
import type { HistoryRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function HistoryWorkspace() {
  const [selectedHistory, setSelectedHistory] = useState<HistoryRecord | null>(
    null
  );

  const handleBack = () => {
    setSelectedHistory(null);
  };

  if (selectedHistory) {
    return (
      <div className="max-w-6xl mx-auto space-y-4">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Riwayat
        </Button>
        <ResultDashboard
          result={selectedHistory.result}
          productImage={selectedHistory.product_image}
          onReset={handleBack}
          historyId={selectedHistory.id}
          initialGeneratedImages={selectedHistory.generated_images}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Riwayat Generate</h1>
        <p className="text-muted-foreground">
          Lihat dan kelola semua hasil generate produk Anda
        </p>
      </div>
      <HistoryList onSelectHistory={setSelectedHistory} />
    </div>
  );
}
