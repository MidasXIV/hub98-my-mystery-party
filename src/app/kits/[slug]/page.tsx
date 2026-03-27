import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

// Data & Components
import {
  mysteryKits,
  getMysteryKitBySlug,
  type MysteryKit,
} from "@/data/mysteryKits";
import Footer from "@/components/footer";
import KitCharacterRosterCard from "@/components/kit-character-roster-card";
import KitMobileStackedCards from "@/components/kit-mobile-stacked-cards";
import KitPurchaseDetails from "@/components/kit-purchase-details";
import { getMetadataBase } from "@/lib/metadata-base";

interface KitPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const dynamicParams = false;

function buildKitJsonLd(kit: MysteryKit) {
  const absoluteImageUrl = kit.imageUrl.startsWith("http")
    ? kit.imageUrl
    : `https://mymystery.party${kit.imageUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: kit.title,
    description: kit.seoDescription ?? kit.description,
    image: [absoluteImageUrl],
    sku: kit.id,
    brand: {
      "@type": "Brand",
      name: "Bespoke Mysteries",
    },
    category: "Printable murder mystery party kit",
    keywords: kit.seoKeywords?.join(", "),
    url: `https://mymystery.party/kits/${kit.slug}`,
    audience: {
      "@type": "Audience",
      audienceType: `${kit.players ?? "Group"} players`,
    },
    inLanguage: kit.languages?.join(", ") ?? "English",
    offers: {
      "@type": "Offer",
      price: kit.price ?? 0,
      priceCurrency: "USD",
      availability: kit.isPurchasable
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `https://mymystery.party/kits/${kit.slug}`,
    },
    aggregateRating:
      kit.rating && kit.ratingCount
        ? {
            "@type": "AggregateRating",
            ratingValue: kit.rating,
            reviewCount: kit.ratingCount,
          }
        : undefined,
  };
}

/**
 * SEO: Dynamic Metadata Generation
 */
