/** 本番切り替え後にこの origin で公開されたときだけ検索エンジンへ index を許可する。 */
export const INDEXABLE_SITE_ORIGIN = "https://jey3dayo.net";

export function shouldNoindex(siteOrigin: string): boolean {
  return siteOrigin !== INDEXABLE_SITE_ORIGIN;
}
