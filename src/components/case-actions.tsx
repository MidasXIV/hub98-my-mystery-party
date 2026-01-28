"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 1. Use Next.js router
import { Play, HelpCircle, ShoppingCart, Wand2, Download, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomizeModal, CustomizationData } from "@/components/customize-modal";
import { getCaseBySlug } from "@/data/coldCases";

// Compact roadmap hint callout (renders only when action unsupported)
const RoadmapHint: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="group mt-1 flex items-start gap-2 rounded-md border border-dashed border-muted-foreground/30 bg-muted/30 px-3 py-2 text-xs text-muted-foreground backdrop-blur-sm">
    <Lightbulb className="mt-[2px] h-4 w-4 text-yellow-500 group-hover:rotate-3 transition-transform" />
    <p className="leading-relaxed">
      {children || (
        <>
          This action isn&apos;t enabled yet. Influence priority—
          <a
            href="/roadmap"
            className="font-medium text-foreground underline decoration-dashed underline-offset-2 hover:text-primary"
          >
            vote on the feature roadmap
          </a>
          .
        </>
      )}
    </p>
  </div>
);

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

  const coldCase = getCaseBySlug(slug);
  const isPurchasable = coldCase?.isPurchasable ?? true;
  const hasDownloadSample = coldCase?.hasDownloadSample ?? true;
  const isPlayable = coldCase?.isPlayable ?? false;

  return (
    <>
      {/* 2. Establish a clear visual hierarchy for actions */}
      <div className="flex flex-col gap-4">
        {/* --- Primary & Secondary Actions --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <Button
              size="lg"
              onClick={() => isPurchasable ? console.log("Add to cart") : null}
              disabled={!isPurchasable}
              aria-disabled={!isPurchasable}
              className="gap-2"
              variant={isPurchasable ? "default" : "outline"}
            >
              <ShoppingCart className="h-5 w-5" />
              {isPurchasable ? "Add to Cart" : "Coming Soon"}
            </Button>
            {!isPurchasable && <RoadmapHint />}
          </div>

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <Button
              size="lg"
              variant="secondary" // Use a secondary style
              className="h-14 text-lg pointer-events-auto cursor-pointer"
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
          <div className="flex flex-col">
            <Button
              variant={hasDownloadSample ? "ghost" : "outline"}
              onClick={() => hasDownloadSample ? console.log("Download") : null}
              disabled={!hasDownloadSample}
              aria-disabled={!hasDownloadSample}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {hasDownloadSample ? "Download Sample" : "Sample Coming Soon"}
            </Button>
            {!hasDownloadSample && <RoadmapHint>Want sample access earlier? <a href="/roadmap" className="font-medium text-foreground underline decoration-dashed underline-offset-2 hover:text-primary">Vote &amp; boost priority</a>.</RoadmapHint>}
          </div>
          
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                {/* 3. Recreate the special "Play" button */}
                <Button
                  variant="default" // You can create a custom variant in button.tsx for this gradient if you want
                  className="bg-blue-600 hover:bg-blue-500 text-white pointer-events-auto cursor-pointer"
                  onClick={handlePlay}
                  aria-label="Play case (Beta feature)"
                  disabled={!isPlayable}
                  aria-disabled={!isPlayable}
                >
                  <Play size={16} className="mr-2" />
                  {isPlayable ? "Play" : "Coming Soon"}
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px] font-medium bg-white/20 rounded px-1.5 py-0.5 uppercase">
                    Beta
                    <HelpCircle size={14} />
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                <p>
                  {isPlayable
                    ? "Try the interactive in-browser version of this case. Explore evidence, read dossiers & track clues digitally. Features are experimental."
                    : "This case’s interactive board isn’t ready yet. It’s coming soon—join the waitlist and we’ll notify you when it’s playable."}
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