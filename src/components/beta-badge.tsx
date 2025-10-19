import React from "react";
import { cn } from "@/lib/utils";

interface BetaBadgeProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "corner" | "inline";
}

// Small reusable Beta badge. Corner variant is positioned absolutely by parent.
export const BetaBadge: React.FC<BetaBadgeProps> = ({ className, children = "Beta", variant = "inline" }) => {
  if (variant === "corner") {
    return (
      <span
        className={cn(
          "pointer-events-none select-none absolute -top-1 -right-1 px-1.5 py-[2px] rounded-md bg-gradient-to-br from-yellow-300 to-amber-400 text-[10px] font-bold tracking-wide text-black shadow ring-1 ring-black/10",
          className
        )}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "ml-2 px-2 py-0.5 rounded-md bg-yellow-300 text-[11px] font-semibold uppercase tracking-wide text-black shadow-sm ring-1 ring-black/10",
        className
      )}
    >
      {children}
    </span>
  );
};

export default BetaBadge;