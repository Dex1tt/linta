import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");

async function findSegmentDirectories(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const segmentDirectories = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const entryPath = path.join(directory, entry.name);

    if (entry.name.startsWith("__next.")) {
      segmentDirectories.push(entryPath);
      continue;
    }

    segmentDirectories.push(...(await findSegmentDirectories(entryPath)));
  }

  return segmentDirectories;
}

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

const segmentDirectories = await findSegmentDirectories(outputDirectory);
let copiedFiles = 0;

for (const segmentDirectory of segmentDirectories) {
  const files = await findFiles(segmentDirectory);
  const parentDirectory = path.dirname(segmentDirectory);
  const segmentPrefix = path.basename(segmentDirectory);

  for (const sourcePath of files) {
    const relativeParts = path
      .relative(segmentDirectory, sourcePath)
      .split(path.sep);
    const targetName = [segmentPrefix, ...relativeParts].join(".");
    const targetPath = path.join(parentDirectory, targetName);

    await copyFile(sourcePath, targetPath);
    copiedFiles += 1;
  }
}

console.log(`Prepared ${copiedFiles} static segment files for deployment.`);
