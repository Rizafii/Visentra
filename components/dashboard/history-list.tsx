"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Package,
  Trash2,
  Eye,
  Loader2,
  ImageIcon,
} from "lucide-react";
import type { HistoryRecord } from "@/lib/types";

interface HistoryListProps {
  onSelectHistory: (history: HistoryRecord) => void;
}

export function HistoryList({ onSelectHistory }: HistoryListProps) {
  const [histories, setHistories] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistories();
  }, []);

  const fetchHistories = async () => {
    try {
      const response = await fetch("/api/history");
      if (response.ok) {
        const data = await response.json();
        setHistories(data.data);
      }
    } catch (error) {
      console.error("Error fetching histories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Hapus riwayat ini?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/history/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setHistories(histories.filter((h) => h.id !== id));
      }
    } catch (error) {
      console.error("Error deleting history:", error);
      alert("Gagal menghapus riwayat");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Belum Ada Riwayat</h3>
        <p className="text-muted-foreground">
          Generate produk pertama Anda untuk melihat riwayat
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {histories.map((history) => {
        const posterCount = history.generated_images
          ? Object.keys(history.generated_images).length
          : 0;

        return (
          <Card
            key={history.id}
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => onSelectHistory(history)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-sm line-clamp-2 mb-2">
                    {history.product_info.substring(0, 60)}
                    {history.product_info.length > 60 && "..."}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {formatDate(history.created_at)}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Product Image */}
              <div className="aspect-video rounded-lg bg-muted overflow-hidden">
                <img
                  src={history.product_image}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {history.result.kategori_produk}
                  </Badge>
                  {posterCount > 0 && (
                    <Badge variant="outline" className="text-xs gap-1">
                      <ImageIcon className="w-3 h-3" />
                      {posterCount}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onSelectHistory(history)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Lihat
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => handleDelete(history.id, e)}
                  disabled={deletingId === history.id}
                >
                  {deletingId === history.id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Trash2 className="w-3 h-3" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
