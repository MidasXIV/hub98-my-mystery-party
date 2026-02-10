"use client";

import React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getPostHeroImageOrBanner } from "@/lib/images/blog-banner";

export type GuidesMenuPayload = {
  categories: string[];
  featured: Array<{
    slug: string;
    title: string;
    description?: string;
    category: string;
    heroImage?: string;
  }>;
};

type HeaderGuidesMenuProps = {
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  data: GuidesMenuPayload;
};

function prettyCategory(cat: string) {
  return cat.replace(/-/g, " ");
}

export const HeaderGuidesMenu: React.FC<HeaderGuidesMenuProps> = ({
  open,
  anchorRef,
  onMouseEnter,
  onMouseLeave,
  data,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const [top, setTop] = React.useState<number | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    const update = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setTop(rect.bottom + 10);
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

  const categories = data.categories ?? [];
  const featured = data.featured ?? [];

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
                <h2 className="text-xl font-semibold">Guides</h2>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 dark:border-white/15 bg-white/80 dark:bg-white/10 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm hover:bg-white/90 dark:hover:bg-white/15 transition"
                >
                  View All
                  <span aria-hidden>›</span>
                </Link>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 flex flex-col gap-3 pr-6 border-r border-gray-200/60 dark:border-white/10">
                  <Link
                    href="/blog"
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    All Guides
                  </Link>

                  <div className="mt-1 flex flex-col gap-2">
                    {categories.length === 0 && (
                      <div className="text-gray-700 dark:text-gray-200">
                        No categories found.
                      </div>
                    )}
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog/category/${cat}`}
                        className="text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
                      >
                        {prettyCategory(cat)} <span aria-hidden>›</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
                      Looking for something specific?
                    </p>
                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-100">
                      Browse by category for party planning, costumes, and mystery guides.
                    </p>
                  </div>
                </div>

                <div className="col-span-8">
                  <div className="grid grid-cols-3 gap-6">
                    {featured.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="group/guide block rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-white/5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-white/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getPostHeroImageOrBanner({
                              title: p.title,
                              description: p.description,
                              category: p.category,
                              heroImage: p.heroImage,
                            })}
                            alt={p.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover/guide:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-300">
                            {prettyCategory(p.category)}
                          </p>
                          <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {p.title}
                          </h3>
                          {p.description && (
                            <p className="mt-1 line-clamp-2 text-xs text-gray-700 dark:text-gray-200">
                              {p.description}
                            </p>
                          )}
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
