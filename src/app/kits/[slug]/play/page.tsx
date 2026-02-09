import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mysteryKits, getMysteryKitBySlug } from "@/data/mysteryKits";
import Footer from "@/components/footer";
import {
  Users,
  Clock,
  Puzzle,
  ChevronRight,
  UserPlus,
} from "lucide-react";

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

export async function generateMetadata({ params }: KitPlayPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) return { title: "Not Found" };

  return {
    title: `${kit.title} | Host Dashboard`,
    description: kit.openingBrief ?? kit.description,
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
      <p className="text-[10px] uppercase tracking-[0.35em] text-text-secondary">{label}</p>
      <p className="font-semibold text-text-primary">{value}</p>
    </div>
  </div>
);

const CharacterCard = ({
  character,
  kitSlug,
}: {
  character: KitCharacter;
  kitSlug: string;
}) => {
  return (
    <Link 
      href={`/kits/${kitSlug}/play/characters/${character.slug ?? character.id}`}
      className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-[28px] border border-subtle-stroke bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
    >
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden">
        {character.imageUrl ? (
          <Image
            src={character.imageUrl}
            alt={character.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-text-secondary">
            <Users size={48} strokeWidth={1} />
          </div>
        )}
        
        {/* Gradient Overlay: Darkens bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
        {/* Decorative Line */}
        <div className="mx-auto mb-3 h-px w-8 bg-indigo-300/80 opacity-80 group-hover:w-16 transition-all duration-500" />
        
        <h3 className="text-xl font-semibold tracking-wide text-white drop-shadow-md">
          {character.name}
        </h3>
        
        <p className="mt-1 text-xs font-semibold tracking-[0.35em] text-indigo-200/90 uppercase">
          {character.role || "Suspect"}
        </p>

        {/* Hover CTA */}
        <div className="mt-3 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.35em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
          <span>Open File</span>
          <ChevronRight size={12} className="text-indigo-200" />
        </div>
      </div>

      {/* Border Highlight on Hover */}
      <div className="absolute inset-0 rounded-[28px] border-2 border-transparent transition-colors duration-300 group-hover:border-indigo-300/40 pointer-events-none" />
    </Link>
  );
};

// --- Main Page ---
export default async function KitPlayPage({ params }: KitPlayPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) notFound();

  const characters: KitCharacter[] = (kit.characters ?? []) as KitCharacter[];

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
          
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            {kit.title}
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            {kit.openingBrief ?? kit.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {kit.players && <StatBadge icon={Users} label="Players" value={kit.players} />}
            {kit.duration && <StatBadge icon={Clock} label="Duration" value={kit.duration} />}
            {kit.difficulty && <StatBadge icon={Puzzle} label="Difficulty" value={kit.difficulty} />}
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
              <CharacterCard key={char.id} character={char} kitSlug={kit.slug} />
            ))}
            
            {/* Host "Invite" Placeholder */}
            <button className="group flex aspect-[3/4] w-full flex-col items-center justify-center rounded-[28px] border border-dashed border-subtle-stroke bg-white/5 backdrop-blur transition-colors hover:bg-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 shadow-sm transition-transform group-hover:scale-110">
                <UserPlus size={24} className="text-text-secondary group-hover:text-text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-text-secondary group-hover:text-text-primary">
                Add Player
              </span>
            </button>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}