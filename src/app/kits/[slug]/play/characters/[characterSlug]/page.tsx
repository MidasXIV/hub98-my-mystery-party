import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { mysteryKits } from "@/data/mysteryKits";
import Footer from "@/components/footer";
import ParticipantPacketStack from "@/components/participant-packet-stack";
import { getMetadataBase } from "@/lib/metadata-base";

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

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const { slug, characterSlug } =
    params instanceof Promise ? await params : params;
  const kit = mysteryKits.find((k) => k.slug === slug);
  const character = kit?.characters?.find((c) => c.slug === characterSlug);

  if (!kit || !character) {
    return {
      metadataBase,
      title: "Character Dossier | Mystery Party",
      description: "Character dossier details for this mystery kit.",
    };
  }

  const title = `${character.name} | ${kit.title} Character Dossier`;
  const description = `${character.name} is the ${character.role}. ${character.summary}`;
  const routePath = `/kits/${kit.slug}/play/characters/${character.slug}`;
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

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug, characterSlug } =
    params instanceof Promise ? await params : params;
  const kit = mysteryKits.find((k) => k.slug === slug);
  const character = kit?.characters?.find((c) => c.slug === characterSlug);

  if (!kit || !character) {
    notFound();
  }

  const characterDossierHtml =
    character.participantDossierHtml ??
    `
      <p>${character.summary}</p>
      ${character.alibi ? `<h3>Your Alibi</h3><p>${character.alibi}</p>` : ""}
      ${character.secret ? `<h3>Your Secret</h3><p>${character.secret}</p>` : ""}
    `;

  const packetItems = [
    ...(kit.participantPacket ?? []),
    {
      id: `${character.id}-dossier`,
      title: "Character Dossier",
      eyebrow: "Your file",
      order: 90,
      html: characterDossierHtml,
    },
  ].sort((a, b) => {
    if (a.id === "guest-instructions") return -1;
    if (b.id === "guest-instructions") return 1;
    return (a.order ?? 999) - (b.order ?? 999);
  });

  const proseClassName =
    "prose max-w-none dark:prose-invert prose-headings:text-text-primary prose-headings:tracking-tight prose-p:text-text-secondary prose-li:text-text-secondary prose-strong:text-text-primary prose-em:text-text-primary/85";

  const mobileStackItems = packetItems.map((item) => ({
    id: item.id,
    eyebrow: item.eyebrow,
    title: item.title,
    preview: item.title === "Guest Instructions"
      ? "Start here before revealing anything important."
      : item.title === "Forensic Examination Report"
        ? "A quick medical and scene summary tied to Arden Vale’s collapse."
        : undefined,
    content: (
      <div
        className={proseClassName}
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
    ),
  }));

  return (
  <main className="min-h-screen bg-background text-text-primary font-sans">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[8%] top-0 h-[420px] w-[420px] rounded-full bg-[rgba(99,102,241,0.18)] blur-[120px]" />
        <div className="absolute right-[-6%] top-[20%] h-[360px] w-[360px] rounded-full bg-[rgba(16,185,129,0.08)] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[rgba(245,158,11,0.08)] blur-[140px]" />
      </div>

      <section className="relative overflow-hidden border-b border-subtle-stroke">
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="relative z-10 flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-10 md:text-left">
            <div className="relative h-56 w-56 shrink-0 overflow-hidden rounded-[32px] border border-subtle-stroke bg-white/5 shadow-[0_30px_80px_-36px_rgba(0,0,0,0.82)] backdrop-blur md:h-64 md:w-64">
              {character.imageUrl ? (
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white/5 text-4xl font-semibold text-text-primary">
                  {character.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              )}
            </div>
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary">
                {kit.title} • Character Dossier
              </p>
              <h1 className="mt-4 text-[clamp(2.8rem,8vw,4.8rem)] font-semibold tracking-[-0.04em] leading-[0.94] text-text-primary">
                {character.name}
              </h1>
              <p className="mt-3 text-base font-medium text-text-secondary sm:text-lg">
                {character.role}
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-text-secondary md:mx-0 md:text-base">
                {character.summary}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  href={`/kits/${kit.slug}/play`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-subtle-stroke bg-white/5 px-5 py-2 text-sm font-semibold text-text-primary transition hover:bg-white/10"
                >
                  Back to play mode
                </Link>
                <Link
                  href={`/kits/${kit.slug}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-subtle-stroke bg-white/5 px-5 py-2 text-sm font-semibold text-text-primary transition hover:bg-white/10"
                >
                  Kit overview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:hidden">
        <div className="overflow-hidden rounded-[26px] border border-subtle-stroke bg-white/5 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.72)] backdrop-blur-sm">
          <div className="border-b border-subtle-stroke px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary">
              Participant packet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Guest instructions always appear first, followed by live packet items from this case and character.
            </p>
          </div>
          <ParticipantPacketStack
            items={mobileStackItems}
            defaultOpenId="guest-instructions"
          />
        </div>
      </section>

      <section className="relative mx-auto hidden max-w-6xl px-4 py-10 sm:px-6 lg:block lg:px-8">
        <div className="grid gap-6 xl:grid-cols-2">
          {packetItems.map((item, index) => (
            <article
              key={item.id}
              className={`rounded-[30px] border p-7 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.72)] backdrop-blur ${
                index === 0
                  ? "border-indigo-200/60 bg-indigo-50/70 dark:border-indigo-400/20 dark:bg-indigo-500/10"
                  : item.id === "forensic-examination-report"
                    ? "border-rose-200/70 bg-rose-50/70 dark:border-rose-400/20 dark:bg-rose-500/10"
                    : "border-subtle-stroke bg-white/5"
              }`}
            >
              {item.eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-text-secondary">
                  {item.eyebrow}
                </p>
              )}
              <h2 className="mt-3 text-[1.65rem] font-semibold tracking-tight text-text-primary">
                {item.title}
              </h2>
              <div
                className={`${proseClassName} mt-5`}
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}


