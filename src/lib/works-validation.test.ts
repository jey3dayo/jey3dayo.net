import assert from "node:assert/strict";
import test from "node:test";
import { sortAndValidateWorks } from "./works-validation.ts";

test("order 昇順に並べ替え、件数が増えても通る", () => {
  const input = [
    { id: "c", data: { order: 3, featured: false } },
    { id: "a", data: { order: 1, featured: true } },
    { id: "e", data: { order: 5, featured: false } },
    { id: "b", data: { order: 2, featured: false } },
    { id: "d", data: { order: 4, featured: false } },
  ];

  const sorted = sortAndValidateWorks(input);
  assert.deepEqual(
    sorted.map((w) => w.id),
    ["a", "b", "c", "d", "e"]
  );
});

test("Works が 0 件のときはエラーにする", () => {
  assert.throws(() => sortAndValidateWorks([]), /0 件/);
});

test("featured がちょうど 1 件でないときはエラーにする", () => {
  assert.throws(
    () => sortAndValidateWorks([{ id: "a", data: { order: 1, featured: false } }]),
    /featured/
  );
  assert.throws(
    () =>
      sortAndValidateWorks([
        { id: "a", data: { order: 1, featured: true } },
        { id: "b", data: { order: 2, featured: true } },
      ]),
    /featured/
  );
});

test("order が重複しているときはエラーにする", () => {
  assert.throws(
    () =>
      sortAndValidateWorks([
        { id: "a", data: { order: 1, featured: true } },
        { id: "b", data: { order: 1, featured: false } },
      ]),
    /order が重複/
  );
});
