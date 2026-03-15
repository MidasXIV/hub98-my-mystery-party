"use client";
import React from "react";
import { ArrowDown, Play, X } from "lucide-react"; // icons

// Background video asset located in /public
const BACKGROUND_VIDEO = "/vanishing-girl.mp4";
const HERO_TRAILER_VIDEO =
  "https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/SZ_demo-1.mp4";

export default function Hero() {
  const [isTrailerOpen, setIsTrailerOpen] = React.useState(false);

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
                Join over 5,000 active detectives and solve cases inspired by
                real-world mysteries. New case files added monthly.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/95 transition-opacity hover:opacity-80">
                <ArrowDown size={16} />
                Learn More
              </button>
            </div>

            {/* Center Rating + QR Card */}
            {/* <div className="absolute left-1/2 top-1/2 hidden w-full max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/60 p-5 shadow-xl backdrop-blur-lg lg:block">
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
            </div> */}

            {/* Right Watch Trailer Button */}
            <button
              type="button"
              onClick={() => setIsTrailerOpen(true)}
              className="group flex h-32 w-32 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white shadow-xl backdrop-blur-lg transition-colors hover:bg-black/50"
            >
              <span className="flex items-center gap-2 font-medium">
                <Play size={18} className="fill-white" />
                Trailer
              </span>
            </button>
          </div>
        </div>

        {isTrailerOpen ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 px-4">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <div className="border-b border-white/10 px-6 py-4 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                      Gameplay Preview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Watch the case board in action
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Close trailer"
                    onClick={() => setIsTrailerOpen(false)}
                    className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/90 shadow-lg transition-all duration-200 ease-out hover:scale-105 hover:bg-white/14 hover:text-white active:scale-95"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="bg-black">
                <video
                  src={HERO_TRAILER_VIDEO}
                  controls
                  autoPlay
                  playsInline
                  className="aspect-video w-full"
                  poster="/hero_wideshot/woman-vanishing.png"
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
