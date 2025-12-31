import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

type BlogCard = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
};

export async function GET() {
  const posts = getAllPosts();
  const cards: BlogCard[] = posts.map((p) => {
    const desc = p.description || "";
    const short = desc.length > 160 ? `${desc.slice(0, 157)}…` : desc;
    const image = p.heroImage || "/opengraph/hero.png";
    return {
      slug: p.slug,
      title: p.title,
      description: desc,
      shortDescription: short,
      image,
    };
  });

  return NextResponse.json(cards, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
    },
  });
}