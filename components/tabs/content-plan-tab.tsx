"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Check,
  ImageIcon,
  Sparkles,
  Loader2,
  Download,
  DownloadCloud,
} from "lucide-react";
import type { ContentDay } from "@/lib/types";

interface ContentPlanTabProps {
  contentPlan: ContentDay[];
  generatedImages: Record<number, string>;
  setGeneratedImages: React.Dispatch<
    React.SetStateAction<Record<number, string>>
  >;
}

export function ContentPlanTab({
  contentPlan,
  generatedImages,
  setGeneratedImages,
}: ContentPlanTabProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [editedCaptions, setEditedCaptions] = useState<Record<number, string>>(
    {}
  );
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);

  const handleCopy = async (
    text: string,
    hashtags: string[],
    index: number
  ) => {
    const fullText = `${text}\n\n${hashtags.join(" ")}`;
    await navigator.clipboard.writeText(fullText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = async (imageUrl: string, day: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `poster-hari-${day}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Gagal mendownload gambar");
    }
  };

  const handleCaptionChange = (index: number, value: string) => {
    setEditedCaptions((prev) => ({ ...prev, [index]: value }));
  };

  const getCaption = (index: number, originalCaption: string) => {
    return editedCaptions[index] ?? originalCaption;
  };

  const handleGeneratePoster = async (index: number, caption: string) => {
    setGeneratingIndex(index);
    try {
      // Create prompt for poster generation
      const prompt = `Professional social media poster design for: ${caption}. Modern, vibrant, eye-catching design with clear text and attractive visuals`;

      const response = await fetch("/api/generate-poster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          width: 768,
          height: 768,
          steps: 8,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate poster");
      }

      const data = await response.json();

      // Use result_url or preview from the API response
      if (data.image || data.result_url || data.preview) {
        const imageUrl = data.image || data.result_url || data.preview;
        setGeneratedImages((prev) => ({ ...prev, [index]: imageUrl }));
      } else {
        throw new Error("No image URL received from API");
      }
    } catch (error) {
      console.error("Error generating poster:", error);
      alert(
        `Gagal membuat poster: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setGeneratingIndex(null);
    }
  };

  const handleGenerateAllPosters = async () => {
    setIsGeneratingAll(true);
    const totalPosters = contentPlan.length;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < totalPosters; i++) {
      // Skip if already generated
      if (generatedImages[i]) {
        continue;
      }

      setGeneratingIndex(i);
      try {
        const caption = getCaption(i, contentPlan[i].caption);
        const prompt = `Professional social media poster design for: ${caption}. Modern, vibrant, eye-catching design with clear text and attractive visuals`;

        const response = await fetch("/api/generate-poster", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            width: 768,
            height: 768,
            steps: 8,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to generate poster");
        }

        const data = await response.json();

        if (data.image || data.result_url || data.preview) {
          const imageUrl = data.image || data.result_url || data.preview;
          setGeneratedImages((prev) => ({ ...prev, [i]: imageUrl }));
          successCount++;
        } else {
          throw new Error("No image URL received from API");
        }
      } catch (error) {
        console.error(`Error generating poster ${i + 1}:`, error);
        failCount++;
      }

      // Small delay between requests to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setGeneratingIndex(null);
    setIsGeneratingAll(false);

    // Show summary
    alert(`Generate selesai!\nBerhasil: ${successCount}\nGagal: ${failCount}`);
  };

  return (
    <div className="space-y-6">
      <header className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start text-start">
          <h2 className="text-xl font-bold text-foreground">
            Paket Konten 7 Hari
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Konten siap posting untuk seminggu penuh
          </p>
        </div>

        <div className="cta flex items-center gap-4">
          <Button size="lg" className="gap-2">
            <DownloadCloud size={18} />
            Download Semua Aset
          </Button>
          {/* Generate All Button */}
          <Button
            onClick={handleGenerateAllPosters}
            disabled={isGeneratingAll || generatingIndex !== null}
            size="lg"
            className="gap-2"
          >
            {isGeneratingAll ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating{" "}
                {generatingIndex !== null
                  ? `${(generatingIndex || 0) + 1}/${contentPlan.length}`
                  : "..."}
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Generate Semua Poster
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contentPlan.map((day, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {day.hari}
                  </span>
                  Hari {day.hari}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() =>
                    handleCopy(
                      getCaption(index, day.caption),
                      day.hashtag,
                      index
                    )
                  }
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              {/* Visual Placeholder / Generated Image */}
              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center relative overflow-hidden group">
                {generatedImages[index] ? (
                  <>
                    <img
                      src={generatedImages[index]}
                      alt={`Poster Hari ${day.hari}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleDownload(generatedImages[index], day.hari)
                        }
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleGeneratePoster(
                            index,
                            getCaption(index, day.caption)
                          )
                        }
                        disabled={generatingIndex === index}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-muted-foreground">
                    {generatingIndex === index ? (
                      <>
                        <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                        <p className="text-xs">Membuat poster...</p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() =>
                            handleGeneratePoster(
                              index,
                              getCaption(index, day.caption)
                            )
                          }
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Generate Poster
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Caption
                </label>
                <Textarea
                  value={getCaption(index, day.caption)}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  className="min-h-25 text-sm resize-none"
                />
              </div>

              {/* Hashtags */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Hashtags
                </label>
                <div className="flex flex-wrap gap-1">
                  {day.hashtag.slice(0, 4).map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="secondary"
                      className="text-xs font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {day.hashtag.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{day.hashtag.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
