"use client";

import { useState } from "react";

interface CaseSectionItem {
  title: string;
  body: string;
}

interface CaseSectionsAccordionProps {
  items: CaseSectionItem[];
  title?: string;
}

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`transform transition-transform duration-300 flex-shrink-0 ${
      isOpen ? "rotate-180" : ""
    }`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function CaseSectionsAccordion({
  items,
  title = "Questions? Totally fair.",
}: CaseSectionsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mb-14">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <h2 className="text-4xl md:text-5xl text-center mb-10 text-text-primary tracking-tight">
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left p-4 rounded-3xl cursor-pointer transition-colors duration-300 border border-black/8 bg-black text-white hover:bg-black/85 dark:border-white/6 dark:bg-[#1C1C1E] dark:hover:bg-[#2C2C2E]"
                  aria-expanded={isOpen}
                >
                  <span className="text-white text-md pr-4">{item.title}</span>
                  <span className="text-white/60 dark:text-gray-500">
                    <ChevronIcon isOpen={isOpen} />
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "320px" : "0px",
                  }}
                >
                  <div className="px-4 pt-4 pb-2 leading-relaxed text-text-secondary">
                    {item.body}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
