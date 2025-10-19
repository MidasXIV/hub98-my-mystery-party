import React from "react";
import { getCaseBySlug, Evidence } from "@/data/coldCases";
import Image from "next/image";

interface PlayPageProps {
  params: { slug: string };
}

export default function PlayBoardPage({ params }: PlayPageProps) {
  const caseFile = getCaseBySlug(params.slug);
  if (!caseFile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Case Not Found</h1>
      </div>
    );
  }

  // Placeholder for evidence pinning board
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Detective Board: {caseFile.title}</h1>
        <div className="relative w-full h-[600px] bg-yellow-50 border-4 border-yellow-300 rounded-3xl shadow-2xl flex flex-wrap gap-8 p-8">
          {/* Example evidence pins */}
          {caseFile.evidence?.map((evidence: Evidence, idx: number) => (
            <div key={idx} className={`absolute left-[${20 * idx}%] top-[${10 * idx}%]`}>
              <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-300">
                <h2 className="font-semibold text-lg mb-2">{evidence.title}</h2>
                <p className="text-sm text-gray-700">{evidence.description}</p>
                {evidence.imageUrl && (
                  <Image src={evidence.imageUrl} alt={evidence.title} width={120} height={120} className="rounded mt-2" />
                )}
              </div>
            </div>
          ))}
          {/* TODO: Add drag-and-drop pinning functionality */}
        </div>
        <p className="mt-8 text-text-secondary">Pin and organize the evidence to solve the case!</p>
      </div>
    </div>
  );
}
