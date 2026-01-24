import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { invitationDesigns } from "@/data/invitations";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Online Invitations – Customize & Send",
  description:
    "Create beautiful, SEO-friendly online invitations. Customize colors, text, blocks, surveys, and send via email, text, or link—with RSVP tracking.",
  alternates: { canonical: "/invitations" },
};

export default async function InvitationsLandingPage() {
  // Server Component: initial render SEO-friendly, no client directive.
  return (
    <>
      {/* Hero section */}
      <section className="bg-background text-foreground font-sans">
        <div className="relative">
          <div
            className="h-[320px] md:h-[420px] w-full bg-cover bg-center"
            style={{ backgroundImage: "url(/features_section/invitations/hero.jpg)" }}
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Beautiful invitations, made easy</h1>
                <p className="mt-3 text-muted-foreground">
                  Pick a design, make it yours, and send it by text, email, or link. Guests can RSVP in seconds.
                </p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="#designs"
                    className="inline-flex items-center rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold shadow hover:opacity-90"
                  >
                    Browse designs
                  </Link>
                  <Link
                    href="/invitations/dashboard"
                    className="inline-flex items-center rounded-xl bg-secondary text-secondary-foreground px-5 py-3 font-semibold shadow hover:opacity-90"
                  >
                    See who’s coming
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-border p-4">
              <h3 className="font-semibold">Easy to use</h3>
              <p className="text-sm text-muted-foreground mt-1">No design skills needed. Just edit the text and colors.</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <h3 className="font-semibold">Share in seconds</h3>
              <p className="text-sm text-muted-foreground mt-1">Send by text, email, or share a simple link.</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <h3 className="font-semibold">Track RSVPs</h3>
              <p className="text-sm text-muted-foreground mt-1">See who opened, replied, and who’s attending.</p>
            </div>
          </div>
        </div>

        {/* Marketplace-style listing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Browse designs</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Pick a look you love. You can change colors and text later.
            </div>
          </div>

          <div id="designs" className="space-y-6">
            {invitationDesigns.map((d) => (
              <article key={d.id} className="rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Showcase image */}
                  <Link href={`/invitations/${d.slug}`} className="lg:col-span-5">
                    {/* Flyer-friendly preview frame: letterboxed, object-contain for tall images */}
                    <div className="relative h-72 lg:h-[22rem] w-full bg-muted/40 border-b lg:border-r border-border">
                      <Image
                        src={d.imageUrl}
                        alt={d.title}
                        fill
                        sizes="(min-width:1024px) 40vw, 100vw"
                        style={{ objectFit: "contain" }}
                        className="rounded-md"
                      />
                    </div>
                  </Link>

                  {/* Details & mini gallery */}
                  <div className="lg:col-span-7 p-4 lg:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold truncate">{d.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{d.description}</p>

                        {/* Quick color swatches */}
                        {d.defaultColors && (
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Colors:</span>
                            <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: d.defaultColors.primary }} />
                            <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: d.defaultColors.secondary }} />
                            <span className="h-4 w-4 rounded-full border border-border" style={{ backgroundColor: d.defaultColors.accent }} />
                          </div>
                        )}

                        {/* Badges */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs rounded-full border border-border">{d.defaultType === "professional" ? "Work event" : "Personal"}</span>
                          <span className="px-2 py-1 text-xs rounded-full border border-border">From ${d.basePrice.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="hidden lg:flex flex-col items-end gap-2">
                        <Link href={`/invitations/${d.slug}`} className="inline-flex items-center rounded-xl bg-muted px-3 py-2 text-sm hover:bg-muted/80">See design</Link>
                        <Link href={`/invitations/customize/${d.slug}`} className="inline-flex items-center rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90">Start customizing</Link>
                      </div>
                    </div>

                    {/* Mini gallery */}
                    {Array.isArray(d.gallery) && d.gallery.length > 0 && (
                      <div className="mt-4 flex items-center gap-3">
                        {d.gallery.slice(0, 3).map((img, idx) => (
                          <Link key={img + idx} href={`/invitations/${d.slug}`} className="block">
                            <div className="relative h-16 w-24 rounded-lg border border-border bg-muted/40">
                              <Image src={img} alt="" fill sizes="96px" style={{ objectFit: "contain" }} className="rounded" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Actions for small/medium screens */}
                    <div className="mt-4 lg:hidden grid grid-cols-2 gap-2">
                      <Link href={`/invitations/${d.slug}`} className="inline-flex items-center justify-center rounded-xl bg-muted px-3 py-2 text-sm hover:bg-muted/80">See design</Link>
                      <Link href={`/invitations/customize/${d.slug}`} className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-3 py-2 text-sm font-semibold hover:opacity-90">Start customizing</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* Page-local footer */}
      <Footer />
    </>
  );
}
