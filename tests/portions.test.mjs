import assert from "node:assert/strict";
import test from "node:test";

import { adjustPortions, getInitialPortions } from "../src/utils/portions.mjs";

test("missing or blank recipe servings defaults the servings input to four", () => {
  assert.equal(getInitialPortions(undefined), 4);
  assert.equal(getInitialPortions(null), 4);
  assert.equal(getInitialPortions(""), 4);
});

test("recipe servings are used when present", () => {
  assert.equal(getInitialPortions(6), 6);
  assert.equal(getInitialPortions("6"), 6);
});

test("servings buttons add numerically, not by concatenating text", () => {
  assert.equal(adjustPortions("", 2), 6);
  assert.equal(adjustPortions("2", 2), 4);
  assert.equal(adjustPortions(4, -2), 2);
});
