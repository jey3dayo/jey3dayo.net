import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_SITE_ORIGIN, resolvePublicSiteOrigin } from "./resolve-site-origin.mjs";

test("有効な URL からオリジンを返す", () => {
  assert.equal(resolvePublicSiteOrigin("https://jey3dayo.net/"), "https://jey3dayo.net");
  assert.equal(
    resolvePublicSiteOrigin("  https://apps.jey3dayo.net/path?x=1  "),
    "https://apps.jey3dayo.net"
  );
  assert.equal(resolvePublicSiteOrigin("http://localhost:4321/foo"), "http://localhost:4321");
});

test("未設定・空文字・復号失敗（encrypted:）はデフォルトへフォールバックする", () => {
  assert.equal(resolvePublicSiteOrigin(undefined), DEFAULT_SITE_ORIGIN);
  assert.equal(resolvePublicSiteOrigin(""), DEFAULT_SITE_ORIGIN);
  assert.equal(resolvePublicSiteOrigin("   "), DEFAULT_SITE_ORIGIN);
  assert.equal(resolvePublicSiteOrigin("encrypted:BENBviajjsI..."), DEFAULT_SITE_ORIGIN);
});

test("不正な URL や http/https 以外のスキームはデフォルトへフォールバックする", () => {
  assert.equal(resolvePublicSiteOrigin("not-a-url"), DEFAULT_SITE_ORIGIN);
  assert.equal(resolvePublicSiteOrigin("javascript:alert(1)"), DEFAULT_SITE_ORIGIN);
  assert.equal(resolvePublicSiteOrigin("ftp://jey3dayo.net"), DEFAULT_SITE_ORIGIN);
});
