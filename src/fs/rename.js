import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalFile = path.join(__dirname, "files", "wrongFilename.txt");
const copiedFile = path.join(__dirname, "files", "properFilename.md");

const checkOriginalFile = async () => {
  try {
    await fs.access(originalFile);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

const checkCopiedFile = async () => {
  try {
    await fs.access(copiedFile);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

const rename = async () => {
  try {
    await checkOriginalFile();
    await checkCopiedFile();
    await fs.rename(originalFile, copiedFile);
    console.log(
      'Successfully renamed "wrongFilename.txt" to "properFilename.md"'
    );
  } catch (err) {
    console.log(err.message);
  }
};

await rename();
