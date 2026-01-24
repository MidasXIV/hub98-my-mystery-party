import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInvitationBySlug, invitationDesigns } from "@/data/invitations";
import InvitationPreview from "@/components/invitations/InvitationPreview";
import EnvelopePreview from "@/components/invitations/EnvelopePreview";
import PhotoGallery from "@/components/invitations/PhotoGallery";

type Params = { slug: string };

// Ensure static generation for all invitation slugs
export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return invitationDesigns.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const resolved = params instanceof Promise ? await params : params;
  const slug = resolved.slug;
  
    // const { slug } = await params;
  const design = getInvitationBySlug(slug);
  if (!design) return {};
  return {
    title: `${design.title} – Online Invitation`,
    description: design.description,
    alternates: { canonical: `/invitations/${design.slug}` },
    openGraph: {
      type: "article",
      title: `${design.title} – Online Invitation`,
      description: design.description,
      images: [design.imageUrl, ...design.gallery].slice(0, 4),
    },
  };
}

export default async function InvitationProductPage({ params }: { params: Params }) {
  const resolved = params instanceof Promise ? await params : params;
  const slug = resolved.slug;

  const design = getInvitationBySlug(slug);
  if (!design) return notFound();

  return (
    <section className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/invitations" className="hover:text-foreground">Invitations</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium">{design.title}</li>
          </ol>
        </nav>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[72px_minmax(0,1fr)_380px] gap-6 items-start">
          {/* Left icon rail (visual + anchor links) */}
          <aside className="hidden lg:flex flex-col items-center gap-4 pt-2">
            <a
              href="#card"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ✉
              </span>
              Card
            </a>
            <a
              href="#preview"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ▶
              </span>
              Preview
            </a>
            <a
              href="#styles"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ✎
              </span>
              Page styles
            </a>
            <a
              href="#surveys"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ≡
              </span>
              Guest surveys
            </a>
            <a
              href="#share"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ⤴
              </span>
              Share
            </a>
            <a
              href="#tracking"
              className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card group-hover:bg-muted">
                ✓
              </span>
              Tracking
            </a>
          </aside>

          {/* Center stage: card + envelope deck */}
          <div id="card" className="min-w-0">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="relative p-4 sm:p-6">
                <div className="relative min-h-[520px] sm:min-h-[640px] lg:min-h-[720px]">
                  <div className="absolute left-0 top-0 w-[62%] sm:w-[58%]">
                    <InvitationPreview
                      primaryColor={design.defaultColors.primary}
                      secondaryColor={design.defaultColors.secondary}
                      accentColor={design.defaultColors.accent}
                      headline={design.defaultText.headline}
                      subheadline={design.defaultText.subheadline}
                      details={design.defaultText.details}
                      footer={design.defaultText.footer}
                    />
                  </div>
                  <div className="absolute right-0 top-12 w-[54%] sm:w-[52%]">
                    <EnvelopePreview accentColor={design.defaultColors.accent} />
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-8" id="preview">
              <h2 className="text-lg font-semibold">More photos</h2>
              <p className="mt-1 text-sm text-muted-foreground">See how this design looks in different colors and layouts.</p>
              <div className="mt-3">
                <PhotoGallery images={design.gallery} />
              </div>
            </div>

            {/* Details (anchors for left rail) */}
            <div className="mt-10 space-y-4">
              <div id="styles" className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold">Page styles</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick colors, fonts, and layout options so the invite looks great on phones and laptops.
                </p>
              </div>
              <div id="surveys" className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold">Guest surveys</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ask quick questions like food preferences, song requests, or “Who’s bringing what?”
                </p>
              </div>
              <div id="share" className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold">Text + shareable links</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send by text, email, or copy a link to share anywhere.
                </p>
              </div>
              <div id="tracking" className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold">Tracking</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keep an eye on deliveries, opens, and RSVPs from your dashboard.
                </p>
                <Link href="/invitations/dashboard" className="mt-3 inline-flex text-sm font-medium text-primary hover:underline">
                  Go to RSVP dashboard
                </Link>
              </div>
            </div>
          </div>

          {/* Right sticky panel */}
          <aside className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold leading-tight">{design.title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">Online invitation</p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                  aria-label="Save"
                  title="Save"
                >
                  ♡
                </button>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Starting at</p>
                <p className="mt-1 text-xl font-semibold">
                  {design.basePrice.toFixed(2)} <span className="text-sm text-muted-foreground">USD</span>
                </p>
                <Link href="#" className="mt-1 inline-flex text-sm text-primary hover:underline">
                  How pricing works
                </Link>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-sm font-medium">Color</p>
                  <div className="mt-2 flex items-center gap-2">
                    {[design.defaultColors.primary, design.defaultColors.accent, design.defaultColors.secondary].map((c) => (
                      <span
                        key={c}
                        className="inline-flex h-8 w-8 rounded-full border border-border"
                        style={{ backgroundColor: c }}
                        aria-label="Color option"
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium" htmlFor="eventType">
                    What kind of event are you having?
                  </label>
                  <select
                    id="eventType"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                    defaultValue="personal"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                  </select>
                </div>
              </div>

              <Link
                href={`/invitations/customize/${design.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-primary text-primary-foreground px-4 py-3 font-semibold hover:opacity-90"
              >
                Customize
              </Link>
              <a href="#card" className="mt-3 inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
                <span aria-hidden="true">▶</span>
                Preview
              </a>

              <div className="mt-6 space-y-4 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span aria-hidden="true">🎨</span>
                  <p>Customize colors, photos, and text guests see when they open your invite.</p>
                </div>
                <div className="flex gap-3">
                  <span aria-hidden="true">🧩</span>
                  <p>Add details like schedules, travel tips, speakers, and photo galleries with blocks.</p>
                </div>
                <div className="flex gap-3">
                  <span aria-hidden="true">✉</span>
                  <p>Send by text, email, or share a link. Track RSVPs in one place.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
