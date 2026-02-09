import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { mysteryKits, getMysteryKitBySlug } from "@/data/mysteryKits";
import Footer from "@/components/footer";
import KitCharacterRosterCard from "@/components/kit-character-roster-card";

interface KitPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return mysteryKits.map((k) => ({ slug: k.slug }));
}

export default async function MysteryKitDetailPage({ params }: KitPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <section className="relative overflow-hidden border-b border-subtle-stroke">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22),_transparent_60%)]" />
        <div className="mx-auto max-w-8xl px-4 py-16 relative">
          <div aria-hidden className="embossed-backdrop">
            {kit.title}
          </div>

          <div className="grid gap-1 lg:grid-cols-2 relative z-10 items-stretch outline-2">
            <div>
              <div className="rounded-[32px] border border-subtle-stroke bg-white/5 p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-indigo-200/70">
                  <span>Mystery Kit Overview</span>
                  {kit.price != null && (
                    <span className="rounded-full border border-indigo-200/30 bg-indigo-500/15 px-3 py-1 text-[10px] tracking-[0.4em] text-indigo-100">
                      ${kit.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-4xl md:text-5xl font-bold">
                  {kit.title}
                </h1>
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  {kit.description}
                </p>
                {/* <div className="mt-6 flex flex-wrap gap-3">
                  {kit.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs uppercase tracking-wide bg-white/10 text-text-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div> */}
                <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm text-text-secondary">
                  {kit.players && (
                    <div className="rounded-2xl border border-subtle-stroke bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-text-secondary">
                        Players
                      </p>
                      <p className="text-base text-text-primary font-semibold">
                        {kit.players}
                      </p>
                    </div>
                  )}
                  {kit.duration && (
                    <div className="rounded-2xl border border-subtle-stroke bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-text-secondary">
                        Duration
                      </p>
                      <p className="text-base text-text-primary font-semibold">
                        {kit.duration}
                      </p>
                    </div>
                  )}
                  {kit.difficulty && (
                    <div className="rounded-2xl border border-subtle-stroke bg-white/5 px-4 py-3">
                      <p className="text-xs uppercase tracking-wide text-text-secondary">
                        Difficulty
                      </p>
                      <p className="text-base text-text-primary font-semibold">
                        {kit.difficulty}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {kit.isPlayable && (
                    <Link
                      href={`/kits/${kit.slug}/play`}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-400 transition"
                    >
                      Enter Play Mode
                    </Link>
                  )}
                  {kit.isPurchasable ? (
                    <button className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-400 transition">
                      Get the Kit
                    </button>
                  ) : (
                    <button className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-text-secondary shadow border border-subtle-stroke cursor-not-allowed">
                      Coming Soon
                    </button>
                  )}
                  {kit.hasDownloadSample && (
                    <button className="inline-flex items-center justify-center rounded-full border border-subtle-stroke px-6 py-3 text-sm font-semibold text-text-primary hover:bg-white/5 transition">
                      Download Sample
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-1 mt-1 sm:grid-cols-5">
                <div className="sm:col-span-2">
                  <KitCharacterRosterCard
                    kitSlug={kit.slug}
                    characters={kit.characters ?? []}
                  />
                </div>

                <div className="rounded-[32px] border border-subtle-stroke bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur sm:col-span-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Kit Contents</h2>
                    <span className="text-xs uppercase tracking-[0.35em] text-text-secondary">
                      Contents
                    </span>
                  </div>
                  {kit.includes && kit.includes.length > 0 ? (
                    <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                      {kit.includes.slice(0, 6).map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-text-secondary">
                      Kit contents are being finalized.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-subtle-stroke bg-white/5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur h-full">
              <div className="relative w-full h-full min-h-[560px] rounded-[32px] overflow-hidden">
                <Image
                  src={kit.imageUrl}
                  alt={kit.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
