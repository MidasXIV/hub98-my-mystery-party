"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FaqItem = {
  title: string;
  body: string;
};

interface KitMobileFaqAccordionProps {
  items: FaqItem[];
}

export default function KitMobileFaqAccordion({
  items,
}: KitMobileFaqAccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openItem === item.title;

        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <button
              type="button"
              onClick={() => setOpenItem(isOpen ? null : item.title)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-white/85"
            >
              <span>{item.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0.8 : 0.5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-white/50"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-4 py-3 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
