import React from "react";
import type { HeadingItem } from "@/lib/blog-types";

export default function Toc({ headings }: { headings: HeadingItem[] }) {
  if (!headings?.length) return null;
  // Show only h2/h3 for brevity
  const items = headings.filter((h) => h.depth === 2 || h.depth === 3);
  return (
    <nav aria-label="Table of contents" className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-border/60 bg-card/60 p-3 md:p-4">
        <h2 className="text-sm font-semibold">Table of Contents</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {items.map((h) => (
            <li key={h.id} className={h.depth === 3 ? "pl-3" : "pl-0"}>
              <a href={`#${h.id}`} className="text-foreground/80 hover:text-primary hover:underline">
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
