"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function HeaderClientSlot({
  children,
}: {
  children: React.ReactNode;
}) {
  // Intentionally client-only: lets us decide whether to show header based on route.
  // This prevents the header from rendering on /play/* and /print/*.
  const pathname = usePathname();
  const hideGlobalHeader =
    pathname.startsWith("/play/") || pathname.startsWith("/print/");
  if (hideGlobalHeader) return null;
  return <>{children}</>;
}
