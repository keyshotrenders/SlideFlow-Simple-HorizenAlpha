"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

type Props = {
  images: File[];
  onChange: (files: File[]) => void;
};

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/heic",
  "image/heif",
  "image/tiff",
  "image/bmp",
];

export function ImageUploader({ images, onChange }: Props) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const valid = accepted.filter((f) => SUPPORTED_FORMATS.includes(f.type));
      if (valid.length) onChange([...images, ...valid]);
    },
    [images, onChange]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: SUPPORTED_FORMATS.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div className="rounded-lg border border-white/10 bg-white/5">
      <div
        {...getRootProps()}
        className={`p-6 rounded-lg text-center cursor-pointer transition ${
          isDragActive ? "bg-white/10" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center gap-3 mb-3">
          <Upload className="h-5 w-5 text-white/70" />
          <span className="text-sm text-white/80">Import Images</span>
        </div>
        <p className="text-xs text-white/60">
          Drag & drop images here, or{" "}
          <button
            type="button"
            onClick={open}
            className="underline underline-offset-2 hover:text-white/90"
          >
            browse
          </button>
        </p>
        <p className="mt-2 text-[11px] text-white/50">
          Supported: JPEG, PNG, GIF, WebP, SVG, HEIC/HEIF, TIFF, BMP
        </p>
        {images.length > 0 && (
          <p className="mt-3 text-xs text-white/70">{images.length} image(s) selected</p>
        )}
      </div>
    </div>
  );
}
