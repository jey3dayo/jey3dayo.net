import { publicSiteOriginFromEnv } from "../lib/resolve-public-site-origin";

const siteOrigin = publicSiteOriginFromEnv();

export function GET() {
  const sitemapUrl = new URL("/sitemap.xml", siteOrigin).toString();
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
