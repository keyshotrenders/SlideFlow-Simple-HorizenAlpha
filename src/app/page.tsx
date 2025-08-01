"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ImageUploader";
import { TransitionSelect } from "@/components/TransitionSelect";
import { SlidePreview } from "@/components/SlidePreview";
import { ExportSection } from "@/components/ExportSection";

export default function SlideshowMaker() {
  const [images, setImages] = useState<File[]>([]);
  const [transitionMode, setTransitionMode] = useState<"random" | string>("random");
  const [duration, setDuration] = useState<number>(3);

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold">SlideFlow Simple</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <ImageUploader images={images} onChange={setImages} />
            <div className="rounded-lg border border-white/10 p-4 bg-white/5">
              <label className="block text-sm mb-2">Duration (seconds)</label>
              <input
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <TransitionSelect
              value={transitionMode}
              onChange={setTransitionMode}
            />
          </div>

          <div className="md:col-span-2">
            <SlidePreview
              images={images}
              transitionMode={transitionMode}
              duration={duration}
            />
          </div>
        </section>

        <ExportSection
          images={images}
          transitionMode={transitionMode}
          duration={duration}
        />
      </main>
    </div>
  );
}
