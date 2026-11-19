import type { NextConfig } from "next";

const localImagePatterns = [
  {
    pathname: "/blog/banner",
  },
  {
    pathname: "/blog_banners/**",
    search: "",
  },
  {
    pathname: "/opengraph/**",
    search: "",
  },
  {
    pathname: "/cold_cases/**",
    search: "",
  },
  {
    pathname: "/cold_case_data/**",
    search: "",
  },
  {
    pathname: "/features_section/**",
    search: "",
  },
  {
    pathname: "/invitations/**",
    search: "",
  },
  {
    pathname: "/mystery_kits/**",
    search: "",
  },
];

const nextConfig: NextConfig = {
  // These assets are served publicly, never read through fs by server handlers.
  outputFileTracingExcludes: {
    "/*": [
      "./public/cold_case_data/**/*",
      "./public/hero/**/*",
      "./public/features_section/**/*",
    ],
  },
  images: {
    domains: ["images.unsplash.com", "github.com", "kioubj9rw7g55npk.public.blob.vercel-storage.com"],
    localPatterns: localImagePatterns,
  },
  async rewrites() {
    return [
      // Allow visiting /category/:category directly (alias of /blog/category/:category)
      { source: "/category/:category", destination: "/blog/category/:category" },
      { source: "/admin/analytics", destination: "/analytics" },
    ];
  },
};

export default nextConfig;
