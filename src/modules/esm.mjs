import path from "node:path";
import * as fs from "node:fs/promises";
import { release, version } from "node:os";
import * as http from "node:http";
import "./files/c.js";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = JSON.parse(
    await fs.readFile(new URL("./files/a.json", import.meta.url))
  );
} else {
  unknownObject = JSON.parse(
    await fs.readFile(new URL("./files/b.json", import.meta.url))
  );
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = http.createServer((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
