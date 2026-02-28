"use client";

import { useState, type RefObject } from "react";
import { toPng } from "html-to-image";

export function useDownloadImage(ref: RefObject<HTMLDivElement | null>) {
  const [isGenerating, setIsGenerating] = useState(false);

  const download = async () => {
    if (!ref.current) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "fiona-review.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Image generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return { download, isGenerating };
}
