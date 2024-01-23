import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checkFile = async (pathName) => {
  try {
    await fs.access(pathName);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
};

const create = async () => {
  try {
    const pathName = path.join(__dirname, "files", "fresh.txt");
    await checkFile(pathName);
    await fs.writeFile(pathName, "I am fresh and young", "utf-8");
  } catch (err) {
    console.log(err.message);
  }
};

await create();
