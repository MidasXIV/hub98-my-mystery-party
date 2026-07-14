import Image from "next/image";
import Link from "next/link";
import type { ColdCase } from "@/data/coldCases";

// --- Helper Functions ---
type BadgeCase = {
  slug: string;
  title: string;
  badgeUrl: string;
};

type PosterCase = {
  slug: string;
  title: string;
  posterUrl: string;
};

function extractCaseBadgeUrl(evidence: ColdCase["evidence"]): string | null {
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) {
    return null;
  }
  const items = (evidence as { items?: unknown }).items;
  if (!Array.isArray(items)) {
    return null;
  }
  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as { type?: unknown; imageUrl?: unknown; content?: unknown; };
    if (candidate.type !== "objectives-cleared-badge") continue;
    if (typeof candidate.imageUrl === "string" && candidate.imageUrl.length > 0) return candidate.imageUrl;
    
    if (typeof candidate.content === "string") {
      try {
        const parsed = JSON.parse(candidate.content) as { imageUrl?: unknown };
        if (typeof parsed.imageUrl === "string" && parsed.imageUrl.length > 0) return parsed.imageUrl;
      } catch { /* ignore */ }
    } else if (candidate.content && typeof candidate.content === "object" && !Array.isArray(candidate.content)) {
      const parsed = candidate.content as { imageUrl?: unknown };
      if (typeof parsed.imageUrl === "string" && parsed.imageUrl.length > 0) return parsed.imageUrl;
    }
  }
  return null;
}

function getBadgeCases(cases: ColdCase[]): BadgeCase[] {
  return cases
    .map((c) => ({ slug: c.slug, title: c.pageTitle || c.title, badgeUrl: extractCaseBadgeUrl(c.evidence) }))
    .filter((item): item is BadgeCase & { badgeUrl: string } => Boolean(item.badgeUrl));
}

function getPosterCases(cases: ColdCase[]): PosterCase[] {
  return cases
    .filter((c) => typeof c.imageUrl === "string" && c.imageUrl.length > 0)
    .map((c) => ({ slug: c.slug, title: c.pageTitle || c.title, posterUrl: c.imageUrl as string }));
}

interface BadgeDropCTAProps {
  cases: ColdCase[];
}

// Pre-defined scattered positions for badges to spread them out naturally
const badgePositions = [
  "top-[8%] left-[18%] w-20 sm:w-28 md:w-32 rotate-[-12deg]",
  "bottom-[12%] right-[15%] w-24 sm:w-32 md:w-36 rotate-[15deg]",
  "top-[22%] right-[12%] w-16 sm:w-24 md:w-28 rotate-[25deg]",
  "bottom-[18%] left-[12%] w-20 sm:w-28 md:w-32 rotate-[-5deg]",
  "top-[45%] left-[8%] w-16 sm:w-20 md:w-24 rotate-[8deg]",
  "bottom-[40%] right-[8%] w-16 sm:w-20 md:w-24 rotate-[-18deg]",
  "top-[8%] right-[35%] w-16 sm:w-20 md:w-24 rotate-[-8deg]",
  "bottom-[5%] left-[35%] w-20 sm:w-24 md:w-28 rotate-[12deg]",
  "top-[60%] left-[25%] w-16 sm:w-20 md:w-22 rotate-[-22deg]",
  "top-[70%] right-[28%] w-18 sm:w-22 md:w-26 rotate-[5deg]",
];

