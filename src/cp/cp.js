import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptPath = path.join(__dirname, "files", "script.js");
const spawnChildProcess = async (args) => {
  const spawnProcess = spawn("node", [scriptPath, ...args]);
  process.stdin.pipe(spawnProcess.stdin);
  spawnProcess.stdout.on("data", (data) => {
    process.stdout.write(data.toString());
  });
};

spawnChildProcess(["one", "two", "three"]);
