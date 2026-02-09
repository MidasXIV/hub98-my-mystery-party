"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { mysteryKits } from "@/data/mysteryKits";

interface KitCharacterRosterCardProps {
  kitSlug: string;
  characters: NonNullable<(typeof mysteryKits)[0]["characters"]>;
}

export default function KitCharacterRosterCard({
  kitSlug,
  characters,
}: KitCharacterRosterCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = characters.length;
  const featuredCharacter = useMemo(
    () => (count > 0 ? characters[activeIndex % count] : undefined),
    [characters, activeIndex, count],
  );
  const canNavigate = count > 1;

  const handlePrev = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    if (!canNavigate) return;
    setActiveIndex((prev) => (prev + 1) % count);
  };

  return (
    <div className="rounded-[32px] border border-subtle-stroke bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur overflow-hidden">
      <div className="flex items-center justify-center gap-3 bg-white/5 px-6 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-text-secondary">
          Characters
        </h2>
        <span className="rounded-full border border-subtle-stroke bg-black/30 px-3 py-1 text-xs font-semibold text-text-primary">
          {count}
        </span>
      </div>

      {characters.length > 0 ? (
        <div className="relative min-h-[320px] h-full rounded-[32px]">
          <div className="absolute inset-0 ">
            {featuredCharacter?.imageUrl ? (
              <Image
                src={featuredCharacter.imageUrl}
                alt={featuredCharacter.name}
                fill
                className="object-cover rounded-[32px]"
                priority
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
            )}
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> */}
          </div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end">
            <div className="flex flex-col justify-end">
              {featuredCharacter ? (
                <Link
                  href={`/kits/${kitSlug}/play/characters/${featuredCharacter.slug}`}
                  className="inline-flex flex-col gap-1 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-left text-text-secondary backdrop-blur transition hover:bg-black/60"
                >
                  {/* <span className="text-xs uppercase tracking-[0.3em] text-indigo-200/70">
                    Character dossier
                  </span> */}
                  <span className="text-lg font-semibold text-white">
                    {featuredCharacter.name}
                  </span>
                  {/* <span className="text-xs uppercase tracking-[0.3em] text-indigo-200/70">
                    {featuredCharacter.role}
                  </span> */}
                  <span className="text-xs text-text-secondary text-white/80">
                    {featuredCharacter.summary}
                  </span>
                </Link>
              ) : null}
            </div>
            <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2">
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={!canNavigate}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[12px] text-white/70 transition hover:bg-black/50 disabled:opacity-40 cursor-pointer"
                  aria-label="Previous character"
                >
                  ↑
                </button>
                <p className="text-[9px] uppercase tracking-[0.3em] text-text-secondary">
                  {count > 0 ? `${activeIndex + 1}/${count}` : "0/0"}
                </p>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canNavigate}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-[12px] text-white/70 transition hover:bg-black/50 disabled:opacity-40 cursor-pointer"
                  aria-label="Next character"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-6 text-text-secondary">Character profiles are coming soon.</p>
      )}
    </div>
  );
}
