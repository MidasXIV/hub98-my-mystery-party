"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ParticipantPacketStackItem = {
  id: string;
  title: string;
  eyebrow?: string;
  preview?: string;
  content: React.ReactNode;
};

interface ParticipantPacketStackProps {
  items: ParticipantPacketStackItem[];
  defaultOpenId?: string;
}

export default function ParticipantPacketStack({
  items,
  defaultOpenId,
}: ParticipantPacketStackProps) {
  const [openItem, setOpenItem] = useState<string | null>(
    defaultOpenId ?? items[0]?.id ?? null,
  );

  return (
    <div className="-mx-0 divide-y divide-subtle-stroke">
      {items.map((item) => {
        const isOpen = openItem === item.id;

        return (
          <div key={item.id} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenItem(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/5"
            >
              <div className="min-w-0 flex-1">
                {item.eyebrow && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-text-secondary">
                    {item.eyebrow}
                  </p>
                )}
                <p className="mt-1 text-[15px] font-semibold leading-snug text-text-primary">
                  {item.title}
                </p>
                {item.preview && !isOpen && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
                    {item.preview}
                  </p>
                )}
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0.92 : 0.58 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-subtle-stroke text-base leading-none text-text-secondary"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-subtle-stroke px-5 pb-5 pt-4 text-sm text-text-secondary">
                    {item.content}
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
