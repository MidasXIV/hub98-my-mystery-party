"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Play, 
  ShoppingCart, 
  Wand2, 
  Download, 
  Lightbulb, 
  Fingerprint,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomizeModal, CustomizationData } from "@/components/customize-modal";
import { getCaseBySlug } from "@/data/coldCases";

// Custom thematic Evidence Tape for locked items
const EvidenceTape: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative overflow-hidden border-2 border-yellow-500/40 bg-[#fefce8] dark:bg-yellow-950/10 px-3 py-2 rounded-md shadow-sm mt-2">
    {/* Warning stripes across the top */}
    <div className="absolute inset-x-0 top-0 h-1.5 bg-[repeating-linear-gradient(-45deg,#eab308,#eab308_8px,#1a1a1a_8px,#1a1a1a_16px)]" />
    <div className="pt-1.5 flex items-start gap-2">
      <Lightbulb className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-[1px] animate-pulse" />
      <div className="leading-relaxed font-mono text-[10px] text-amber-950 dark:text-amber-200/90 font-bold tracking-wider uppercase">
        {children}
      </div>
    </div>
  </div>
);

interface CaseActionsProps {
  slug: string;
}

const storageKey = (slug: string) => `coldcase_customization_${slug}`;

export const CaseActions: React.FC<CaseActionsProps> = ({ slug }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [customization, setCustomization] = useState<CustomizationData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) setCustomization(JSON.parse(raw));
    } catch (error) {
      console.error("Failed to parse customization from localStorage", error);
    }
  }, [slug]);

  const handleSaveCustomization = (data: CustomizationData) => {
    setCustomization(data);
  };

  const handlePlay = () => {
    const params = new URLSearchParams();
    if (customization?.location) params.set("loc", customization.location);
    if (customization?.characters?.length) params.set("chars", customization.characters.join("|"));
    router.push(`/play/${slug}?${params.toString()}`);
  };

  const coldCase = getCaseBySlug(slug);
  const isPurchasable = coldCase?.isPurchasable ?? false; // Fallback to false if unsupported
  const hasDownloadSample = coldCase?.hasDownloadSample ?? false; // Fallback to false if unsupported
  const isPlayable = coldCase?.isPlayable ?? false;

  const showPrintActions = isPurchasable || hasDownloadSample;

  return (
    <>
      <TooltipProvider delayDuration={100}>
        <div className="relative flex flex-col w-full max-w-xl font-sans mt-4">
          
          {/* Manila File Folder Tab */}
          <div className="flex -mb-px relative z-10 select-none">
            <div className="bg-[#ebdcb4] dark:bg-[#252119] text-[#5c492c] dark:text-[#c4ad83] text-[10px] font-mono tracking-widest font-bold uppercase px-4 py-1.5 rounded-t-md border-t-2 border-x-2 border-[#d2c29d] dark:border-zinc-800 flex items-center gap-1.5 shadow-sm">
              <Fingerprint className="h-3.5 w-3.5 text-red-700/80 dark:text-red-500/80" />
              CASE FILE REF: MMP-{slug.toUpperCase().slice(0, 6)}
            </div>
            <div className="flex-1 border-b-2 border-[#d2c29d] dark:border-zinc-800" />
          </div>

          {/* Folder Body */}
          <div className="relative overflow-hidden bg-[#faf6eb] dark:bg-[#13110d] border-2 border-[#d2c29d] dark:border-zinc-800 rounded-b-md rounded-tr-md p-5 flex flex-col gap-5 shadow-md">
            
            {/* Distressed "CLASSIFIED" Rubber Stamp Watermark */}
            <div className="absolute top-8 right-6 pointer-events-none opacity-[0.06] dark:opacity-[0.03] select-none font-mono text-6xl font-black uppercase tracking-widest border-4 border-dashed border-red-600 dark:border-red-500 p-2 rounded-lg rotate-[12deg]">
              TOP SECRET
            </div>

            {/* SECTION 1: Digital Evidence Board (Fully Operational) */}
            <div className="flex flex-col gap-3 relative z-10">
              <div className="border-b border-[#ebdcb4] dark:border-zinc-850 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8c6d3b] dark:text-[#bca47c]">
                      // DIGITAL TERMINAL ACCESS
                    </h4>
                    <span className="font-mono text-[9px] font-bold border border-red-600/70 text-red-600 dark:text-red-500/90 rounded px-1.5 py-0.2 rotate-[-1deg] uppercase tracking-wider bg-red-50 dark:bg-red-950/20">
                      BETA OUTPOST
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-500 font-bold uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online &amp; Free
                  </span>
                </div>
                <p className="text-xs text-muted-foreground/90 font-mono mt-1">
                  Analyze wiretaps, trace burner phones, and cross-reference records online.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {/* Play / Board Launch Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="w-full">
                      <Button
                        variant="default"
                        className="w-full h-12 bg-[#2d2820] hover:bg-[#3d362a] dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-mono tracking-wider border-2 border-[#453e34] dark:border-zinc-600 uppercase text-xs font-bold rounded shadow-md group relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-55"
                        onClick={handlePlay}
                        disabled={!isPlayable}
                      >
                        {isPlayable && (
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        )}
                        <Play size={13} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
                        {isPlayable ? "OPEN DIGITAL BOARD" : "ENCRYPTED PORTAL"}
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs font-mono text-xs bg-[#221f1a] text-[#f4efe2] border border-[#d2c29d]">
                    <p>
                      {isPlayable
                        ? "Launches the digital terminal interface to begin compiling dossiers and sorting suspects."
                        : "The secure console for this case file is currently undergoing maintenance. Sign up to help decrypt it."}
                    </p>
                  </TooltipContent>
                </Tooltip>

                {/* Customization Button */}
                <Button
                  variant="outline"
                  className="w-full h-12 gap-2 border-2 border-dashed border-[#d2c29d] dark:border-zinc-700 bg-transparent text-[#5c492c] dark:text-[#c4ae8a] hover:bg-[#f0e8d0] dark:hover:bg-zinc-900 font-mono text-xs uppercase font-bold tracking-wider rounded transition-colors"
                  onClick={() => setModalOpen(true)}
                >
                  <Wand2 size={13} className="text-red-700/80 dark:text-red-500/80" />
                  REALTER EVIDENCE
                </Button>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground/80 leading-relaxed px-1">
                &gt; Modify witness profiles, locations, and victim aliases prior to launching the investigation.
              </p>
            </div>

            {/* SECTION 2: Printed Case Files (Conditionally Rendered) */}
            {showPrintActions ? (
              <div className="flex flex-col gap-3 relative z-10">
                <div className="border-b border-[#ebdcb4] dark:border-zinc-850 pb-2">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8c6d3b] dark:text-[#bca47c]">
                    // EVIDENCE BOX / PRINT DOSSIERS
                  </h4>
                  <p className="text-xs text-muted-foreground/90 font-mono mt-1">
                    Order high-resolution printable PDF crime file packets.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start mt-1">
                  {/* Purchase Button */}
                  <div className="flex flex-col">
                    <Button
                      size="lg"
                      onClick={() => isPurchasable ? console.log("Add to cart") : null}
                      disabled={!isPurchasable}
                      className="w-full h-12 gap-2 font-mono text-xs font-bold uppercase tracking-wider bg-red-850 hover:bg-red-800 text-white border-2 border-red-900 rounded shadow-md disabled:bg-zinc-200 dark:disabled:bg-zinc-900 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:border-zinc-300 dark:disabled:border-zinc-800"
                    >
                      <ShoppingCart size={13} />
                      {isPurchasable ? "SECURE CASE FILE" : "OUT OF STOCK"}
                    </Button>
                    {!isPurchasable && (
                      <EvidenceTape>
                        Dossier Pending Release. Request physical file decryption via the roadmap.
                      </EvidenceTape>
                    )}
                  </div>

                  {/* Download Sample Button */}
                  <div className="flex flex-col">
                    <Button
                      variant="outline"
                      onClick={() => hasDownloadSample ? console.log("Download") : null}
                      disabled={!hasDownloadSample}
                      className="w-full h-12 gap-2 border-2 border-[#d2c29d] dark:border-zinc-700 bg-transparent text-[#5c492c] dark:text-[#c4ae8a] hover:bg-[#f0e8d0] dark:hover:bg-zinc-900 font-mono text-xs uppercase font-bold tracking-wider rounded disabled:opacity-50"
                    >
                      <Download size={13} />
                      {hasDownloadSample ? "DOWNLOAD PREVIEW" : "PREVIEW LOCKED"}
                    </Button>
                    {!hasDownloadSample && (
                      <EvidenceTape>
                        File sample redacted. Lobby to release local system records.
                    </EvidenceTape>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Simplified, Clean Roadmap Alternative (No non-functional disabled buttons) */
              <div className="flex flex-col gap-2.5 relative z-10 pt-3 border-t border-[#ebdcb4] dark:border-zinc-850">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8c6d3b]/80 dark:text-[#bca47c]/80 flex items-center gap-1">
                  // PRINTABLE OFFLINE MATERIALS
                </h4>
                <div className="relative overflow-hidden border border-[#ebdcb4] dark:border-zinc-800 bg-[#FAF8F2] dark:bg-zinc-950/40 p-3 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  {/* Warning stripes on side border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[repeating-linear-gradient(0deg,#eab308,#eab308_6px,#1a1a1a_6px,#1a1a1a_12px)]" />
                  
                  <div className="flex flex-col gap-0.5 pl-2">
                    <span className="text-[11px] font-mono font-bold text-[#5c492c] dark:text-[#c4ae8a] uppercase tracking-wide flex items-center gap-1.5">
                      <Lock size={12} className="text-amber-600" />
                      Physical Case Files Archived
                    </span>
                    <p className="text-[10px] text-muted-foreground/90 font-mono leading-relaxed max-w-sm">
                      Offline printing, party dossiers, and PDF versions are currently in development.
                    </p>
                  </div>
                  
                  <Button
                    variant="outline"
                    asChild
                    className="h-8 px-3 font-mono text-[9px] uppercase font-bold tracking-wider border-[#d2c29d] dark:border-zinc-700 bg-transparent text-[#5c492c] dark:text-[#c4ae8a] hover:bg-[#ebdcb4] dark:hover:bg-zinc-800 shrink-0 self-start sm:self-center"
                  >
                    <a href="/roadmap">
                      Vote to Declassify
                    </a>
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>
      </TooltipProvider>

      <CustomizeModal
        slug={slug}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCustomization}
      />
    </>
  );
};