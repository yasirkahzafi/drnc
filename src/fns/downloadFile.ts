import fs from "node:fs";
import https from "node:https";
import http from "node:http";

type ProgressCallback = (chunkLength: number, downloaded: number, total: number) => void;

function getFileName(url: string) {
  return decodeURIComponent(new URL(url).pathname.split("/").pop()!);
}
export default async function downloadFile(url: string, progressCallback?: ProgressCallback): Promise<string> {
  const urlProtocol = new URL(url).protocol;
  const request = urlProtocol === "https:" ? https : http;
  const fileName = getFileName(url);
  const dir = "tmp";
  const filePath = `${process.cwd()}/${dir}/${fileName}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  const file = fs.createWriteStream(filePath);

  return new Promise((resolve) => {
    request.get(url, (res) => {
      let downloaded = 0;
      const total = Number(res.headers["content-length"]);

      res.pipe(file);
      res.on("data", (chunk) => {
        const chunkLength = chunk.length;
        downloaded += chunkLength;

        if (progressCallback) {
          progressCallback(chunkLength, downloaded, total);
        }
      });
      file.on("finish", () => {
        file.close();
        resolve(filePath);
      });
    });
  });
}
