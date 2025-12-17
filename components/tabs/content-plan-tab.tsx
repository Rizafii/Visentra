"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ImageIcon } from "lucide-react"
import type { ContentDay } from "@/lib/types"

interface ContentPlanTabProps {
  contentPlan: ContentDay[]
}

export function ContentPlanTab({ contentPlan }: ContentPlanTabProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [editedCaptions, setEditedCaptions] = useState<Record<number, string>>({})

  const handleCopy = async (text: string, hashtags: string[], index: number) => {
    const fullText = `${text}\n\n${hashtags.join(" ")}`
    await navigator.clipboard.writeText(fullText)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCaptionChange = (index: number, value: string) => {
    setEditedCaptions((prev) => ({ ...prev, [index]: value }))
  }

  const getCaption = (index: number, originalCaption: string) => {
    return editedCaptions[index] ?? originalCaption
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-foreground">Paket Konten 7 Hari</h2>
        <p className="text-muted-foreground text-sm mt-1">Konten siap posting untuk seminggu penuh</p>
      </div>

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
                  onClick={() => handleCopy(getCaption(index, day.caption), day.hashtag, index)}
                >
                  {copiedIndex === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3">
              {/* Visual Placeholder */}
              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs">Poster Konten</p>
                </div>
              </div>

              {/* Caption */}
              <div className="flex-1">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Caption</label>
                <Textarea
                  value={getCaption(index, day.caption)}
                  onChange={(e) => handleCaptionChange(index, e.target.value)}
                  className="min-h-[100px] text-sm resize-none"
                />
              </div>

              {/* Hashtags */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Hashtags</label>
                <div className="flex flex-wrap gap-1">
                  {day.hashtag.slice(0, 4).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs font-normal">
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
  )
}
