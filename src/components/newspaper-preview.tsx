"use client";

import React, { useMemo } from "react";

// --- CSS & Assets ---
const NewspaperStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Crimson+Text:wght@400;600;400i&family=Oswald:wght@500&display=swap');

    /* Authentic Newsprint Texture */
    .newsprint-paper {
      background-color: #f4f1ea; /* Off-white/Greyish-Cream */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
      box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    }

    /* Typography */
    .headline-font {
      font-family: 'Playfair Display', serif;
      line-height: 0.95;
      color: #1a1a1a;
    }
    .body-font {
      font-family: 'Crimson Text', serif;
      color: #262626;
      line-height: 1.35;
      text-align: justify;
    }
    .meta-font {
      font-family: 'Oswald', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #525252;
    }

    /* The "Torn Edge" Effect (Bottom) */
    .torn-bottom {
      --mask: conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) 50%/10px 100%;
      -webkit-mask: var(--mask);
      mask: var(--mask);
    }

    /* Ink Bleed Simulation */
    .ink-bleed {
      text-shadow: 0 0 0.5px rgba(0,0,0,0.2);
    }

    /* Column Layout for wider previews */
    .news-columns {
      column-count: 2;
      column-gap: 1rem;
      column-rule: 1px solid rgba(0,0,0,0.2);
    }
  `}</style>
);

// --- Parsing Logic ---
function parseNewsData(content: string) {
  try {
    const data = JSON.parse(content);
    return {
      headline: data.headline || "BREAKING NEWS",
      date: data.date || "Unknown Date",
      body: data.body || content,
      // Optional: Extract a location or author if your future JSON supports it
      location: data.location || "RIVERDALE",
      author: data.author || "Staff Writer"
    };
  } catch {
    // Fallback for raw strings
    return {
      headline: "EXTRA! EXTRA!",
      date: "Undated",
      body: content,
      location: "RIVERDALE",
      author: "Unknown"
    };
  }
}

interface NewspaperPreviewProps {
  content: string;
}

export default function NewspaperPreview({ content }: NewspaperPreviewProps) {
  const data = useMemo(() => parseNewsData(content), [content]);

  // Truncate body if it's massive, to fit the "clipping" look
  const displayBody = data.body.length > 500 ? data.body.slice(0, 500) + "..." : data.body;

  console.log("[NEWSPAPER] Render");
  return (
    <div className="w-full h-full relative group cursor-pointer select-none">
      <NewspaperStyles />

      {/* --- Container --- */}
      {/* We apply padding-bottom to account for the torn edge visual */}
      <div className="w-full h-full newsprint-paper torn-bottom p-4 pb-6 flex flex-col overflow-hidden relative">
        
        {/* --- Header Section --- */}
        <div className="border-b-2 border-black/80 pb-2 mb-2">
           {/* Tiny Meta Header */}
           <div className="flex justify-between items-end mb-1 border-b border-black/30 pb-0.5">
              <span className="meta-font text-[7px]">{data.location} • {data.date}</span>
              <span className="meta-font text-[7px]">VOL. XII</span>
           </div>
           
           {/* THE HEADLINE */}
           <h1 className="headline-font font-black text-xl md:text-2xl uppercase tracking-tight ink-bleed leading-none">
             {data.headline}
           </h1>
           
           {/* Sub-meta (Author) */}
           <div className="mt-1 flex items-center gap-2">
              <span className="font-bold font-serif text-[8px] italic opacity-80">By {data.author}</span>
           </div>
        </div>

        {/* --- Body Content --- */}
        <div className="flex-1 overflow-hidden relative">
          
          {/* Text */}
          <div className={`body-font text-[10px] md:text-[11px] ink-bleed ${displayBody.length > 200 ? 'news-columns' : ''}`}>
             
             {/* Drop Cap */}
             <span className="float-left text-3xl font-bold font-serif leading-[0.8] mr-1 mt-[-2px]">
               {displayBody.charAt(0)}
             </span>
             
             {displayBody.slice(1)}
          </div>

          {/* Fade Out at bottom to simulate cut-off text */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#f4f1ea] to-transparent" />
        </div>

        {/* --- "Continued" Footer (Simulates clipping) --- */}
        <div className="absolute bottom-1 right-2 opacity-60">
           <span className="font-sans text-[6px] font-bold uppercase tracking-wider">
             Continued on Page 4 ➝
           </span>
        </div>

      </div>
      
      {/* Visual Shadow for the torn bottom (Pseudo-element workaround since clip-path cuts shadow) */}
      <div className="absolute -bottom-1 left-0 w-full h-4 bg-black/20 blur-sm -z-10 rounded-[50%]" />

    </div>
  );
}