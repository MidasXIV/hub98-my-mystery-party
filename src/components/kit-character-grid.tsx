"use client";

import Image from "next/image";
import Link from "next/link";
import { mysteryKits } from "@/data/mysteryKits";

type Character = NonNullable<(typeof mysteryKits)[0]["characters"]>[number];

interface KitCharacterGridProps {
  characters: Character[];
  kitSlug: string;
}

export default function KitCharacterGrid({
  characters,
  kitSlug,
}: KitCharacterGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {characters.map((character) => (
        <Link
          key={character.id}
          href={`/kits/${kitSlug}/play/characters/${character.slug}`}
          className="group w-full text-left rounded-3xl border border-subtle-stroke bg-white/5 p-6 shadow-xl transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80"
        >
          <div className="flex items-start gap-4">
            {character.imageUrl ? (
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-16 w-16 rounded-2xl border border-white/10 bg-white/10 flex items-center justify-center text-sm font-semibold">
                {character.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
            )}
            <div>
              <h3 className="text-xl font-semibold">{character.name}</h3>
              <p className="text-sm text-text-secondary">{character.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed line-clamp-3">
            {character.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-wide text-emerald-200/70">
            <span className="rounded-full border border-emerald-200/20 bg-emerald-500/10 px-3 py-1">
              Open dossier
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
