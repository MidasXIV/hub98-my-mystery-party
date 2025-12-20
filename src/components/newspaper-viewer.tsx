/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo } from "react";

// --- Types ---
interface NewspaperData {
  headline: string;
  subheadline?: string;
  dateline?: string; // e.g. "VENICE"
  date: string;
  body: string;
  author: string;
  authorRole?: string;
  publication: string;
  hasPhoto?: boolean;
  imageCaption?: string;
}

// --- CSS & Assets ---
const ViewerStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400&family=Crimson+Text:wght@400;400i;600;700&family=Old+Standard+TT:wght@400;700&display=swap');

    /* 1. Realistic Paper Texture */
    .newspaper-sheet {
      background-color: #f3eee6; /* Light Oatmeal */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      color: #111;
    }

    /* 2. Typography Mapping */
    .font-headline {
      font-family: 'Playfair Display', serif;
      line-height: 0.9;
      letter-spacing: -0.01em;
    }
    .font-subheadline {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      line-height: 1.2;
    }
    .font-body {
      font-family: 'Crimson Text', serif;
      font-size: 1.05rem;
      line-height: 1.35;
      text-align: justify; /* Essential for newspaper look */
    }
    .font-masthead {
      font-family: 'Old Standard TT', serif;
    }

    /* 3. Column Layout */
    .news-columns {
      column-count: 1;
      column-gap: 2rem;
    }
    @media (min-width: 768px) {
      .news-columns {
        column-count: 3; /* Matches the 3-column reference */
        column-rule: 1px solid rgba(0,0,0,0.1);
      }
    }

    /* 4. Ink Bleed & Drop Cap */
    .ink-bleed {
      text-shadow: 0.2px 0.2px 0.5px rgba(0,0,0,0.1);
    }
    .drop-cap::first-letter {
      float: left;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 3.8rem;
      line-height: 0.8;
      padding-right: 0.5rem;
      padding-top: 0.2rem;
    }

    /* 5. Photo Filters */
    .newspaper-photo {
      filter: grayscale(100%) contrast(1.2) brightness(0.9);
      mix-blend-mode: multiply;
    }
  `}</style>
);

// --- Parsing Logic ---
function parseNewsViewerData(content: string): NewspaperData {
  let json: any = {};
  try {
    json = JSON.parse(content);
  } catch {
    json = { body: content };
  }

  return {
    headline: json.headline || "BREAKING NEWS",
    subheadline: json.subheadline || undefined,
    dateline: json.dateline || json.location || "VENICE",
    date: json.date || "Unknown Date",
    body: json.body || content,
    author: json.author || "Staff Writer",
    authorRole: json.authorRole || undefined,
    publication: json.publication || "The Venice Gazette",
    hasPhoto: json.hasPhoto ?? false, 
    imageCaption: json.imageCaption || "Fig 1. Scene of the incident.",
  };
}

interface NewspaperViewerProps {
  content: string;
}

export default function NewspaperViewer({ content }: NewspaperViewerProps) {
  const data = useMemo(() => parseNewsViewerData(content), [content]);

  // Split content into paragraphs
  const paragraphs = data.body.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="w-full flex justify-center py-10 bg-gray-900 min-h-screen overflow-y-auto">
      <ViewerStyles />

      {/* --- Main Sheet --- */}
      <div className="relative w-full max-w-[1000px] min-h-[1200px] newspaper-sheet p-8 md:p-12 text-black flex flex-col shadow-2xl">
        
        {/* --- 1. HEADLINE SECTION --- */}
        <header className="mb-6 border-b-[3px] border-black pb-4">
          
          {/* Main Headline */}
          <h1 className="font-headline font-black text-5xl md:text-7xl mb-3 ink-bleed">
            {data.headline}
          </h1>

          {/* Subheadline (Dynamic) */}
          {data.subheadline && (
            <h2 className="font-subheadline text-2xl md:text-3xl mb-6 opacity-90 font-medium">
              {data.subheadline}
            </h2>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end font-serif">
            {/* Byline */}
            <div>
              <div className="font-bold text-lg leading-none uppercase tracking-wide">
                By {data.author}
              </div>
              {data.authorRole && (
                <div className="italic font-bold opacity-80 text-sm mt-1">
                  {data.authorRole}
                </div>
              )}
            </div>
            
            {/* Dateline (if any) */}
            {data.dateline && (
              <div className="hidden md:block text-sm font-bold uppercase tracking-widest opacity-60">
                 {data.dateline} — SPECIAL REPORT
              </div>
            )}
          </div>
        </header>

        {/* --- 2. ARTICLE BODY (3 Columns) --- */}
        <div className="flex-1">
          <div className="news-columns font-body ink-bleed">
            
            {/* --- The Floating Photo (Dynamic) --- */}
            {data.hasPhoto && (
              <figure className="mb-4 md:float-left md:mr-6 w-full md:w-[60%] break-inside-avoid">
                <div className="w-full aspect-[4/5] bg-neutral-300 relative overflow-hidden newspaper-photo border border-black/20">
                   {/* CSS Noise for 'Grainy Photo' look */}
                   <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
                   
                   {/* Placeholder Silhouette */}
                   <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-800 fill-current opacity-60 p-4">
                      <path d="M50 20 C 40 20, 30 30, 30 45 C 30 60, 70 60, 70 45 C 70 30, 60 20, 50 20 Z M 10 100 L 10 80 C 10 55, 90 55, 90 80 L 90 100 Z" />
                   </svg>
                   
                   {/* Flash Effect */}
                   <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-black/40 to-transparent" />
                </div>
                {data.imageCaption && (
                  <figcaption className="text-xs font-sans font-bold mt-1 leading-tight border-b border-black pb-1">
                    {data.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* --- Dynamic Paragraphs --- */}
            {paragraphs.map((para, i) => (
              <p key={i} className={`mb-4 ${i === 0 ? 'drop-cap' : ''}`}>
                {/* Small Caps Dateline Leader for first paragraph only */}
                {i === 0 && data.dateline && (
                   <span className="font-bold tracking-wider mr-1 text-sm">
                      {data.dateline.toUpperCase()} —
                   </span>
                )}
                {para}
              </p>
            ))}

            {/* Dynamic "Continued" line */}
            <div className="mt-4 font-sans text-xs font-bold uppercase tracking-wider text-right opacity-80">
              Continued on Page 4
            </div>

          </div>
        </div>

        {/* --- 3. MASTHEAD FOOTER (Matches Reference) --- */}
        <footer className="mt-8 border-t-[3px] border-black pt-2 flex flex-col md:flex-row justify-between items-baseline opacity-90">
           <h2 className="font-masthead text-4xl text-[#1a1a1a]">
             {data.publication}
           </h2>
           <div className="font-body italic text-lg opacity-90">
             {data.date}
           </div>
        </footer>

      </div>
    </div>
  );
}