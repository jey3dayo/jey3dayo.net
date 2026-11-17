import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { resolvePublicSiteOrigin } from "./config/resolve-site-origin.mjs";

const siteOrigin = resolvePublicSiteOrigin(process.env.PUBLIC_SITE_ORIGIN);
// Astro / Vite がビルド時に参照する PUBLIC_* を壊れた値のままにしない
process.env.PUBLIC_SITE_ORIGIN = siteOrigin;

export default defineConfig({
  site: siteOrigin,
  output: "static",
  trailingSlash: "never",
  compressHTML: true,
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
