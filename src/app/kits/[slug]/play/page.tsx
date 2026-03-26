import { notFound } from "next/navigation";
import { Metadata } from "next";
import { mysteryKits, getMysteryKitBySlug } from "@/data/mysteryKits";
import Footer from "@/components/footer";
import KitCharacterShareCard from "@/components/kit-character-share-card";
import { getBaseUrl } from "@/lib/blog";
import { Users, Clock, Puzzle, UserPlus } from "lucide-react";
import { getMetadataBase } from "@/lib/metadata-base";

type KitCharacter = {
  id: string;
  slug?: string;
  name: string;
  role?: string;
  imageUrl?: string;
};

// --- Types ---
interface KitPlayPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

// --- Metadata & Params ---
export async function generateStaticParams() {
  return mysteryKits.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: KitPlayPageProps): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) return { metadataBase, title: "Not Found" };

  const title = `${kit.title} | Host Dashboard`;
  const description = kit.openingBrief ?? kit.description;
  const routePath = `/kits/${kit.slug}/play`;
  const ogImageUrl = `${routePath}/opengraph-image`;

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "My Mystery Party",
      url: routePath,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// --- Components ---

const StatBadge = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-subtle-stroke bg-white/5 px-4 py-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur transition-colors">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-100">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">
        {label}
      </p>
      <p className="font-semibold text-text-primary">{value}</p>
    </div>
  </div>
);

// --- Main Page ---
export default async function KitPlayPage({ params }: KitPlayPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) notFound();

  const characters: KitCharacter[] = (kit.characters ?? []) as KitCharacter[];
  const baseUrl = getBaseUrl();

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans">
      {/* --- Background Ambience --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ambient blobs (aligned with kits detail page vibe) */}
        <div className="absolute -top-[10%] -left-[10%] h-[520px] w-[520px] rounded-full bg-[rgba(99,102,241,0.22)] blur-[110px]" />
        <div className="absolute top-[35%] right-[-5%] h-[480px] w-[480px] rounded-full bg-[rgba(16,185,129,0.10)] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* --- Header Section --- */}
        <header className="mb-16 flex flex-col items-center text-center">
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/5 px-4 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.35em] text-text-secondary uppercase">
              Session Active
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold md:text-7xl">{kit.title}</h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            {kit.openingBrief ?? kit.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {kit.players && (
              <StatBadge icon={Users} label="Players" value={kit.players} />
            )}
            {kit.duration && (
              <StatBadge icon={Clock} label="Duration" value={kit.duration} />
            )}
            {kit.difficulty && (
              <StatBadge
                icon={Puzzle}
                label="Difficulty"
                value={kit.difficulty}
              />
            )}
          </div>
        </header>

        {/* --- Character Grid --- */}
        <section className="mb-24">
          <div className="mb-8 flex items-end justify-between border-b border-subtle-stroke pb-4">
            <div>
              <h2 className="text-3xl font-semibold">Cast of Characters</h2>
              <p className="mt-1 text-sm text-text-secondary">
                Select a portrait to view details and assign a player.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {characters.map((char) => (
              <KitCharacterShareCard
                key={char.id}
                character={char}
                href={`/kits/${kit.slug}/play/characters/${char.slug ?? char.id}`}
                absoluteUrl={`${baseUrl}/kits/${kit.slug}/play/characters/${char.slug ?? char.id}`}
              />
            ))}

            {/* Host "Invite" Placeholder */}
            <button className="group flex aspect-[3/4] w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-subtle-stroke bg-white/5 backdrop-blur transition-colors hover:bg-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 shadow-sm transition-transform group-hover:scale-110">
                <UserPlus
                  size={24}
                  className="text-text-secondary group-hover:text-text-primary"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-text-secondary group-hover:text-text-primary">
                Add Player
              </span>
            </button>
          </div>
        </section>

        {(kit.hostInstructions || kit.forensicExaminationReport) && (
          <section className="mb-24 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            {kit.hostInstructions && (
              <article className="rounded-[32px] border border-subtle-stroke bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.82)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-300/75">
                  Host guide
                </p>
                <div
                  className="prose prose-invert mt-5 max-w-none prose-headings:text-white prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-white prose-em:text-white/85"
                  dangerouslySetInnerHTML={{ __html: kit.hostInstructions }}
                />
              </article>
            )}

            {kit.forensicExaminationReport && (
              <article className="rounded-[32px] border border-rose-200/15 bg-rose-500/8 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.82)] backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-rose-200/80">
                  Forensic examination report
                </p>
                <div
                  className="prose prose-invert mt-5 max-w-none prose-headings:text-white prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-white prose-em:text-white/85"
                  dangerouslySetInnerHTML={{
                    __html: kit.forensicExaminationReport,
                  }}
                />
              </article>
            )}
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
}
