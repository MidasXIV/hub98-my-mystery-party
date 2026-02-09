"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { coldCases } from "@/data/coldCases";
import { mysteryKits } from "@/data/mysteryKits";

type HeaderMegaMenuProps = {
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const HeaderMegaMenu: React.FC<HeaderMegaMenuProps> = ({
  open,
  anchorRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [top, setTop] = React.useState<number | null>(null);
  const [activeRightPanel, setActiveRightPanel] = React.useState<
    "cases" | "kits"
  >("cases");

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      // Safe default positioning:
      // Center the panel under the header, and only compute the vertical offset
      // from the anchor.
      setTop(rect.bottom + 15);

      // Next step (if you want it perfectly anchored under “Cold Cases”):
      // Measure the trigger's getBoundingClientRect() when the menu opens
      // and set *both* top/left inline.
      // setTop(rect.bottom + 10);
      // setLeft(rect.left + rect.width / 2);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [anchorRef]);

  if (!mounted || top == null) return null;

  // Heuristic: newest kits first.
  // We don't currently store publish dates, so we use array order (last = latest).
  const latestKits = [...mysteryKits].reverse().slice(0, 3);

  const rightTitle = activeRightPanel === "kits" ? "Latest Mystery Kits" : "Top Cases";
  const rightCtaHref = activeRightPanel === "kits" ? "/kits" : "/cases";
  const rightCtaLabel = activeRightPanel === "kits" ? "View All Kits" : "View All Cases";

  const panel = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-1/2 z-[60] w-[920px] max-w-[96vw] -translate-x-1/2"
          style={{ top }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div className="supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150 bg-white/40 dark:bg-black/35 rounded-3xl border border-gray-200/60 dark:border-white/10 shadow-2xl overflow-hidden">
            <div className="flex flex-col p-8 gap-6 font-sans text-sm text-gray-900 dark:text-gray-100">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-semibold">Top Mysteries</h2>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 dark:border-white/15 bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm hover:bg-white/90 dark:hover:bg-white/15 transition"
                >
                  View All Cases
                  <span aria-hidden>›</span>
                </Link>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3 flex flex-col gap-3 pr-6 border-r border-gray-200/60 dark:border-white/10">
                  <Link
                    href="/cases"
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    All Cases
                  </Link>
                  <Link
                    href="/cases?v=top"
                    className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    onFocus={() => setActiveRightPanel("cases")}
                  >
                    Top Sellers <span aria-hidden>›</span>
                  </Link>
                  <Link
                    href="/cases?v=classic"
                    className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    onFocus={() => setActiveRightPanel("cases")}
                  >
                    Classics <span aria-hidden>›</span>
                  </Link>
                  <Link
                    href="/cases?v=modern"
                    className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    onFocus={() => setActiveRightPanel("cases")}
                  >
                    Modern Mysteries <span aria-hidden>›</span>
                  </Link>
                  <Link
                    href="/cases?v=holiday"
                    className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    onFocus={() => setActiveRightPanel("cases")}
                  >
                    Holidays <span aria-hidden>›</span>
                  </Link>
                  <Link
                    href="/cases?v=fantasy"
                    className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    onFocus={() => setActiveRightPanel("cases")}
                  >
                    Fantasy <span aria-hidden>›</span>
                  </Link>

                  <div className="mt-5 pt-5 border-t border-gray-200/60 dark:border-white/10">
                    <Link
                      href="/kits"
                      className="text-gray-700 dark:text-gray-200 hover:underline flex items-center justify-between"
                      onMouseEnter={() => setActiveRightPanel("kits")}
                      onFocus={() => setActiveRightPanel("kits")}
                    >
                      <span className="flex items-center gap-1">
                        Mystery Kits <span aria-hidden>›</span>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-span-9">
                  <div
                    onMouseEnter={() => setActiveRightPanel("cases")}
                    className="flex items-center justify-between px-1"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {rightTitle}
                    </h3>
                    <Link
                      href={rightCtaHref}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 dark:border-white/15 bg-white/80 dark:bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-900 dark:text-white shadow-sm hover:bg-white/90 dark:hover:bg-white/15 transition"
                    >
                      {rightCtaLabel}
                      <span aria-hidden>›</span>
                    </Link>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-6">
                    {activeRightPanel === "kits"
                      ? latestKits.map((k) => (
                          <Link
                            key={k.id}
                            href={`/kits/${k.slug}`}
                            className="group/card block rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                          >
                            <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-white/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={k.imageUrl}
                                alt={k.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                              />
                            </div>
                            <div className="p-3">
                              <div className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
                                {k.title}
                              </div>
                              <div className="mt-1 line-clamp-1 text-xs text-gray-600 dark:text-gray-300">
                                {k.duration ? `${k.duration} • ` : ""}
                                {k.players ? k.players : ""}
                              </div>
                            </div>
                          </Link>
                        ))
                      : coldCases.slice(0, 3).map((c) => (
                          <Link
                            key={c.id}
                            href={`/cases/${c.slug}`}
                            className="group/cc block rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                          >
                            <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-white/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={c.imageUrl}
                                alt={c.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover/cc:scale-105"
                              />
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(panel, document.body);
};
