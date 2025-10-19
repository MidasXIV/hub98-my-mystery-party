"use client";

import React, { useState, useEffect } from "react";
import { Play } from "lucide-react";
import BetaBadge from "@/components/beta-badge";
import { CustomizeModal, CustomizationData } from "@/components/customize-modal";

interface CaseActionsProps {
  slug: string;
}

// Helper to read existing customization for play redirect enrichment
const storageKey = (slug: string) => `coldcase_customization_${slug}`;

export const CaseActions: React.FC<CaseActionsProps> = ({ slug }) => {
  const [open, setOpen] = useState(false);
  const [customization, setCustomization] = useState<CustomizationData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) setCustomization(JSON.parse(raw));
    } catch {}
  }, [slug]);

  const handleSave = (data: CustomizationData) => {
    setCustomization(data);
  };

  const handlePlay = () => {
    // Pass simple query params so play page can display personalization quickly
    const params = new URLSearchParams();
    if (customization?.location) params.set("loc", customization.location);
    if (customization?.characters?.length) params.set("chars", customization.characters.join("|"));
    window.location.href = `/play/${slug}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button type="button" tabIndex={0} className="w-full md:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition text-white font-semibold text-lg shadow-lg shadow-indigo-600/30 cursor-pointer">
        Add to Cart
      </button>
      <button type="button" tabIndex={0} className="w-full md:w-auto px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 active:bg-green-700 transition text-white font-semibold text-lg shadow-lg shadow-green-600/30 cursor-pointer">
        Download
      </button>
      <button
        type="button"
        tabIndex={0}
        className="w-full md:w-auto px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 transition text-white font-semibold text-lg shadow-lg shadow-purple-600/30 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Customize
      </button>
      <button
        type="button"
        tabIndex={0}
        aria-label="Play case (Beta feature)"
        className="relative w-full md:w-auto px-7 md:px-8 py-3.5 md:py-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:from-blue-700 active:to-blue-800 transition text-white font-semibold text-lg shadow-lg shadow-blue-600/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        onClick={handlePlay}
      >
        <span className="flex items-center justify-center gap-2">
          <Play size={18} className="opacity-90" />
          <span>Play</span>
        </span>
        <BetaBadge variant="corner" />
      </button>
      <CustomizeModal slug={slug} isOpen={open} onClose={() => setOpen(false)} onSave={handleSave} />
    </div>
  );
};