export default function BadgeDropCTA({ cases }: BadgeDropCTAProps) {
  const badgeCases = getBadgeCases(cases);
  const posterCases = getPosterCases(cases);

  if (badgeCases.length === 0 || posterCases.length === 0) return null;

  // Use different slices of the posters array to ensure variety between left and right columns
  const totalPosters = Math.max(1, posterCases.length);
  const leftPosters = Array.from({ length: 4 }, (_, i) => posterCases[i % totalPosters]);
  // Start the right side from index 4 to show different posters (if available)
  const rightPosters = Array.from({ length: 4 }, (_, i) => posterCases[(i + 4) % totalPosters]);
  
  // Tilted in the same direction (leaning left)
  const leftColumnTilt = "rotate-[-5deg]";
  const rightColumnTilt = "rotate-[-3deg]";
  
  // Minor variations for individual items so it doesn't look completely rigid
  const itemTilts = ["rotate-[1deg]", "rotate-[-1deg]", "rotate-[2deg]", "rotate-[-2deg]"];

  return (
    <section className="relative z-10 w-full px-2 py-8 sm:px-4 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-[95rem]">
        
        {/* Main "Cutting Mat" Container */}
        <div 
          className="relative flex min-h-[550px] w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-black/30 bg-[#173d2f] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] md:min-h-[650px] lg:min-h-[750px]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            backgroundPosition: "center center",
          }}
        >
          {/* Subtle vignette for depth */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.5)_120%)]" />

          {/* --- Left Poster Column --- */}
          <div className={`absolute bottom-[-15%] left-[-20%] z-10 flex w-[40%] max-w-[180px] flex-col gap-4 sm:left-[-10%] md:left-[-5%] lg:left-[-2%] lg:max-w-[200px] ${leftColumnTilt}`}>
            {leftPosters.map((poster, idx) => (
              <Link
                key={`left-p-${poster.slug}-${idx}`}
                href={`/cases/${poster.slug}`}
                aria-label={`Open case ${poster.title}`}
                className={`group relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/15 bg-black/40 shadow-[12px_12px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:z-30 hover:scale-105 ${itemTilts[idx % itemTilts.length]}`}
              >
                <Image src={poster.posterUrl} alt={poster.title} fill sizes="(max-width: 768px) 25vw, 15vw" className="object-cover transition-opacity group-hover:opacity-90" />
              </Link>
            ))}
          </div>

          {/* --- Right Poster Column --- */}
          <div className={`absolute right-[-20%] top-[-5%] z-10 flex w-[40%] max-w-[180px] flex-col gap-4 sm:right-[-10%] md:right-[-5%] lg:right-[-2%] lg:max-w-[200px] ${rightColumnTilt}`}>
            {rightPosters.map((poster, idx) => (
              <Link
                key={`right-p-${poster.slug}-${idx}`}
                href={`/cases/${poster.slug}`}
                aria-label={`Open case ${poster.title}`}
                className={`group relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-white/15 bg-black/40 shadow-[12px_12px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:z-30 hover:scale-105 ${itemTilts[(idx + 2) % itemTilts.length]}`}
              >
                <Image src={poster.posterUrl} alt={poster.title} fill sizes="(max-width: 768px) 25vw, 15vw" className="object-cover transition-opacity group-hover:opacity-90" />
              </Link>
            ))}
          </div>

          {/* --- Scattered Badges (Mapping all available up to the position limit) --- */}
          {badgeCases.slice(0, badgePositions.length).map((badge, idx) => (
            <Link 
              key={`badge-${badge.slug}-${idx}`} 
              href={`/cases/${badge.slug}`} 
              className={`absolute z-20 hidden transition-transform duration-300 hover:z-40 hover:scale-110 drop-shadow-[6px_10px_12px_rgba(0,0,0,0.5)] sm:block ${badgePositions[idx]}`}
            >
              <Image src={badge.badgeUrl} alt={badge.title} width={150} height={150} className="object-contain" />
            </Link>
          ))}

          {/* --- Central Content Area --- */}
          <div className="relative z-30 flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
            
            {/* Bold Typography */}
            <div className="rotate-[-2deg] transform transition-transform hover:rotate-0">
              <p className="mb-2 text-sm font-black uppercase tracking-[0.35em] text-[#a9c9b5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:mb-4 sm:text-base lg:text-lg">
                Earn Badges For Solving Cases
              </p>
              <h2 className="font-staatliches text-[5rem] leading-[0.85] tracking-wide text-[#f0de39] drop-shadow-[0_12px_15px_rgba(0,0,0,0.5)] sm:text-[7rem] md:text-[8.5rem] lg:text-[10rem]">
                BADGE WALL
                <br />
                OPEN!
              </h2>
            </div>

            {/* Typography Description & CTA (No Card) */}
            <div className="pointer-events-auto mt-8 flex w-full max-w-2xl rotate-[1deg] flex-col items-center sm:mt-10">
              <p className="text-center text-sm font-bold leading-relaxed text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] sm:text-base md:text-lg">
                Pull real case badges from live files, pick your next investigation,
                and jump straight into the board.
              </p>
              
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/cases"
                  className="inline-flex w-full max-w-[200px] items-center justify-center rounded-lg border-2 border-black/20 bg-[#f0de39] px-6 py-3.5 text-sm font-black uppercase tracking-widest text-black shadow-[0_6px_0_rgba(0,0,0,0.3)] transition-all hover:translate-y-[2px] hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] sm:w-auto"
                >
                  Browse Cases
                </Link>
                <Link
                  href="/waitlist"
                  className="inline-flex w-full max-w-[200px] items-center justify-center rounded-lg border-2 border-white/40 bg-black/40 px-6 py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-[0_6px_0_rgba(0,0,0,0.3)] backdrop-blur-sm transition-all hover:translate-y-[2px] hover:bg-black/60 hover:shadow-[0_4px_0_rgba(0,0,0,0.3)] sm:w-auto"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}