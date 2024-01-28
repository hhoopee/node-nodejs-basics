import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { cpus } from "node:os";
import { rejects } from "node:assert";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = [];
const createWorker = (i) =>
  new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "worker.js"));
    worker.postMessage(i);
    worker.on("message", (msg) =>
      resolve({
        status: "resolved",
        data: msg,
      })
    );
    worker.on("error", () =>
      reject({
        status: "reject",
        data: null,
      })
    );
  });

const performCalculations = async () => {
  for (let i = 1; i <= cpus().length; i += 1) {
    result.push(await createWorker(1 + i));
  }
  console.log(result);
};

await performCalculations();
