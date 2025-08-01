"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getRandomTransition, type TransitionKey } from "@/lib/transitions";

type Props = {
  images: File[];
  transitionMode: "random" | string;
  duration: number; // seconds per slide
};

function useObjectURLs(files: File[]) {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    const u = files.map((f) => URL.createObjectURL(f));
    setUrls(u);
    return () => {
      u.forEach((x) => URL.revokeObjectURL(x));
    };
  }, [files]);
  return urls;
}

const basicVariants: Record<
  "crossFade" | "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "zoomIn" | "zoomOut",
  any
> = {
  crossFade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideLeft: {
    initial: { x: "100%", opacity: 0.9 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0.9 },
  },
  slideRight: {
    initial: { x: "-100%", opacity: 0.9 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0.9 },
  },
  slideUp: {
    initial: { y: "100%", opacity: 0.9 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0.9 },
  },
  slideDown: {
    initial: { y: "-100%", opacity: 0.9 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0.9 },
  },
  zoomIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.05, opacity: 0 },
  },
  zoomOut: {
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  },
};

function pickVariant(key: string): keyof typeof basicVariants {
  if (key in basicVariants) return key as keyof typeof basicVariants;
  // Map some aliases to existing basics for now
  switch (key) {
    case "fadeToBlack":
    case "fadeToWhite":
    case "radialFade":
    case "gradientFade":
    case "blurFade":
    case "pixelateFade":
    case "glitchFade":
      return "crossFade";
    case "pushLeft":
    case "diagonalSlideTL":
      return "slideLeft";
    case "pushRight":
    case "diagonalSlideBR":
      return "slideRight";
    case "pushUp":
      return "slideUp";
    case "pushDown":
      return "slideDown";
    case "kenBurnsLeft":
    case "kenBurnsRight":
    case "kenBurnsUp":
    case "kenBurnsDown":
    case "elasticZoom":
    case "spiralZoom":
      return "zoomIn";
    default:
      return "crossFade";
  }
}

export function SlidePreview({ images, transitionMode, duration }: Props) {
  const urls = useObjectURLs(images);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const transitions: TransitionKey[] = useMemo(() => {
    if (!urls.length) return [];
    if (transitionMode === "random") {
      return urls.map(() => getRandomTransition());
    }
    return urls.map(() => transitionMode as TransitionKey);
  }, [urls, transitionMode]);

  useEffect(() => {
    if (!urls.length) return;
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, Math.max(0.2, duration) * 1000) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [urls, duration]);

  const currentUrl = urls[index];
  const key = transitions[index] ?? "crossFade";
  const variantKey = pickVariant(key);
  const transition = { duration: Math.min(Math.max(duration * 0.5, 0.2), 2.0), ease: "easeInOut" };

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/30 flex items-center justify-center">
      {!urls.length ? (
        <div className="text-white/60 text-sm">Add images to preview the slideshow</div>
      ) : (
        <div className="relative h-full w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentUrl}
              src={currentUrl}
              alt="slide"
              className="absolute inset-0 h-full w-full object-contain select-none"
              initial={basicVariants[variantKey].initial}
              animate={basicVariants[variantKey].animate}
              exit={basicVariants[variantKey].exit}
              transition={transition}
              draggable={false}
            />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
