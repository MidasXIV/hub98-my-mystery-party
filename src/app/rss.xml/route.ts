import { NextResponse } from "next/server";
import { getAllPosts, getBaseUrl } from "@/lib/blog";

export async function GET() {
  const base = getBaseUrl();
  const posts = getAllPosts();

  const items = posts
    .map((p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid>${base}/blog/${p.slug}</guid>
      <description><![CDATA[${p.description ?? ""}]]></description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>My Mystery Party – Blog & Guides</title>
      <link>${base}/blog</link>
      <description>Tips, costumes, and guides for mystery party hosts and players.</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
