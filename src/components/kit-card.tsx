"use client";
import Link from "next/link";
import { mysteryKits } from "@/data/mysteryKits";

// Reusable card component for displaying a mystery kit preview.
// Accepts one MysteryKit item (inferred from mysteryKits type) and renders
// image background, title, arrow icon, and tags similar to cold cases styling.
export function KitCard({ kitData }: { kitData: (typeof mysteryKits)[0] }) {
  const isPurchasable = kitData.isPurchasable ?? false;

  return (
    <Link
      href={`/kits/${kitData.slug}`}
      className="case-card relative w-80 md:w-96 h-[500px] flex-shrink-0 group transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-3xl"
      aria-label={`View mystery kit: ${kitData.title}`}
    >
      <div className="relative w-80 md:w-96 h-[500px] flex-shrink-0 cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-105">
        <div
          className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
          style={{ backgroundImage: `url(${kitData.imageUrl})` }}
          role="img"
          aria-label={kitData.title}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
        </div>

        {/* Availability badge */}
        <div className="absolute top-20 right-5 z-10">
          {isPurchasable ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-100 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              AVAILABLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-100 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              COMING SOON
            </span>
          )}
        </div>

        <div className="absolute top-5 left-5 right-5 p-3 flex justify-between items-center bg-black/10 backdrop-blur-md rounded-2xl text-white">
          <h3 className="font-semibold text-sm md:text-base">{kitData.title}</h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform transition-transform duration-300 group-hover:rotate-[-45deg]"
            aria-hidden="true"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
          {kitData.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs text-white bg-white/20 backdrop-blur-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default KitCard;