export async function generateMetadata({
  params,
}: KitPageProps): Promise<Metadata> {
  const metadataBase = getMetadataBase();
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) return { metadataBase, title: "Kit Not Found" };

  const title =
    kit.seoTitle ?? `${kit.title} | Modern Murder Mystery Party Kit`;
  const description = kit.seoDescription ?? kit.description;
  const keywords = kit.seoKeywords;
  const absoluteImageUrl = kit.imageUrl.startsWith("http")
    ? kit.imageUrl
    : `https://mymystery.party${kit.imageUrl}`;
  const seoQueryCopy = [kit.description, kit.openingBrief, kit.seoBlock]
    .filter(Boolean)
    .join(" ")
    .slice(0, 220);

  return {
    metadataBase,
    title,
    description,
    keywords,
    alternates: {
      canonical: `/kits/${kit.slug}`,
    },
    openGraph: {
      title,
      description,
      siteName: "My Mystery Party",
      images: [{ url: absoluteImageUrl }],
      type: "website",
      url: `https://mymystery.party/kits/${kit.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
    },
    other: {
      "search-intent-summary": seoQueryCopy,
    },
  };
}

export async function generateStaticParams() {
  return mysteryKits.map((k) => ({ slug: k.slug }));
}

export default async function MysteryKitDetailPage({ params }: KitPageProps) {
  const { slug } = params instanceof Promise ? await params : params;
  const kit = getMysteryKitBySlug(slug);

  if (!kit) notFound();

  // --- SEO: Structured Data (JSON-LD) ---
  const jsonLd = buildKitJsonLd(kit);

  // --- UI Content Fragments ---
  const faqItems =
    kit.faqs?.map((f) => ({ title: f.question, body: f.answer })) ?? [];

  const characterCount = kit.characters?.length ?? 0;
  const evidenceCount = kit.evidence?.length ?? 0;
  const primaryLocation = kit.locations?.[0]?.name ?? "your party space";
  const openingHook =
    kit.openingBrief
      ?.split(/[.!?]/)
      .find((sentence) => sentence.trim().length > 20)
      ?.trim() ?? kit.description;
  const heroEyebrow = kit.heroEyebrow ?? "Bespoke Mystery Experience";
  const heroCaption =
    kit.heroCaption ??
    (kit.openingBrief
      ? `${openingHook}.`
      : "Hosted chaos, beautiful clues, and a killer reveal");
  const partyEnergyLine = [kit.difficulty, kit.duration, kit.players]
    .filter(Boolean)
    .join(" • ");
  const partyEnergyLabel =
    kit.partyEnergyLabel ||
    partyEnergyLine ||
    "Vibrant, stylish, and easy to host";
  const helperMessage =
    kit.helperMessage ??
    "Playable now for your next party night. Personalized versions and expanded kit options are on the way.";
  const perfectFor =
    kit.perfectFor ??
    [kit.tags?.[0], kit.tags?.[1], "Dinner parties", "First-time hosts"].filter(
      Boolean,
    );
  const hostNotes = kit.hostNotes ?? [
    {
      title: "Easy to host",
      body: "The guide is structured to keep the night moving even if it’s your first mystery party.",
    },
    {
      title: "Flexible energy",
      body: "Play it dramatic or playful depending on your group, and the reveal still lands cleanly.",
    },
  ];
  const seoBlock =
    kit.seoBlock ??
    `A printable ${kit.tags?.[0]?.toLowerCase() ?? "mystery"} murder mystery party kit for ${kit.players ?? "small groups"}, designed for easy hosting, immersive roleplay, and stylish at-home gameplay.`;

  const stackedItems = [
    {
      id: "kit-contents",
      eyebrow: "The Goods",
      title: `What’s inside ${kit.title}`,
      preview:
        kit.includes?.slice(0, 2).join(" • ") ||
        "Digital clues, host guides, and more.",
      content: (
        <ul className="grid grid-cols-1 gap-2 text-sm">
          {kit.includes?.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 rounded-lg border border-black/5 bg-stone-50 px-3 py-2 text-stone-700"
            >
              <span className="text-amber-600">✦</span> {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "characters",
      eyebrow: "The Suspects",
      title: "Meet the Roster",
      preview: `${characterCount} playable characters`,
      content: (
        <div className="-mx-4 -mb-4 -mt-3">
          <KitCharacterRosterCard
            kitSlug={kit.slug}
            characters={kit.characters ?? []}
          />
        </div>
      ),
    },
  ];

  const desktopFacts = [
    { label: "Cast", value: `${kit.players} Suspects`, icon: "👥" },
    { label: "Runtime", value: kit.duration || "2-3 Hours", icon: "⏱️" },
    { label: "Vibe", value: kit.difficulty || "Intermediate", icon: "🔥" },
  ];

  const storyMoments = kit.experienceHighlights ?? [
    {
      title: `Built for ${kit.tags?.[0] ?? "themed"} nights`,
      quote:
        kit.openingBrief?.slice(0, 120).trim() +
          (kit.openingBrief && kit.openingBrief.length > 120 ? "…" : "") ||
        kit.description,
      name: primaryLocation,
      accent: "from-fuchsia-200 via-rose-100 to-orange-100",
      tilt: "lg:-rotate-1",
    },
    {
      title: "Packed with clues and character drama",
      quote:
        evidenceCount > 0
          ? `${evidenceCount} evidence items, ${characterCount} characters, and a host-ready structure designed to keep the momentum going.`
          : `${characterCount} characters, printable materials, and a host-friendly flow designed to keep the mystery moving.`,
      name: `${kit.duration || "Party-night ready"}`,
      accent: "from-sky-200 via-cyan-100 to-teal-100",
      tilt: "lg:rotate-1",
    },
  ];

  const partyFlow = kit.experienceSteps ?? [
    {
      step: "01",
      title: `Set your ${kit.players ?? "guest"} lineup`,
      body: `Choose the right player mix, match the party size, and get everyone ready to enter ${primaryLocation}.`,
      accent: "from-fuchsia-200 to-rose-100",
    },
    {
      step: "02",
      title: "Assign characters",
      body:
        characterCount > 0
          ? `Hand out ${characterCount} suspicious roles filled with motives, secrets, and messy interpersonal tension.`
          : "Give each guest a role, a motive, and enough juicy information to stir the room up.",
      accent: "from-sky-200 to-cyan-100",
    },
    {
      step: "03",
      title:
        evidenceCount > 0 ? "Trade clues and evidence" : "Unpack the clues",
      body:
        evidenceCount > 0
          ? `Work through ${evidenceCount} evidence pieces, prompts, and reveals that keep the mystery moving without awkward pauses.`
          : "Use the host guide, evidence, and prompts to keep the mystery moving without awkward pauses.",
      accent: "from-amber-200 to-yellow-100",
    },
    {
      step: "04",
      title: "Accuse and reveal",
      body: `Let guests debate, accuse, and reconstruct the final hour before revealing who turned ${kit.tags?.[0]?.toLowerCase() ?? "the party"} into a crime scene.`,
      accent: "from-emerald-200 to-teal-100",
    },
  ];

  const previewCards = kit.materialPreviews ?? [
    {
      label: "Host Guide",
      title: `A ${kit.duration || "party-night"} pacing plan`,
      body: `Keeps your rounds, reveals, and timing smooth${kit.duration ? ` across a ${kit.duration} experience` : " even if it’s your first time hosting"}.`,
      style: "from-fuchsia-50 via-white to-rose-50",
      badge: "Run the night",
    },
    {
      label: "Character Sheets",
      title:
        characterCount > 0
          ? `${characterCount} suspicious roles to play`
          : "Secrets, motives, and drama",
      body:
        kit.characters?.[0]?.summary ??
        "Every player steps in with a role that feels specific, suspicious, and party-ready.",
      style: "from-sky-50 via-white to-cyan-50",
      badge: "Instant roleplay",
    },
    {
      label: evidenceCount > 0 ? "Evidence Pack" : "Case Materials",
      title: kit.evidence?.[0]?.title ?? "Printable clues with personality",
      body:
        kit.evidence?.[0]?.summary ??
        "Messages, notes, receipts, and reveals designed to feel theatrical and easy to follow.",
      style: "from-amber-50 via-white to-yellow-50",
      badge: evidenceCount > 0 ? `${evidenceCount} clues` : "Tangible proof",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbf7ef_0%,#f7f2e8_48%,#f8f5ef_100%)] text-stone-900 selection:bg-amber-200/70 dark:bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.22),_transparent_24%),linear-gradient(180deg,#050505_0%,#0b0b10_42%,#101018_100%)] dark:text-white dark:selection:bg-amber-300/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Decor */}
      <div className="pointer-events-none fixed left-[10%] top-0 h-80 w-80 rounded-full bg-amber-200/30 blur-[120px] dark:bg-fuchsia-500/14" />
      <div className="pointer-events-none fixed bottom-0 right-[8%] h-96 w-96 rounded-full bg-rose-100/35 blur-[140px] dark:bg-cyan-400/12" />
      <div className="pointer-events-none fixed left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/25 blur-[120px] dark:bg-amber-300/10" />

      <main className="relative z-10">
        {/* --- MOBILE VIEW (Preserving the "Mirror Blur" design) --- */}
        <section className="lg:hidden">
          <header className="px-6 pt-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 via-amber-50 to-cyan-50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-fuchsia-700 shadow-[0_10px_30px_-20px_rgba(217,70,239,0.45)] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/80 dark:shadow-[0_16px_36px_-24px_rgba(0,0,0,0.75)]">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
              {heroEyebrow}
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 dark:text-white">
              {kit.title}
            </h1>
          </header>

          <div className="mt-8 px-1 pb-12">
            <article className="overflow-hidden rounded-[40px] border border-stone-200 bg-white/80 shadow-[0_24px_70px_-40px_rgba(68,64,60,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.88)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={kit.imageUrl}
                  alt={kit.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-x-6 bottom-6 rounded-full bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-700 shadow-[0_12px_24px_-18px_rgba(68,64,60,0.45)] backdrop-blur-sm dark:border dark:border-white/10 dark:bg-black/45 dark:text-white/80 dark:shadow-[0_18px_36px_-20px_rgba(0,0,0,0.78)]">
                  {heroCaption}
                </div>
              </div>

              {/* The "Key Piece": Mirrored Reflection Effect */}
              <div className="relative isolate -mt-px overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={kit.imageUrl}
                    alt=""
                    fill
                    className="object-cover object-top scale-y-[-1] opacity-35 blur-md"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-stone-100/85 to-[#f7f2e8] dark:from-black/15 dark:via-[#0f1118]/90 dark:to-[#07080d]" />
                <div className="absolute inset-0 backdrop-blur-xl dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_36%)]" />

                <div className="relative z-10 p-5 space-y-6">
                  <p className="text-sm leading-relaxed text-stone-700 dark:text-white/72">
                    {kit.description}
                  </p>

                  {kit.betaNotice ? (
                    <div className="mb-6 rounded-3xl border border-amber-500/35 bg-amber-100 px-4 py-4 text-sm leading-relaxed text-amber-950 shadow-[0_20px_60px_-30px_rgba(251,191,36,0.35)] dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
                      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 dark:text-amber-300/90">
                        Beta Notice
                      </span>
                      {kit.betaNotice}
                    </div>
                  ) : null}

                  <div className="rounded-[22px] border border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 via-white to-cyan-50 px-4 py-3 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.28)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(217,70,239,0.14),rgba(255,255,255,0.05),rgba(34,211,238,0.12))] dark:shadow-[0_24px_40px_-28px_rgba(0,0,0,0.8)]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-white/48">
                      Party energy
                    </p>
                    <p className="mt-1 text-sm font-semibold text-stone-900 dark:text-white">
                      {partyEnergyLabel}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(kit.tags ?? []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/50 bg-white/70 px-3 py-1 text-[11px] font-medium text-stone-700 shadow-[0_10px_20px_-16px_rgba(68,64,60,0.4)] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/78 dark:shadow-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Suspense
                    fallback={
                      <div className="h-20 animate-pulse rounded-xl bg-stone-200/70" />
                    }
                  >
                    <KitPurchaseDetails
                      ratingValue={kit.rating || 5}
                      ratingCount={kit.ratingCount || 0}
                      ratingStars={"★".repeat(Math.round(kit.rating || 5))}
                      playerOptions={kit.playerOptions ?? []}
                      languages={kit.languages ?? []}
                      darkMode
                    />
                  </Suspense>

                  <CTAButtons kit={kit} />

                  <p className="text-sm leading-relaxed text-stone-600 dark:text-white/58">
                    {helperMessage}
                  </p>

                  {perfectFor.length > 0 && (
                    <section className="space-y-3 rounded-[24px] border border-white/60 bg-white/60 p-4 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_22px_36px_-28px_rgba(0,0,0,0.8)]">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                          Perfect for
                        </h2>
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:bg-cyan-400/12 dark:text-cyan-200">
                          Quick fit check
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {perfectFor.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-stone-200 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-stone-700 shadow-[0_10px_20px_-16px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.06] dark:text-white/78 dark:shadow-none"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="space-y-4 rounded-[28px] border border-white/60 bg-white/60 p-4 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_22px_36px_-28px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                        How the night unfolds
                      </h2>
                      <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-700 dark:bg-fuchsia-500/12 dark:text-fuchsia-200">
                        Easy flow
                      </span>
                    </div>

                    <div className="space-y-3">
                      {partyFlow.map((item) => (
                        <div
                          key={item.step}
                          className="flex gap-3 rounded-[22px] border border-stone-200/80 bg-gradient-to-r from-white to-stone-50 px-3 py-3 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))]"
                        >
                          <div
                            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-sm font-bold text-stone-800 shadow-[0_14px_24px_-18px_rgba(68,64,60,0.4)] dark:text-stone-950 dark:shadow-[0_16px_26px_-16px_rgba(0,0,0,0.65)]`}
                          >
                            {item.step}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-stone-900 dark:text-white">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4 rounded-[28px] border border-white/60 bg-white/60 p-4 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_22px_36px_-28px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                        Preview the materials
                      </h2>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:bg-amber-400/12 dark:text-amber-200">
                        Tangible details
                      </span>
                    </div>

                    <div className="grid gap-3">
                      {previewCards.map((card) => (
                        <article
                          key={card.label}
                          className={`rounded-[24px] border border-stone-200 bg-gradient-to-br ${card.style} p-4 shadow-[0_18px_28px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] dark:shadow-[0_22px_34px_-26px_rgba(0,0,0,0.82)]`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-white/45">
                              {card.label}
                            </p>
                            <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600 dark:bg-white/10 dark:text-white/68">
                              {card.badge}
                            </span>
                          </div>
                          <p className="mt-3 text-base font-semibold text-stone-900 dark:text-white">
                            {card.title}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                            {card.body}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>

                  {hostNotes.length > 0 && (
                    <section className="space-y-3 rounded-[24px] border border-white/60 bg-white/60 p-4 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_22px_36px_-28px_rgba(0,0,0,0.8)]">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                          Host notes
                        </h2>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:bg-emerald-400/12 dark:text-emerald-200">
                          Keep it smooth
                        </span>
                      </div>
                      <div className="space-y-3">
                        {hostNotes.map((note) => (
                          <div
                            key={note.title}
                            className="rounded-[20px] border border-stone-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]"
                          >
                            <p className="text-sm font-semibold text-stone-900 dark:text-white">
                              {note.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                              {note.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {faqItems.length > 0 && (
                    <section className="space-y-4 rounded-[28px] border border-white/60 bg-white/60 p-4 shadow-[0_18px_30px_-24px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_22px_36px_-28px_rgba(0,0,0,0.8)]">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-base font-semibold text-stone-900 dark:text-white">
                          Common Questions
                        </h2>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:bg-amber-400/12 dark:text-amber-200">
                          Fast answers
                        </span>
                      </div>
                      <div className="space-y-3">
                        {faqItems.map((faq) => (
                          <div
                            key={faq.title}
                            className="rounded-[20px] border border-stone-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]"
                          >
                            <p className="text-sm font-semibold text-stone-900 dark:text-white">
                              {faq.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                              {faq.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="border-t border-stone-300/70 pt-6 dark:border-white/10">
                    <KitMobileStackedCards items={stackedItems} theme="light" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* --- DESKTOP VIEW (Modern, Poppy, Bespoke) --- */}
        <section className="hidden lg:block max-w-[1400px] mx-auto px-8 py-20">
          <div className="grid grid-cols-12 items-start gap-14">
            {/* Sticky Left Visuals */}
            <div className="col-span-5 sticky top-12 space-y-8">
              <div className="relative">
                <div className="absolute -left-4 top-10 h-24 w-24 rounded-[28px] bg-gradient-to-br from-fuchsia-200 via-rose-100 to-transparent opacity-80 blur-sm" />
                <div className="absolute -right-5 bottom-10 h-28 w-28 rounded-full bg-gradient-to-br from-sky-200 via-cyan-100 to-transparent opacity-80 blur-md" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border border-stone-200 bg-white shadow-[0_30px_70px_-40px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_36px_90px_-42px_rgba(0,0,0,0.88)]">
                  <Image
                    src={kit.imageUrl}
                    alt={kit.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                    priority
                  />
                </div>
              </div>

              <div className="rounded-[26px] border border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 via-white to-cyan-50 px-5 py-4 shadow-[0_18px_40px_-30px_rgba(68,64,60,0.25)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(217,70,239,0.14),rgba(255,255,255,0.05),rgba(34,211,238,0.12))] dark:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.82)]">
                <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500 dark:text-white/48">
                  Party Energy
                </p>
                <p className="mt-2 text-sm font-semibold text-stone-900 dark:text-white">
                  {partyEnergyLabel}
                </p>
              </div>

              {/* Bento Facts */}
              <div className="grid grid-cols-3 gap-4">
                {desktopFacts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`rounded-[28px] border border-stone-200 bg-gradient-to-br p-5 text-center shadow-[0_16px_40px_-32px_rgba(68,64,60,0.5)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:shadow-[0_24px_44px_-30px_rgba(0,0,0,0.82)] ${
                      index === 0
                        ? "from-fuchsia-50 to-white dark:from-fuchsia-500/12 dark:to-white/[0.04]"
                        : index === 1
                          ? "from-sky-50 to-white dark:from-cyan-500/12 dark:to-white/[0.04]"
                          : "from-amber-50 to-white dark:from-amber-400/12 dark:to-white/[0.04]"
                    }`}
                  >
                    <span className="text-2xl block mb-2">{fact.icon}</span>
                    <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-stone-500 dark:text-white/45">
                      {fact.label}
                    </p>
                    <p className="text-sm font-semibold leading-tight text-stone-900 dark:text-white">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Scrollable Content */}
            <div className="col-span-7 space-y-16">
              <header className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 via-amber-50 to-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-700 shadow-[0_12px_30px_-20px_rgba(217,70,239,0.45)] dark:border-white/10 dark:bg-white/[0.05] dark:text-white/80 dark:shadow-[0_16px_36px_-24px_rgba(0,0,0,0.78)]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400/30"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500"></span>
                  </span>
                  Ready to Host
                </div>
                <h1 className="max-w-4xl text-[clamp(3.75rem,7vw,6rem)] font-semibold tracking-[-0.04em] leading-[0.92] text-stone-900 dark:text-white">
                  {kit.title}
                </h1>
                <p className="max-w-3xl text-xl leading-relaxed text-stone-600 sm:text-2xl dark:text-white/70">
                  {kit.description}
                </p>
                {kit.betaNotice ? (
                  <div className="mb-6 rounded-3xl border border-amber-500/35 bg-amber-100 px-4 py-4 text-sm leading-relaxed text-amber-950 shadow-[0_20px_60px_-30px_rgba(251,191,36,0.35)] dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-amber-900 dark:text-amber-300/90">
                      Beta Notice
                    </span>
                    {kit.betaNotice}
                  </div>
                ) : null}
                <p className="max-w-3xl text-sm leading-relaxed text-stone-500 sm:text-base dark:text-white/55">
                  {helperMessage}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(kit.tags ?? []).slice(0, 5).map((tag, index) => (
                    <span
                      key={tag}
                      className={`rounded-full px-4 py-2 text-sm font-medium shadow-[0_14px_28px_-22px_rgba(68,64,60,0.45)] dark:shadow-none ${
                        index % 3 === 0
                          ? "border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/20 dark:bg-fuchsia-500/12 dark:text-fuchsia-100"
                          : index % 3 === 1
                            ? "border border-sky-200 bg-sky-50 text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/12 dark:text-cyan-100"
                            : "border border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-300/20 dark:bg-amber-400/12 dark:text-amber-100"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              {perfectFor.length > 0 && (
                <section className="space-y-5 rounded-[32px] border border-stone-200 bg-white/82 p-6 shadow-[0_20px_45px_-35px_rgba(68,64,60,0.22)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_28px_54px_-34px_rgba(0,0,0,0.82)]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-700 dark:text-cyan-200">
                      Perfect for
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white">
                      Great match for these party styles
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {perfectFor.map((item, index) => (
                      <span
                        key={item}
                        className={`rounded-full px-4 py-2 text-sm font-medium shadow-[0_14px_28px_-22px_rgba(68,64,60,0.25)] dark:shadow-none ${
                          index % 3 === 0
                            ? "border border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-400/20 dark:bg-fuchsia-500/12 dark:text-fuchsia-100"
                            : index % 3 === 1
                              ? "border border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/20 dark:bg-cyan-500/12 dark:text-cyan-100"
                              : "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/12 dark:text-emerald-100"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              <div className="relative overflow-hidden rounded-[40px] border border-stone-200 bg-white/85 p-10 shadow-[0_30px_70px_-40px_rgba(68,64,60,0.3)] backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_36px_72px_-38px_rgba(0,0,0,0.86)]">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-fuchsia-300 via-amber-300 to-cyan-300 dark:opacity-80" />
                <Suspense fallback={null}>
                  <KitPurchaseDetails
                    ratingValue={kit.rating || 5}
                    ratingCount={kit.ratingCount || 0}
                    ratingStars={"★".repeat(Math.round(kit.rating || 5))}
                    playerOptions={kit.playerOptions ?? []}
                    languages={kit.languages ?? []}
                  />
                </Suspense>
                <div className="mt-10">
                  <CTAButtons kit={kit} />
                </div>
              </div>

              {hostNotes.length > 0 && (
                <section className="space-y-6 rounded-[32px] border border-stone-200 bg-white/82 p-6 shadow-[0_20px_45px_-35px_rgba(68,64,60,0.22)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_28px_54px_-34px_rgba(0,0,0,0.82)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-200">
                        Host notes
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white">
                        Helpful before everyone arrives
                      </h2>
                    </div>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/12 dark:text-emerald-100">
                      Easy hosting cues
                    </span>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-3">
                    {hostNotes.map((note, index) => (
                      <article
                        key={note.title}
                        className={`rounded-[24px] border border-stone-200 p-5 shadow-[0_14px_30px_-24px_rgba(68,64,60,0.24)] dark:border-white/10 dark:shadow-[0_22px_38px_-28px_rgba(0,0,0,0.78)] ${
                          index % 3 === 0
                            ? "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-500/12 dark:to-white/[0.04]"
                            : index % 3 === 1
                              ? "bg-gradient-to-br from-amber-50 to-white dark:from-amber-400/12 dark:to-white/[0.04]"
                              : "bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-500/12 dark:to-white/[0.04]"
                        }`}
                      >
                        <h3 className="text-base font-semibold text-stone-900 dark:text-white">
                          {note.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                          {note.body}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-7 rounded-[36px] border border-stone-200 bg-white/88 p-8 shadow-[0_24px_60px_-42px_rgba(68,64,60,0.24)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.84)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-700 dark:text-fuchsia-200">
                      How it works
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">
                      How the night unfolds
                    </h2>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-fuchsia-100 via-amber-100 to-cyan-100 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-700 dark:bg-[linear-gradient(90deg,rgba(217,70,239,0.14),rgba(251,191,36,0.12),rgba(34,211,238,0.14))] dark:text-white/76">
                    Built for smooth hosting
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {partyFlow.map((item) => (
                    <article
                      key={item.step}
                      className="group rounded-[28px] border border-stone-200 bg-stone-50/80 p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-30px_rgba(68,64,60,0.35)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:shadow-[0_24px_42px_-28px_rgba(0,0,0,0.86)]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-sm font-bold text-stone-800 shadow-[0_14px_28px_-20px_rgba(68,64,60,0.35)] dark:text-stone-950 dark:shadow-[0_18px_30px_-16px_rgba(0,0,0,0.68)]`}
                        >
                          {item.step}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="space-y-7 rounded-[36px] border border-stone-200 bg-white/88 p-8 shadow-[0_24px_60px_-42px_rgba(68,64,60,0.22)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_60px_-34px_rgba(0,0,0,0.84)]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 dark:text-amber-200">
                      Material preview
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">
                      What you’ll actually get
                    </h2>
                  </div>
                  <span className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-white/68">
                    Designed to feel premium
                  </span>
                </div>

                <div className="grid gap-5 lg:grid-cols-3">
                  {previewCards.map((card) => (
                    <article
                      key={card.label}
                      className={`rounded-[30px] border border-stone-200 bg-gradient-to-br ${card.style} p-6 shadow-[0_18px_40px_-30px_rgba(68,64,60,0.3)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] dark:shadow-[0_24px_44px_-28px_rgba(0,0,0,0.84)]`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-white/45">
                          {card.label}
                        </p>
                        <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-600 shadow-[0_10px_20px_-18px_rgba(68,64,60,0.35)] dark:bg-white/10 dark:text-white/68 dark:shadow-none">
                          {card.badge}
                        </span>
                      </div>

                      <div className="mt-6 rounded-[24px] border border-white/80 bg-white/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <div className="h-3 w-20 rounded-full bg-stone-200 dark:bg-white/10" />
                            <div className="rounded-full bg-stone-100 px-2 py-1 text-[10px] font-medium text-stone-500 dark:bg-white/10 dark:text-white/55">
                              {card.badge}
                            </div>
                          </div>
                          <div className="h-3 w-full rounded-full bg-stone-100 dark:bg-white/10" />
                          <div className="h-3 w-5/6 rounded-full bg-stone-100 dark:bg-white/10" />
                          <div className="grid grid-cols-2 gap-2 pt-2">
                            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-white/[0.04] dark:shadow-none">
                              <div className="flex h-16 items-end rounded-xl bg-stone-100 p-2 dark:bg-white/[0.05]">
                                <div className="h-6 w-full rounded-lg bg-stone-200 dark:bg-white/10" />
                              </div>
                            </div>
                            <div className="rounded-2xl bg-white p-3 shadow-sm dark:bg-white/[0.04] dark:shadow-none">
                              <div className="flex h-16 items-center justify-center rounded-xl bg-stone-100 p-2 dark:bg-white/[0.05]">
                                <div className="h-10 w-10 rounded-full bg-stone-200 dark:bg-white/10" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-lg font-semibold text-stone-900 dark:text-white">
                        {card.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-white/62">
                        {card.body}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Exploration Section */}
              <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">
                    Inside the Kit
                  </h2>
                  <span className="rounded-full bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white dark:border dark:border-white/10 dark:bg-white/[0.06] dark:text-white/78">
                    Tap to explore
                  </span>
                </div>
                <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white/80 shadow-[0_20px_50px_-40px_rgba(68,64,60,0.35)] ring-1 ring-fuchsia-100/60 dark:border-white/10 dark:bg-white/[0.04] dark:ring-white/10 dark:shadow-[0_28px_50px_-34px_rgba(0,0,0,0.84)]">
                  <KitMobileStackedCards
                    theme="light"
                    items={stackedItems.map((i) => ({
                      ...i,
                      id: `dt-${i.id}`,
                    }))}
                  />
                </div>
              </section>

              {/* Guestbook / User Stories */}
              <section className="space-y-6">
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-white">
                  Snapshot of the experience
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {storyMoments.map((s, i) => (
                    <div
                      key={i}
                      className={`rounded-[32px] border border-white/80 bg-gradient-to-br ${s.accent} p-8 shadow-[0_22px_45px_-30px_rgba(68,64,60,0.35)] transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] dark:shadow-[0_28px_48px_-32px_rgba(0,0,0,0.84)] ${s.tilt}`}
                    >
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-white/45">
                        {s.title}
                      </p>
                      <p className="mb-4 text-xl font-semibold leading-relaxed text-stone-800 dark:text-white/88">
                        &ldquo;{s.quote}&rdquo;
                      </p>
                      <span className="text-sm font-medium text-stone-500 dark:text-white/55">
                        — {s.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section className="border-t border-stone-200 pt-16 dark:border-white/10">
                <h2 className="mb-10 text-4xl font-semibold tracking-tight text-stone-900 dark:text-white">
                  Common Questions
                </h2>
                <div className="space-y-8">
                  {faqItems.map((faq) => (
                    <div key={faq.title} className="group">
                      <h3 className="mb-2 text-xl font-semibold text-stone-900 transition-colors group-hover:text-amber-700 dark:text-white dark:group-hover:text-amber-200">
                        {faq.title}
                      </h3>
                      <p className="text-lg leading-relaxed text-stone-600 dark:text-white/62">
                        {faq.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <section className="border-t border-stone-200/80 bg-white/35 px-6 py-10 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-white/45">
            About this mystery kit
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-stone-600 sm:text-[15px] dark:text-white/62">
            {seoBlock}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/**
 * CTA Button Helper
 */
function CTAButtons({ kit }: { kit: MysteryKit }) {
  const btnClass =
    "inline-flex min-h-[56px] flex-1 items-center justify-center rounded-2xl px-6 text-base font-semibold transition-all duration-200";
  const primaryLabel = kit.ctaPrimaryLabel ?? "Enter Play Mode";
  const secondaryLabel = kit.ctaSecondaryLabel ?? "Personalizing Soon";
  const sampleLabel = kit.ctaSampleLabel ?? "Sample";

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {kit.isPlayable && (
        <Link
          href={`/kits/${kit.slug}/play`}
          className={`${btnClass} bg-stone-900 text-white shadow-[0_18px_35px_-24px_rgba(28,25,23,0.6)] hover:bg-stone-800 dark:bg-white dark:text-stone-950 dark:shadow-[0_18px_35px_-24px_rgba(255,255,255,0.2)] dark:hover:bg-white/90`}
        >
          {primaryLabel}
        </Link>
      )}
      <button
        className={`${btnClass} cursor-not-allowed border border-stone-300 bg-white/70 text-stone-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/48`}
      >
        {secondaryLabel}
      </button>
      {kit.hasDownloadSample && (
        <button className="min-h-[56px] rounded-2xl border border-amber-300 bg-amber-50 px-8 font-semibold text-amber-800 transition-all hover:bg-amber-100 dark:border-amber-300/20 dark:bg-amber-400/12 dark:text-amber-100 dark:hover:bg-amber-400/18">
          {sampleLabel}
        </button>
      )}
    </div>
  );
}
