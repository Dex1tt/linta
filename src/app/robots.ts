import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/siteConfig";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/book", "/demo", "/privacy", "/terms", "/personal-data-consent"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
