"use client";

import React from "react";

interface CaseActionsProps {
  slug: string;
}

export const CaseActions: React.FC<CaseActionsProps> = ({ slug }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <button type="button" tabIndex={0} className="w-full md:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition text-white font-semibold text-lg shadow-lg shadow-indigo-600/30 cursor-pointer">
        Add to Cart
      </button>
      <button type="button" tabIndex={0} className="w-full md:w-auto px-8 py-4 rounded-xl bg-green-600 hover:bg-green-500 active:bg-green-700 transition text-white font-semibold text-lg shadow-lg shadow-green-600/30 cursor-pointer">
        Download
      </button>
      <button
        type="button"
        tabIndex={0}
        className="w-full md:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition text-white font-semibold text-lg shadow-lg shadow-blue-600/30 cursor-pointer"
        onClick={() => window.location.href = `/play/${slug}`}
      >
        Play
      </button>
    </div>
  );
};
