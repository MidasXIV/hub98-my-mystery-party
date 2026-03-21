import type { ReactNode } from "react";
import type { ColdCase } from "@/data/coldCases";
import RelatedCasesCarousel from "@/components/related-cases-carousel";

interface RelatedCasesProps {
  currentSlug: string;
  currentTags: string[];
  cases: ColdCase[];
  limit?: number;
}

function isCaseAvailable(coldCase: ColdCase) {
  return Boolean(coldCase.isPurchasable || coldCase.isPlayable);
}

function getRecommendationScore(candidate: ColdCase, currentTags: string[]) {
  const currentTagSet = new Set(currentTags.map((tag) => tag.toLowerCase()));
  const sharedTagCount = candidate.tags.reduce((count, tag) => {
    return count + (currentTagSet.has(tag.toLowerCase()) ? 1 : 0);
  }, 0);

  const isAvailable = isCaseAvailable(candidate);
  const availabilityScore = isAvailable ? 1000 : -1000;

  return availabilityScore + sharedTagCount * 10 + candidate.id;
}

function buildLinkNarration(coldCase: ColdCase, isAvailable: boolean): ReactNode {
  return (
    <span className="sr-only">
      {isAvailable ? "Play" : "Preview"} {coldCase.pageTitle || coldCase.title}.
      {coldCase.shortDescription || coldCase.description}
    </span>
  );
}

export default function RelatedCases({
  currentSlug,
  currentTags,
  cases,
  limit = 5,
}: RelatedCasesProps) {
  const suggestions = cases
    .filter((coldCase) => coldCase.slug !== currentSlug)
    .sort(
      (a, b) =>
        getRecommendationScore(b, currentTags) -
        getRecommendationScore(a, currentTags)
    )
    .slice(0, limit);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-14 rounded-[2rem] border border-subtle-stroke bg-white/[0.03] px-4 py-6 shadow-[0_25px_80px_-50px_rgba(0,0,0,0.55)] sm:px-6 lg:mt-16 lg:px-8"
      aria-labelledby="related-cases-heading"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-secondary/80">
            Keep investigating
          </p>
          <h2 id="related-cases-heading" className="mt-2 text-2xl font-semibold sm:text-3xl">
            Explore other cold cases
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Swipe or tap through the next best case files based on shared themes,
            tone, and availability.
          </p>
        </div>
      </div>

      <ul className="sr-only">
        {suggestions.map((coldCase) => {
          const isAvailable = isCaseAvailable(coldCase);
          return (
            <li key={coldCase.slug}>
              <a href={`/cases/${coldCase.slug}`}>
                {buildLinkNarration(coldCase, isAvailable)}
              </a>
            </li>
          );
        })}
      </ul>

      <RelatedCasesCarousel suggestions={suggestions} currentTags={currentTags} />
    </section>
  );
}