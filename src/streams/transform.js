import { Transform } from "node:stream";

const transform = async () => {
  const transformC = new Transform({
    transform(chunk, enc, callback) {
      const chunkString = chunk.toString().trim();
      const reverseChunkString = chunkString.split("").reverse("").join("");
      this.push(reverseChunkString + "\n");
      callback();
    },
  });
  process.stdin.pipe(transformC).pipe(process.stdin);

  process.stdin.on("data", (chunk) => {
    const chunkString = chunk.toString();
    if (chunkString.match("STOP")) process.stdin.unpipe(transformC);
  });
};

await transform();
