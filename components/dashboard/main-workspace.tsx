"use client";

import { useState } from "react";
import { UploadWorkspace } from "@/components/dashboard/upload-workspace";
import { ProcessingState } from "@/components/dashboard/processing-state";
import { ResultDashboard } from "@/components/dashboard/result-dashboard";
import type { GeminiResponse } from "@/lib/types";

export type WorkspaceState = "upload" | "processing" | "result";

export function MainWorkspace() {
  const [state, setState] = useState<WorkspaceState>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiResponse | null>(null);

  const handleStartAutopilot = async (image: string, productInfo: string) => {
    setUploadedImage(image);
    setState("processing");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, productInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze product");
      }

      const data = await response.json();
      setResult(data);
      setState("result");
    } catch (error) {
      console.error("[v0] Error analyzing product:", error);
      setState("upload");
    }
  };

  const handleReset = () => {
    setState("upload");
    setUploadedImage(null);
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {state === "upload" && (
        <UploadWorkspace onStartAutopilot={handleStartAutopilot} />
      )}
      {state === "processing" && <ProcessingState />}
      {state === "result" && result && uploadedImage && (
        <ResultDashboard
          result={result}
          productImage={uploadedImage}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
