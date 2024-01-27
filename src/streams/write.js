import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileTowrite.txt");
  const writeStream = fs.createWriteStream(filePath);
  process.stdin.pipe(writeStream);

  process.stdin.on("data", (chunk) => {
    const chunkString = chunk.toString();
    if (chunkString.match("STOP")) process.stdin.unpipe(writeStream);
  });
};

await write();
