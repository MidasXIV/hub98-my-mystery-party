import { mysteryKits } from "@/data/mysteryKits";
import KitCard from "@/components/kit-card";
import Footer from "@/components/footer";

export const metadata = {
  title: "Mystery Party Kits | Mystery Party",
  description:
    "Browse all mystery party kits and pick the perfect whodunit for your next event.",
};

export default function MysteryKitsIndexPage() {
  return (
    <>
      <div className="bg-background text-text-primary min-h-screen px-4 sm:px-6 lg:px-8 py-20 font-sans">
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Mystery Party Kits
          </h1>
          <p className="max-w-2xl text-text-secondary">
            Host a full-blown whodunit with curated story beats, character cards,
            and immersive evidence. Pick a kit, set the scene, and let the
            accusations fly.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-10 md:gap-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3 place-items-center">
            {mysteryKits.map((kit) => (
              <KitCard key={kit.id} kitData={kit} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
