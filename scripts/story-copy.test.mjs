import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

// Use the installed compiler so these tests also run on the project's Node 20 minimum.
const source = await readFile(new URL("../lib/story-copy.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { storyCopyOpacity } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("hero and chapter copy never overlap, including reverse scrolling", () => {
  const samples = Array.from({ length: 2001 }, (_, index) => index / 2000);
  for (const progress of [...samples, ...samples.toReversed()]) {
    const opacities = Array.from({ length: 7 }, (_, index) => storyCopyOpacity(progress, index - 1));
    assert.ok(opacities.every(value => Number.isFinite(value) && value >= 0 && value <= 1));
    assert.ok(opacities.filter(value => value > 0).length <= 1, `Overlapping copy at ${progress}`);
  }
});

test("reading holds remain fully legible and text is clear during scene changes", () => {
  const holds = [0, 0.17, 0.34, 0.52, 0.7, 0.86, 0.97];
  holds.forEach((progress, index) => assert.equal(storyCopyOpacity(progress, index - 1), 1));
  for (const progress of [0.125, 0.25, 0.43, 0.6, 0.79, 0.93]) {
    assert.equal(Array.from({ length: 7 }, (_, index) => storyCopyOpacity(progress, index - 1)).reduce((a, b) => a + b, 0), 0);
  }
});
