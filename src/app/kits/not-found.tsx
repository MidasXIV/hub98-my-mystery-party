import Link from "next/link";

export default function KitsNotFound() {
  return (
    <main className="min-h-screen bg-background text-text-primary font-sans">
      <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-text-secondary">
          Kits • 404
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          This mystery route went off-script
        </h1>
        <p className="mt-4 max-w-2xl text-base text-text-secondary md:text-lg">
          We couldn&apos;t find that kit page. It may have moved, the slug may be
          incorrect, or the URL points to a route that doesn&apos;t exist yet.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/kits"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Browse all kits
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-subtle-stroke px-6 py-2 text-sm font-semibold text-text-primary transition hover:bg-white/5"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
