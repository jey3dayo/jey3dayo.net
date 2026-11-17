const DEFAULT_SITE_ORIGIN = "https://apps.jey3dayo.net";

/**
 * PUBLIC_SITE_ORIGIN が未設定・復号失敗（encrypted:）・不正 URL のときはデフォルトを返す。
 */
export function resolvePublicSiteOrigin(raw) {
  if (typeof raw !== "string") {
    return DEFAULT_SITE_ORIGIN;
  }

  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.startsWith("encrypted:")) {
    return DEFAULT_SITE_ORIGIN;
  }

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return DEFAULT_SITE_ORIGIN;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export { DEFAULT_SITE_ORIGIN };