"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Eye, Search, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    icon: Eye,
    label: "Menganalisa Visual Produk...",
    completed: "Visual produk teranalisis",
  },
  {
    icon: Search,
    label: "Mencari Kompetitor & Posisi Pasar...",
    completed: "Data pasar ditemukan",
  },
  {
    icon: Sparkles,
    label: "Meracik Copywriting, Hashtag & Strategi Brand...",
    completed: "Strategi siap",
  },
]

export function ProcessingState() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-foreground">AI sedang bekerja...</h2>
        <p className="text-muted-foreground">Mohon tunggu sebentar, kami sedang menganalisis produk Anda</p>
      </div>

      {/* Steps */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {steps.map((step, index) => {
            const isActive = index === currentStep
            const isCompleted = index < currentStep
            const Icon = step.icon

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                  isActive && "bg-primary/5",
                  isCompleted && "opacity-60",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-green-500/10 text-green-500",
                    !isActive && !isCompleted && "bg-muted text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={cn(
                      "font-medium",
                      isActive && "text-foreground",
                      isCompleted && "text-muted-foreground line-through",
                      !isActive && !isCompleted && "text-muted-foreground",
                    )}
                  >
                    {isCompleted ? step.completed : step.label}
                  </p>
                </div>
                {isActive && (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Skeleton Preview */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-4">
            <Skeleton className="w-24 h-24 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
