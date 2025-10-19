"use client";

import React, { useState, useEffect } from "react";
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
        className="w-full md:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition text-white font-semibold text-lg shadow-lg shadow-blue-600/30 cursor-pointer"
        onClick={handlePlay}
      >
        Play
      </button>
      <CustomizeModal slug={slug} isOpen={open} onClose={() => setOpen(false)} onSave={handleSave} />
    </div>
  );
};
