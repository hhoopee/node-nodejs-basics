import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const filePath = path.join(__dirname, "files", "fileToRead.txt");
  const readStream = fs.createReadStream(filePath);
  readStream.pipe(process.stdout);
  // readStream.on('data', (chunk) => {
  //     process.stdout.write(chunk)
  // })
};

await read();
