"use client";

import React, { useState } from "react";
import { exportToMP4 } from "@/lib/exportUtils";
import { Download, Rocket } from "lucide-react";

type Props = {
  images: File[];
  transitionMode: "random" | string;
  duration: number;
};

export function ExportSection({ images, transitionMode, duration }: Props) {
  const [isExportingCPU, setIsExportingCPU] = useState(false);
  const [isExportingGPU, setIsExportingGPU] = useState(false);
  const [progress, setProgress] = useState(0);

  const disabled = images.length === 0 || isExportingCPU || isExportingGPU;

  async function handleExport(useGPU: boolean) {
    try {
      useGPU ? setIsExportingGPU(true) : setIsExportingCPU(true);
      setProgress(0);

      const blob = await exportToMP4(images, transitionMode, duration, useGPU, (p) =>
        setProgress(Math.round(p * 100))
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slideshow.mp4";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
      alert("Export failed. Ensure dependencies are installed and try again.");
    } finally {
      setIsExportingCPU(false);
      setIsExportingGPU(false);
      setProgress(0);
    }
  }

  return (
    <section className="rounded-lg border border-white/10 p-4 bg-white/5">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button
          type="button"
          onClick={() => handleExport(false)}
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 transition ${
            disabled ? "bg-white/10 text-white/30" : "bg-white/20 hover:bg-white/30"
          }`}
        >
          <Download className="h-4 w-4" />
          <span>Export MP4 (CPU)</span>
        </button>

        <button
          type="button"
          onClick={() => handleExport(true)}
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 transition ${
            disabled ? "bg-emerald-500/10 text-emerald-200/30" : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-100"
          }`}
        >
          <Rocket className="h-4 w-4" />
          <span>Export MP4 (GPU)</span>
        </button>

        {(isExportingCPU || isExportingGPU) && (
          <div className="ml-auto w-full md:w-64">
            <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white/70 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-white/60">{progress}%</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-white/50">
        Export will run in-browser with ffmpeg.wasm. GPU mode uses accelerated encoder if available.
      </p>
    </section>
  );
}
