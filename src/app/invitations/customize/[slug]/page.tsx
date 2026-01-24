import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug, invitationDesigns } from "@/data/invitations";
import { getBaseUrl } from "@/lib/blog";
import CustomizePanel from "@/components/invitations/CustomizePanel";

export const metadata: Metadata = {
  title: "Customize Invitation",
  description: "Personalize colors, text, blocks, surveys, and sharing options.",
};

// Ensure static generation for all invitation slugs
export const dynamic = "force-static";
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return invitationDesigns.map((d) => ({ slug: d.slug }));
}

export default async function CustomizeInvitationPage({ params }: { params: { slug: string } }) {
  const resolved = params instanceof Promise ? await params : params;
  const slug = resolved.slug;
  
  const design = getInvitationBySlug(slug);
  if (!design) return notFound();
  const baseUrl = getBaseUrl();
  return (
    <section className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Customize: {design.title}</h1>
          <p className="text-muted-foreground">Start with the default style and make it yours.</p>
        </header>
        <CustomizePanel design={design} baseUrl={baseUrl} />
      </div>
    </section>
  );
}
