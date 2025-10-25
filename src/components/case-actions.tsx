"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 1. Use Next.js router
import { Play, HelpCircle, ShoppingCart, Wand2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomizeModal, CustomizationData } from "@/components/customize-modal";

interface CaseActionsProps {
  slug: string;
}

const storageKey = (slug: string) => `coldcase_customization_${slug}`;

export const CaseActions: React.FC<CaseActionsProps> = ({ slug }) => {
  const router = useRouter(); // 1. Initialize the router
  const [isModalOpen, setModalOpen] = useState(false);
  const [customization, setCustomization] = useState<CustomizationData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) setCustomization(JSON.parse(raw));
    } catch (error) {
      // It's good practice to log errors, even if you don't act on them
      console.error("Failed to parse customization from localStorage", error);
    }
  }, [slug]);

  const handleSaveCustomization = (data: CustomizationData) => {
    setCustomization(data);
    // Note: The modal itself should handle saving to localStorage
  };

  const handlePlay = () => {
    const params = new URLSearchParams();
    if (customization?.location) params.set("loc", customization.location);
    if (customization?.characters?.length) params.set("chars", customization.characters.join("|"));
    
    // 1. Use router.push for a smoother, client-side navigation
    router.push(`/play/${slug}?${params.toString()}`);
  };

  return (
    <>
      {/* 2. Establish a clear visual hierarchy for actions */}
      <div className="flex flex-col gap-4">
        {/* --- Primary & Secondary Actions --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button size="lg" className="h-14 text-lg" onClick={() => console.log("Add to cart")}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <Button
              size="lg"
              variant="secondary" // Use a secondary style
              className="h-14 text-lg"
              onClick={() => setModalOpen(true)}
              aria-describedby={`customize-help-${slug}`}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              Customize
            </Button>
            <p id={`customize-help-${slug}`} className="text-xs text-muted-foreground px-2">
              Personalize names, locations & characters.
            </p>
          </div>
        </div>

        {/* --- Tertiary & Special Actions --- */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Button variant="ghost" onClick={() => console.log("Download")}>
            <Download className="mr-2 h-4 w-4" />
            Download Sample
          </Button>
          
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* 3. Recreate the special "Play" button */}
                <Button
                  variant="default" // You can create a custom variant in button.tsx for this gradient if you want
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                  onClick={handlePlay}
                  aria-label="Play case (Beta feature)"
                >
                  <Play size={16} className="mr-2" />
                  Play
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium bg-white/20 rounded px-1.5 py-0.5 uppercase">
                    Beta
                    <HelpCircle size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p>
                  Try the interactive in-browser version of this case. Explore evidence, read dossiers & track clues digitally. Features are experimental.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <CustomizeModal
        slug={slug}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCustomization}
      />
    </>
  );
};