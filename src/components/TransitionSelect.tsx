"use client";

import React from "react";
import { TRANSITION_EFFECTS } from "@/lib/transitions";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function TransitionSelect({ value, onChange }: Props) {
  return (
    <div className="rounded-lg border border-white/10 p-4 bg-white/5">
      <label className="block text-sm mb-2">Transition</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-black/40 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
      >
        <option value="random">Random</option>
        {TRANSITION_EFFECTS.map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs text-white/60">
        Choose a specific effect or Random to cycle across all.
      </p>
    </div>
  );
}
