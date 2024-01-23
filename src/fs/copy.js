import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalFolderPath = path.join(__dirname, "files");
const copiedFolderPath = path.join(__dirname, "files_copy");

const checkCopiedFolder = async () => {
  try {
    await fs.access(copiedFolderPath);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

const checkOriginalFolder = async () => {
  try {
    await fs.access(originalFolderPath);
  } catch (err) {
    throw err;
  }
};

const copy = async () => {
  try {
    const files = await fs.readdir(originalFolderPath);
    await checkOriginalFolder();
    await checkCopiedFolder();
    await fs.mkdir(copiedFolderPath);
    files.forEach(async (file) => {
      await fs.copyFile(
        path.join(originalFolderPath, file),
        path.join(copiedFolderPath, file)
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};

await copy();
