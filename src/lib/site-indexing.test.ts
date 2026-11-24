import assert from "node:assert/strict";
import test from "node:test";
import { INDEXABLE_SITE_ORIGIN, shouldNoindex } from "./site-indexing.ts";

test("本番オリジンのみ index を許可する", () => {
  assert.equal(shouldNoindex(INDEXABLE_SITE_ORIGIN), false);
});

test("本番オリジン以外は noindex とする", () => {
  assert.equal(shouldNoindex("https://www.jey3dayo.net"), true);
  assert.equal(shouldNoindex("https://apps.jey3dayo.net"), true);
  assert.equal(shouldNoindex("http://localhost:4321"), true);
});
