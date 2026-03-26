"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type StackedCardItem = {
  id: string;
  eyebrow?: string;
  title: string;
  preview?: string;
  content: React.ReactNode;
};

interface KitMobileStackedCardsProps {
  items: StackedCardItem[];
  theme?: "dark" | "light";
}

export default function KitMobileStackedCards({
  items,
  theme = "dark",
}: KitMobileStackedCardsProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const isDark = theme === "dark";
  const wrapClass = isDark
    ? "-mx-4 border-y border-white/10"
    : "border-y border-subtle-stroke";
  const itemClass = isDark
    ? "overflow-hidden border-b border-white/10 last:border-b-0"
    : "overflow-hidden border-b border-subtle-stroke/80 last:border-b-0";
  const itemStateClass = isDark
    ? "bg-white/[0.02]"
    : "bg-gradient-to-r from-fuchsia-50/80 via-white to-cyan-50/80";
  const eyebrowClass = isDark
    ? "text-[11px] uppercase tracking-[0.3em] text-white/45"
    : "text-[11px] uppercase tracking-[0.3em] text-text-secondary";
  const openEyebrowClass = isDark
    ? "text-[11px] uppercase tracking-[0.3em] text-white/58"
    : "text-[11px] uppercase tracking-[0.3em] text-stone-600";
  const titleClass = isDark
    ? "mt-1 text-sm font-medium text-white/90"
    : "mt-1 text-sm font-medium text-text-primary";
  const openTitleClass = isDark
    ? "mt-1 text-sm font-semibold text-white"
    : "mt-1 text-sm font-semibold text-stone-950";
  const previewClass = isDark
    ? "mt-2 line-clamp-2 text-sm leading-relaxed text-white/55"
    : "mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary";
  const iconClass = isDark
    ? "mt-1 shrink-0 text-lg leading-none text-white/60"
    : "mt-1 shrink-0 text-lg leading-none text-text-secondary";
  const contentWrapClass = isDark
    ? "border-t border-white/10 px-4 pb-4 pt-3 text-sm text-white/78"
    : "border-t border-subtle-stroke px-4 pb-4 pt-3 text-sm text-text-secondary";
  const buttonClass = isDark
    ? "group flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-white/[0.03]"
    : "group flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors duration-200 hover:bg-gradient-to-r hover:from-fuchsia-50/70 hover:via-transparent hover:to-cyan-50/70";
  const iconWrapClass = isDark
    ? "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5"
    : "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white shadow-[0_10px_20px_-18px_rgba(68,64,60,0.35)]";

  return (
    <div className={wrapClass}>
      {items.map((item, index) => {
        const isOpen = openItem === item.id;

        return (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.05, ease: "easeOut" }}
            className={`${itemClass} ${isOpen ? itemStateClass : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenItem(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className={buttonClass}
            >
              <div>
                {item.eyebrow && (
                  <p className={isOpen ? openEyebrowClass : eyebrowClass}>
                    {item.eyebrow}
                  </p>
                )}
                <p className={isOpen ? openTitleClass : titleClass}>{item.title}</p>
                {item.preview && !isOpen && (
                  <p className={previewClass}>
                    {item.preview}
                  </p>
                )}
              </div>
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  opacity: isOpen ? 1 : 0.75,
                  scale: isOpen ? 1.06 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={iconWrapClass}
              >
                <span className={iconClass}>+</span>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className={contentWrapClass}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
