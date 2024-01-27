import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");
  const readStream = fs.createReadStream(filePath);
  const hash = crypto.createHash("sha256");
  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });
  readStream.on("end", () => {
    process.stdout.write(hash.digest("hex"));
  });
};

await calculateHash();
