import assert from "node:assert/strict";
import test from "node:test";
import { toWhoamiLines } from "./whoami-lines.ts";

test("文字列・配列を JSON 形式の行へ整形し、末尾行のみカンマを付けない", () => {
  const lines = toWhoamiLines([
    ["name", "Junya Nakazato"],
    ["tools", ["Neovim", "mise"]],
  ]);

  assert.deepEqual(lines, [
    { key: '"name"', value: '"Junya Nakazato",' },
    { key: '"tools"', value: '["Neovim", "mise"]' },
  ]);
});

test("空配列でも壊れず空配列を返す", () => {
  assert.deepEqual(toWhoamiLines([]), []);
});
