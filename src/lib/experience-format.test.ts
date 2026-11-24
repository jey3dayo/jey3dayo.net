import assert from "node:assert/strict";
import test from "node:test";
import { formatPeriod } from "./experience-format.ts";

test("end が null のときは NOW 表記にする", () => {
  assert.equal(formatPeriod(2011, null), "2011 — NOW");
});

test("end があるときは年範囲を表記する", () => {
  assert.equal(formatPeriod(2009, 2010), "2009 — 2010");
});
