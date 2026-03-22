import type { NextConfig } from "next";

const localImagePathnames = [
  "/blog/banner",
  "/blog_banners/**",
  "/opengraph/**",
  "/cold_cases/**",
  "/cold_case_data/**",
  "/features_section/**",
  "/invitations/**",
];

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "github.com", "kioubj9rw7g55npk.public.blob.vercel-storage.com"],
    localPatterns: localImagePathnames.map((pathname) => ({
      pathname,
      search: "",
    })),
  },
  async rewrites() {
    return [
      // Allow visiting /category/:category directly (alias of /blog/category/:category)
      { source: "/category/:category", destination: "/blog/category/:category" },
    ];
  },
};

export default nextConfig;
