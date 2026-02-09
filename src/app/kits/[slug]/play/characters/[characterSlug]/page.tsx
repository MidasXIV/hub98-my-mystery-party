import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mysteryKits } from "@/data/mysteryKits";
import Footer from "@/components/footer";

interface CharacterPageProps {
  params:
    | Promise<{ slug: string; characterSlug: string }>
    | { slug: string; characterSlug: string };
}

export async function generateStaticParams() {
  return mysteryKits.flatMap((kit) =>
    (kit.characters ?? []).map((character) => ({
      slug: kit.slug,
      characterSlug: character.slug,
    })),
  );
}

export async function generateMetadata({ params }: CharacterPageProps) {
  const { slug, characterSlug } =
    params instanceof Promise ? await params : params;
  const kit = mysteryKits.find((k) => k.slug === slug);
  const character = kit?.characters?.find((c) => c.slug === characterSlug);

  if (!kit || !character) {
    return {
      title: "Character Dossier | Mystery Party",
      description: "Character dossier details for this mystery kit.",
    };
  }

  return {
    title: `${character.name} | ${kit.title} Character Dossier`,
    description: `${character.name} is the ${character.role}. ${character.summary}`,
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug, characterSlug } =
    params instanceof Promise ? await params : params;
  const kit = mysteryKits.find((k) => k.slug === slug);
  const character = kit?.characters?.find((c) => c.slug === characterSlug);

  if (!kit || !character) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans">
      <section className="relative overflow-hidden border-b border-subtle-stroke">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.2),_transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 py-16 relative">
          <div className="embossed-backdrop" aria-hidden>
            {character.name}
          </div>
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
            <div className="relative h-56 w-56 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              {character.imageUrl ? (
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/10 text-4xl font-semibold">
                  {character.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
                {kit.title} • Character Dossier
              </p>
              <h1 className="mt-4 text-4xl md:text-5xl font-bold">
                {character.name}
              </h1>
              <p className="mt-2 text-lg text-text-secondary">
                {character.role}
              </p>
              <p className="mt-6 text-base text-text-secondary leading-relaxed max-w-2xl">
                {character.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/kits/${kit.slug}/play`}
                  className="inline-flex items-center justify-center rounded-full border border-subtle-stroke px-5 py-2 text-sm font-semibold text-text-primary hover:bg-white/5"
                >
                  Back to play mode
                </Link>
                <Link
                  href={`/kits/${kit.slug}`}
                  className="inline-flex items-center justify-center rounded-full border border-subtle-stroke px-5 py-2 text-sm font-semibold text-text-primary hover:bg-white/5"
                >
                  Kit overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-200/20 bg-emerald-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/80">
            Alibi Statement
          </p>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            {character.alibi ?? "Alibi details will be revealed during play."}
          </p>
        </div>
        <div className="rounded-3xl border border-rose-200/20 bg-rose-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-200/80">
            Hidden Secret
          </p>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            {character.secret ?? "Secrets are still classified."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="rounded-3xl border border-subtle-stroke bg-white/5 p-6">
          <h2 className="text-2xl font-semibold mb-4">Role in the Story</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Use this dossier to brief players before the game or to help the host
            guide the narrative. Pair this profile with the kit&apos;s evidence and
            location cards to assemble your investigation timeline.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
