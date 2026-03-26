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
  images: {
    domains: ["images.unsplash.com", "github.com", "kioubj9rw7g55npk.public.blob.vercel-storage.com"],
    localPatterns: localImagePatterns,
  },
  async rewrites() {
    return [
      // Allow visiting /category/:category directly (alias of /blog/category/:category)
      { source: "/category/:category", destination: "/blog/category/:category" },
    ];
  },
};

export default nextConfig;
