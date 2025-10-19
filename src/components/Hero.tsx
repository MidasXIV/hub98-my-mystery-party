"use client";
import React from "react";
import { ArrowDown, Play } from "lucide-react"; // icons

// Background video asset located in /public
const BACKGROUND_VIDEO = "/vanishing-girl.mp4";

export default function Hero() {
  return (
    // This parent container creates the "black outline" or frame effect.
    // It has the dark background and padding.
    <main className="bg-black p-1 md:p-6">
      {/* 
        The 'm-6' and 'outline' classes have been removed from the section.
        It now correctly fills the padded parent container.
      */}
      <section className="relative isolate flex min-h-[85vh] w-full items-center justify-start overflow-hidden rounded-4xl bg-black/80 px-6 pb-10 pt-24 md:min-h-[92vh] md:px-12">
        {/* Background video */}
        <video
          className="absolute left-0 top-0 -z-10 size-full object-cover object-center opacity-60"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero_wideshot/woman-vanishing.png"
        >
          <source src={BACKGROUND_VIDEO} type="video/mp4" />
        </video>

        {/* Dotted Overlay Pattern for theme */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#ffffff0f_2px,transparent_3px)] [background-size:20px_20px]"
        />

        {/* Main Heading */}
        <div className="max-w-3xl">
          <h1 className="text-5xl font-medium leading-tight tracking-tight text-white/95 md:text-6xl xl:text-7xl">
            Uncover the truth. One cold case at a time.
          </h1>
        </div>

        {/* Bottom aligned content */}
        <div className="absolute bottom-10 left-0 w-full px-6 md:px-12">
          <div className="relative flex items-end justify-between">
            {/* Left Stats Card */}
            <div className="w-full max-w-xs rounded-xl bg-black/60 p-5 text-white/90 shadow-xl backdrop-blur-lg">
              <p className="text-sm leading-relaxed">
                Join over 500,000 active detectives and solve cases inspired by
                real-world mysteries. New case files added monthly.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/95 transition-opacity hover:opacity-80">
                <ArrowDown size={16} />
                Learn More
              </button>
            </div>

            {/* Center Rating + QR Card */}
            <div className="absolute left-1/2 top-1/2 hidden w-full max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/60 p-5 shadow-xl backdrop-blur-lg lg:block">
              <div className="flex items-center justify-between gap-4">
                <div className="text-white/90">
                  <p className="text-2xl font-semibold">4.9</p>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xl leading-none">★</span>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-white/70">21k+ Ratings</p>
                  <p className="mt-4 text-sm font-medium">Download File</p>
                </div>
                <div className="relative h-28 w-28 flex-shrink-0">
                  <QRCodePlaceholder />
                </div>
              </div>
            </div>

            {/* Right Watch Trailer Button */}
            <button className="group flex h-32 w-32 items-center justify-center rounded-full bg-black/60 text-white shadow-xl backdrop-blur-lg transition-colors hover:bg-black/50">
              <span className="flex items-center gap-2 font-medium">
                <Play size={18} className="fill-white" />
                Trailer
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// Placeholder for QR code SVG
function QRCodePlaceholder() {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="QR code" className="h-full w-full text-white/90">
      <rect width="64" height="64" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="6" y="6" width="14" height="14" fill="currentColor" />
      <rect x="44" y="6" width="14" height="14" fill="currentColor" />
      <rect x="6" y="44" width="14" height="14" fill="currentColor" />
      <rect x="24" y="24" width="6" height="6" fill="currentColor" />
      <rect x="34" y="24" width="6" height="6" fill="currentColor" />
      <rect x="24" y="34" width="6" height="6" fill="currentColor" />
      <rect x="34" y="34" width="6" height="6" fill="currentColor" />
      <rect x="30" y="14" width="4" height="4" fill="currentColor" />
      <rect x="50" y="30" width="4" height="4" fill="currentColor" />
      <rect x="14" y="30" width="4" height="4" fill="currentColor" />
      <rect x="30" y="50" width="4" height="4" fill="currentColor" />
    </svg>
  );
}