"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCaseBySlug } from "@/data/coldCases";

/**
 * ColdCaseCTA
 * A visually engaging call-to-action that previews Station Zero gameplay
 * and invites users to start playing. Includes a video teaser and primary CTA.
 */
export default function ColdCaseCTA() {
  const stationZero = getCaseBySlug("station-zero");
  const isPlayable = stationZero?.isPlayable ?? false;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Only play the video when the section is in view to save resources
  useEffect(() => {
  const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt to play; ignore errors from autoplay policies (muted set)
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black p-1 md:p-6">
      <section
        ref={containerRef}
        className="relative isolate flex min-h-[85vh] w-full items-center justify-center overflow-hidden rounded-4xl bg-black/80 px-6 pb-14 pt-24 md:min-h-[92vh] md:px-12"
        aria-labelledby="station-zero-cta-title"
      >
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute left-0 top-0 -z-10 size-full object-cover object-center opacity-60"
          src="https://kioubj9rw7g55npk.public.blob.vercel-storage.com/station_zero/SZ_demo-1.mp4"
          muted
          playsInline
          loop
          preload="auto"
          poster="/hero_wideshot/woman-vanishing.png"
          aria-hidden="true"
        />

        {/* Dotted overlay for theme consistency */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#ffffff0f_2px,transparent_3px)] [background-size:20px_20px]"
        />

        {/* Foreground content */}
        <div className="text-center max-w-3xl">
          <h2
            id="station-zero-cta-title"
            className="text-5xl font-medium leading-tight tracking-tight text-white/95 md:text-6xl"
          >
            Station Zero: Begin Your Investigation
          </h2>
          <p className="mt-4 text-white/85 text-base md:text-lg">
            A high-stakes cold case. Realistic evidence. Your call on every lead.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {isPlayable ? (
              <Button size="lg" asChild className="shadow-xl">
                <Link href="/play/station-zero">Start Playing</Link>
              </Button>
            ) : (
              <Button size="lg" className="shadow-xl" disabled>
                Coming Soon
              </Button>
            )}
            <Button variant="ghost" asChild>
              <Link href="/cases">Browse Other Cases</Link>
            </Button>
          </div>
        </div>

        {/* Bottom aligned info card for extra context */}
        <div className="absolute bottom-8 left-0 w-full px-6 md:px-12">
          <div className="flex justify-end">
            <div className="w-full max-w-sm rounded-xl bg-black/60 p-5 text-white/90 shadow-xl backdrop-blur-lg">
              <p className="text-sm leading-relaxed">
                Play instantly in your browser; no install required. Built-in objectives, timeline, evidence viewer, and case log included.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
