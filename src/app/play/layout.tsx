import React from "react";
import PlayAccessGate from "@/components/play-access-gate";
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
        <PlayAccessGate
          browseHref="/cases"
          browseLabel="Browse cases first"
          heading="Sign in to access the case board"
          description="To play a mystery, save progress, and unlock interactive board features, you’ll need to sign in first."
          bullets={[
            "Access the interactive board and evidence overlays",
            "Keep your mystery progress tied to your account",
            "Jump back into active cases without losing your place",
          ]}
          wrapperClassName="h-full w-full"
        >
          {children}
        </PlayAccessGate>
      </ThemeProvider>
    </div>
  );
}