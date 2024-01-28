import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileDirectory = path.join(__dirname, "files");

const compress = async () => {
  const readStream = fs.createReadStream(
    path.join(fileDirectory, "fileToCompress.txt")
  );
  const writeStream = fs.createWriteStream(
    path.join(fileDirectory, "archive.gz")
  );
  const zip = zlib.createGzip();
  pipeline(readStream, zip, writeStream, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

await compress();
