"use client";
import React from "react";
import { ThemeProvider } from "@/components/theme-provider";

// Dedicated layout for /play section to maximize board area and remove scrolling/header.
// Keeps full-screen space, prevents body scroll, and provides an isolated theme context.

export default function PlaySectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* children should implement their own overlays; header intentionally omitted */}
        {children}
      </ThemeProvider>
    </div>
  );
}