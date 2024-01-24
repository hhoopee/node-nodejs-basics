import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirPath = path.join(__dirname, "files");

const list = async () => {
  try {
    try {
      const files = await fs.readdir(dirPath);
      console.log(files);
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new Error("FS operation failed");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

await list();
