import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  try {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      console.log(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new Error("FS operation failed");
      }
      throw err;
    }
  } catch (err) {
    console.log(err.message);
  }
};

await read();
