import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { normalizeStaticExport } from "./normalize-static-export.mjs";

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), "gromoze-export-test-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

async function file(root, name, content) {
  const path = join(root, name);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content);
}

test("repairs nested catch-all segments, preserves other assets and is repeatable", async (t) => {
  const root = await fixture(t);
  await file(root, "book-demo/__next.$c$slug/__PAGE__.txt", "demo payload");
  await file(root, "features/inventory/__next.$c$slug/detail/__PAGE__.txt", "unit payload");
  await file(root, "assets/nested/info.txt", "asset");
  await file(root, "product/__next.page.__PAGE__.txt", "correct export");
  assert.equal(await normalizeStaticExport(root), 2);
  assert.equal(await readFile(join(root, "book-demo/__next.$c$slug.__PAGE__.txt"), "utf8"), "demo payload");
  assert.equal(await readFile(join(root, "features/inventory/__next.$c$slug.detail.__PAGE__.txt"), "utf8"), "unit payload");
  assert.equal(await readFile(join(root, "assets/nested/info.txt"), "utf8"), "asset");
  assert.equal(await readFile(join(root, "product/__next.page.__PAGE__.txt"), "utf8"), "correct export");
  assert.equal(await normalizeStaticExport(root), 0);
});

test("rejects conflicting aliases without overwriting them", async (t) => {
  const root = await fixture(t);
  await file(root, "demo/__next.page/__PAGE__.txt", "new payload");
  await file(root, "demo/__next.page.__PAGE__.txt", "existing payload");
  await assert.rejects(normalizeStaticExport(root), /Conflicting exported segment/);
  assert.equal(await readFile(join(root, "demo/__next.page.__PAGE__.txt"), "utf8"), "existing payload");
});
