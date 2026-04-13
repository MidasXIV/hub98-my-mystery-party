import { parseClueContent } from "@/lib/clue-utils";

interface ClueViewerProps {
  content: string;
}

export default function ClueViewer({ content }: ClueViewerProps) {
  const parsedClue = parseClueContent(content);

  return (
    <div className="bg-[#f0e6d6] text-black p-8 font-special-elite max-w-md w-full border-t-8 border-red-700">
      <h3 className="text-sm uppercase text-center text-red-900/80 tracking-widest mb-6">
        EVIDENCE LOG: CLUE
      </h3>
      <p className="text-3xl text-center leading-relaxed">{parsedClue.clue}</p>
      {parsedClue.forObjective ? (
        <p className="mt-5 text-xs text-center uppercase tracking-wider text-red-900/70">
          For objective: {parsedClue.forObjective}
        </p>
      ) : null}
    </div>
  );
}
