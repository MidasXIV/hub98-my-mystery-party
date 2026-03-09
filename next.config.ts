import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "github.com", "kioubj9rw7g55npk.public.blob.vercel-storage.com"],
    localPatterns: [
      {
        pathname: "/blog/banner",
      },
      {
        pathname: "/blog_banners/**",
      },
      {
        pathname: "/opengraph/**",
      },
      {
        pathname: "/cold_cases/**",
      },
      {
        pathname: "/cold_case_data/**",
      },
      {
        pathname: "/features_section/**",
      },
      {
        pathname: "/invitations/**",
      },
    ],
  },
  async rewrites() {
    return [
      // Allow visiting /category/:category directly (alias of /blog/category/:category)
      { source: "/category/:category", destination: "/blog/category/:category" },
    ];
  },
};

export default nextConfig;
