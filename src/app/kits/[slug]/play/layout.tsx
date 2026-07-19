import React from "react";
import PlayAccessGate from "@/components/play-access-gate";
import { ThemeProvider } from "@/components/theme-provider";

export default function KitPlayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <PlayAccessGate
          browseHref="/kits"
          browseLabel="Browse kits"
          heading="Sign in to access play mode"
          description="To play a kit, save progress, and unlock interactive features, you’ll need to sign in first."
          bullets={[
            "Access the interactive board and evidence overlays",
            "Keep your mystery progress tied to your account",
            "Jump back into active kits without losing your place",
          ]}
          wrapperClassName="min-h-screen w-full"
        >
          {children}
        </PlayAccessGate>
      </ThemeProvider>
    </div>
  );
}
