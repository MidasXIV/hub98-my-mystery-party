"use client";
import React from "react";

export default function PlaySlugLayout({ children }: { children: React.ReactNode }) {
  // Header removed; page now mounts its own integrated PlayHeader with FilterMenu.
  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      {children}
    </div>
  );
}
