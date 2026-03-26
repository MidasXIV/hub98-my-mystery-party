import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMysteryKitBySlug, mysteryKits } from "@/data/mysteryKits";
import KitCharacterGrid from "@/components/kit-character-grid";
import Footer from "@/components/footer";
import { getMetadataBase } from "@/lib/metadata-base";

interface KitCharactersPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  return mysteryKits.map((kit) => ({ slug: kit.slug }));
}

export async function generateMetadata({ params }: KitCharactersPageProps): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) {
    return {
      metadataBase,
      title: "Character Dossiers | Mystery Party",
      description: "Browse character dossiers for this mystery kit.",
    };
  }

  const title = `${kit.title} Characters | Mystery Party Kits`;
  const description = `Meet the suspects and allies in ${kit.title}. Click a dossier to learn each character's story, alibi, and secret.`;
  const routePath = `/kits/${kit.slug}/play/characters`;
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

export default async function KitCharactersPage({ params }: KitCharactersPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-text-primary font-sans">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
          {kit.title} • Dossiers
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold">
          Character Dossiers
        </h1>
        <p className="mt-4 max-w-2xl text-text-secondary">
          Review each player&apos;s backstory, alibi, and secret. Tap a card to open a
          full dossier page for hosting notes and story beats.
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
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        {kit.characters && kit.characters.length > 0 ? (
          <KitCharacterGrid characters={kit.characters} kitSlug={kit.slug} />
        ) : (
          <p className="text-text-secondary">No dossiers available yet.</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
