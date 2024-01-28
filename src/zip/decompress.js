import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileDirectory = path.join(__dirname, "files");

const decompress = async () => {
  const readStream = fs.createReadStream(
    path.join(fileDirectory, "archive.gz")
  );
  const writeStream = fs.createWriteStream(
    path.join(fileDirectory, "fileToCompress.txt")
  );
  const unzip = zlib.createUnzip();
  pipeline(readStream, unzip, writeStream, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

await decompress();
