import { constants } from "node:fs";
import { copyFile, readFile, readdir } from "node:fs/promises";
import { basename, dirname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

// Next 16's Windows exporter leaves nested segment files where its client
// requests dot-separated filenames: https://github.com/vercel/next.js/issues/85374
// Preserve the originals and add only missing aliases. Already-correct exports
// are unchanged; differing destination content fails the build.
export async function normalizeStaticExport(outputDirectory) {
  let copied = 0;

  async function visit(directory, segmentRoot = null) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const source = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(
          source,
          segmentRoot ?? (entry.name.startsWith("__next.") ? source : null),
        );
      } else if (segmentRoot && entry.isFile() && entry.name.endsWith(".txt")) {
        const suffix = relative(segmentRoot, source).split(sep).join(".");
        const destination = join(
          dirname(segmentRoot),
          `${basename(segmentRoot)}.${suffix}`,
        );
        try {
          await copyFile(source, destination, constants.COPYFILE_EXCL);
          copied += 1;
        } catch (error) {
          if (error.code !== "EEXIST") throw error;
          const [original, existing] = await Promise.all([
            readFile(source),
            readFile(destination),
          ]);
          if (!original.equals(existing)) {
            throw new Error(`Conflicting exported segment: ${destination}`);
          }
        }
      }
    }
  }

  await visit(resolve(outputDirectory));
  return copied;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const count = await normalizeStaticExport("out");
  console.log(`Static export: added ${count} segment filename aliases.`);
}
