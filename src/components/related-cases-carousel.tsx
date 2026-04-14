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

function applyMagneticOffset(
  event: React.MouseEvent<HTMLElement>,
  {
    shiftStrength,
    tiltStrength,
  }: {
    shiftStrength: number;
    tiltStrength: number;
  },
) {
  const target = event.currentTarget;
  const bounds = target.getBoundingClientRect();
  const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
  const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;

  target.style.setProperty("--shift-x", `${xRatio * shiftStrength}px`);
  target.style.setProperty("--shift-y", `${yRatio * shiftStrength}px`);
  target.style.setProperty("--tilt-x", `${-yRatio * tiltStrength}deg`);
  target.style.setProperty("--tilt-y", `${xRatio * tiltStrength}deg`);
}

function resetMagneticOffset(event: React.MouseEvent<HTMLElement>) {
  const target = event.currentTarget;
  target.style.setProperty("--shift-x", "0px");
  target.style.setProperty("--shift-y", "0px");
  target.style.setProperty("--tilt-x", "0deg");
  target.style.setProperty("--tilt-y", "0deg");
}

function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(2);

  useEffect(() => {
    const getCardsPerView = () => {
      if (window.innerWidth >= 1280) return 5;
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      return 2;
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
    "basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5";

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
            onMouseMove={(event) =>
              applyMagneticOffset(event, { shiftStrength: 6, tiltStrength: 0 })
            }
            onMouseLeave={resetMagneticOffset}
            disabled={!canGoPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-text-primary transition-[transform,colors] duration-200 [transform:translate3d(var(--shift-x,0px),var(--shift-y,0px),0)] hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
            aria-label="Show previous suggested cases"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIndex((current) => Math.min(maxIndex, current + 1))}
            onMouseMove={(event) =>
              applyMagneticOffset(event, { shiftStrength: 6, tiltStrength: 0 })
            }
            onMouseLeave={resetMagneticOffset}
            disabled={!canGoNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-card text-text-primary transition-[transform,colors] duration-200 [transform:translate3d(var(--shift-x,0px),var(--shift-y,0px),0)] hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
            aria-label="Show more suggested cases"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <motion.ul
          className="-mx-1 flex touch-pan-y sm:-mx-2"
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
                className={`${cardBasisClass} min-w-0 shrink-0 list-none px-1 sm:px-2`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: itemIndex * 0.04 }}
              >
                <Link
                  href={`/cases/${suggestedCase.slug}`}
                  onMouseMove={(event) =>
                    applyMagneticOffset(event, { shiftStrength: 4, tiltStrength: 2.2 })
                  }
                  onMouseLeave={resetMagneticOffset}
                  className="group flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[1.25rem] border border-border/70 bg-card/80 transition-[transform,colors] duration-200 [transform:perspective(900px)_translate3d(var(--shift-x,0px),var(--shift-y,0px),0)_rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] hover:border-border hover:bg-card focus:outline-none focus:ring-2 focus:ring-ring/60 focus:ring-offset-2 focus:ring-offset-background sm:min-h-[24rem] sm:rounded-[1.5rem] dark:border-white/10 dark:bg-background/60 dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
                  aria-label={`Explore case ${suggestedCase.title}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
                    <Image
                      src={suggestedCase.imageUrl}
                      alt={suggestedCase.title}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, 20vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap items-center gap-1.5 sm:bottom-3 sm:left-3 sm:right-3 sm:gap-2">
                      <AnimatePresence>
                        {!isAvailable ? (
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="rounded-full border border-amber-300/25 bg-amber-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-100 backdrop-blur sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.18em]"
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
                          className="rounded-full border border-white/15 bg-black/35 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur sm:px-2.5 sm:py-1 sm:text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-semibold leading-snug text-text-primary transition-colors group-hover:text-text-primary sm:text-base dark:group-hover:text-white">
                        {suggestedCase.pageTitle || suggestedCase.title}
                      </h3>
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border/70 bg-muted/60 text-xs text-muted-foreground transition-colors group-hover:bg-muted sm:h-8 sm:w-8 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:group-hover:border-white/20 dark:group-hover:bg-white/10"
                      >
                        ↗
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary sm:mt-3 sm:line-clamp-3 sm:text-sm">
                      {suggestedCase.shortDescription || suggestedCase.description}
                    </p>

                    <div className="mt-auto pt-3 sm:pt-5">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-muted/50 px-3 py-1.5 text-xs font-medium text-text-primary transition-colors group-hover:bg-muted sm:gap-2 sm:px-4 sm:py-2 sm:text-sm dark:border-white/12 dark:bg-white/[0.05] dark:group-hover:border-white/20 dark:group-hover:bg-white/[0.08] dark:group-hover:text-white">
                        <span>{isAvailable ? "Play Case" : "Preview Case"}</span>
                        <span
                          aria-hidden
                          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/10 text-[10px] text-foreground/80 sm:h-6 sm:w-6 sm:text-xs dark:bg-white/8 dark:text-white/90"
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