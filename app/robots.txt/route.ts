import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function GET(_req: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5000";
  const body = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

