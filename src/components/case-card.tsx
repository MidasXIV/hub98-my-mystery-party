"use client";
import Link from "next/link";
import { coldCases } from "@/data/coldCases";

// Reusable card component for displaying a cold case preview.
// Accepts one ColdCase item (inferred from coldCases type) and renders
// image background, title, arrow icon, and tags similar to homepage styling.
export function CaseCard({ caseData }: { caseData: (typeof coldCases)[0] }) {
  const isPlayable = caseData.isPlayable ?? false;

  return (
    <Link
      href={`/cases/${caseData.slug}`}
      className="case-card relative w-80 md:w-96 h-[500px] flex-shrink-0 group transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-3xl"
      aria-label={`View case: ${caseData.title}`}
    >
      <div className="relative w-80 md:w-96 h-[500px] flex-shrink-0 cursor-pointer group transition-transform duration-300 ease-in-out hover:scale-105">
        <div
          className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
          style={{ backgroundImage: `url(${caseData.imageUrl})` }}
          role="img"
          aria-label={caseData.title}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
        </div>

        {/* Playability badge */}
        <div className="absolute top-20 right-5 z-10">
          {isPlayable ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-100 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              PLAYABLE
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-100 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              COMING SOON
            </span>
          )}
        </div>

        <div className="absolute top-5 left-5 right-5 p-3 flex justify-between items-center bg-black/10 backdrop-blur-md rounded-2xl text-white">
          <h3 className="font-semibold text-sm md:text-base">{caseData.title}</h3>
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
          {caseData.tags.map((tag, index) => (
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

export default CaseCard;