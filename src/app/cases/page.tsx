import { coldCases } from "@/data/coldCases";
import CaseCard from "@/components/case-card";
import Footer from "@/components/footer";

export const metadata = {
  title: "All Cold Case Files | Mystery Party",
  description: "Browse all immersive cold case investigation games and pick your next challenge.",
};

export default function CasesIndexPage() {
  return (
    <>
    <div className="bg-background text-text-primary min-h-screen px-4 sm:px-6 lg:px-8 py-20 font-sans">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">All Cold Case Files</h1>
        <p className="max-w-2xl text-text-secondary">
          Dive into every available unsolved mystery. Each case contains unique evidence, timelines, and puzzles. Choose one and start investigating.
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 md:gap-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3 place-items-center">
          {coldCases.map((c) => (
            <CaseCard key={c.id} caseData={c} />
          ))}
        </div>
      </div>
    </div>

      <Footer />
    </>
  );
}