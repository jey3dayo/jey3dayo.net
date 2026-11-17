import { DEFAULT_SITE_ORIGIN, resolvePublicSiteOrigin } from "../../config/resolve-site-origin.mjs";

export function publicSiteOriginFromEnv(
  raw: string | undefined = import.meta.env.PUBLIC_SITE_ORIGIN
): string {
  return resolvePublicSiteOrigin(raw);
}

export { DEFAULT_SITE_ORIGIN };
