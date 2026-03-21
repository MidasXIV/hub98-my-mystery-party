"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ColdCase } from "@/data/coldCases";

interface RelatedCasesCarouselProps {
  suggestions: ColdCase[];
  currentTags: string[];
}

function isCaseAvailable(coldCase: ColdCase) {
  return Boolean(coldCase.isPurchasable || coldCase.isPlayable);
}

function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(1);

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth >= 1280) return 5;
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 640) return 2;
      return 1;
    };

    const update = () => setCardsPerView(getCardsPerView());

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cardsPerView;
}

export default function RelatedCasesCarousel({
  suggestions,
  currentTags,
}: RelatedCasesCarouselProps) {
  const cardsPerView = useCardsPerView();
  const maxIndex = Math.max(0, suggestions.length - cardsPerView);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const canGoPrev = index > 0;
  const canGoNext = index < maxIndex;
  const cardBasisClass =
    "basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";

  return (
    <>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        {/* <p className="text-xs uppercase tracking-[0.24em] text-text-secondary/70">
          {Math.min(cardsPerView, suggestions.length)} visible now
        </p> */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
            disabled={!canGoPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-primary transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show previous suggested cases"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => Math.min(maxIndex, current + 1))}
            disabled={!canGoNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-primary transition hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Show more suggested cases"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-background via-background/80 to-transparent lg:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-background via-background/80 to-transparent lg:block" />

        <motion.ul
          className="-mx-2 flex touch-pan-y"
          animate={{ x: `-${index * (100 / cardsPerView)}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 32 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragEnd={(_, info) => {
            const swipeThreshold = 50;
            if (info.offset.x <= -swipeThreshold && canGoNext) {
              setIndex((current) => Math.min(maxIndex, current + 1));
            } else if (info.offset.x >= swipeThreshold && canGoPrev) {
              setIndex((current) => Math.max(0, current - 1));
            }
          }}
        >
          {suggestions.map((suggestedCase, itemIndex) => {
            const sharedTags = suggestedCase.tags.filter((tag) =>
              currentTags.some(
                (currentTag) => currentTag.toLowerCase() === tag.toLowerCase()
              )
            );
            const isAvailable = isCaseAvailable(suggestedCase);

            return (
              <motion.li
                key={suggestedCase.slug}
                className={`${cardBasisClass} min-w-0 shrink-0 list-none px-2`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: itemIndex * 0.04 }}
              >
                <Link
                  href={`/cases/${suggestedCase.slug}`}
                  className="group flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-background/60 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-background"
                  aria-label={`Explore case ${suggestedCase.title}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={suggestedCase.imageUrl}
                      alt={suggestedCase.title}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                      <AnimatePresence>
                        {!isAvailable ? (
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="rounded-full border border-amber-300/25 bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100 backdrop-blur"
                          >
                            Coming Soon
                          </motion.span>
                        ) : null}
                      </AnimatePresence>

                      {(sharedTags.length > 0
                        ? sharedTags.slice(0, 2)
                        : suggestedCase.tags.slice(0, 2)
                      ).map((tag) => (
                        <span
                          key={`${suggestedCase.slug}-${tag}`}
                          className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold leading-snug text-text-primary transition group-hover:text-white">
                        {suggestedCase.pageTitle || suggestedCase.title}
                      </h3>
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition group-hover:border-white/20 group-hover:bg-white/10"
                      >
                        ↗
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text-secondary">
                      {suggestedCase.shortDescription || suggestedCase.description}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm font-medium text-text-primary transition group-hover:border-white/20 group-hover:bg-white/[0.08] group-hover:text-white">
                        <span>{isAvailable ? "Play Case" : "Preview Case"}</span>
                        <span
                          aria-hidden
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/8 text-xs text-white/90"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </>
  );
}