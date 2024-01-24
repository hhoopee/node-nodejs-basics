import * as fs from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToRemove.txt");

const remove = async () => {
    try {
        try {
            await fs.unlink(filePath);
            console.log('Successfully removed "fileToRemove.txt"');
        } catch (err) {
            if (err.code === "ENOENT") {
                throw new Error("FS operation failed");
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

await remove();