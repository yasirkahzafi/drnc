import fs from "node:fs";
import { basename } from "node:path";
import bigInt from "big-integer";
import { Api } from "telegram";
import { generateRandomBytes, readBigIntFromBuffer } from "telegram/Helpers.js";
import { getAppropriatedPartSize } from "telegram/Utils.js";
import bot from "../bot.js";

type ProgressCallback = (chunkLength: number, uploaded: number, total: number) => void;

export default async function uploadFile(
  filePath: string,
  progressCallback?: ProgressCallback
): Promise<Api.InputFileBig> {
  const fileId = readBigIntFromBuffer(generateRandomBytes(8), true, true);
  const fileName = basename(filePath);
  const fileSize = fs.statSync(filePath).size;
  const defaultChunkSize = getAppropriatedPartSize(bigInt(fileSize)) * 1024;
  const fileTotalParts = Math.ceil(fileSize / defaultChunkSize);
  const file = fs.openSync(filePath, "r");

  let partCount = 0;
  let remainingSize = fileSize;

  while (remainingSize > 0) {
    const position = partCount * defaultChunkSize;
    const chunkSize = remainingSize > defaultChunkSize ? defaultChunkSize : remainingSize;
    const buffer = Buffer.alloc(chunkSize);

    remainingSize -= chunkSize;
    fs.readSync(file, buffer, { position, length: chunkSize });

    await bot.invoke(
      new Api.upload.SaveBigFilePart({
        fileId,
        filePart: partCount,
        fileTotalParts,
        bytes: buffer,
      })
    );
    if (progressCallback) {
      progressCallback(chunkSize, position, fileSize);
    }
    partCount++;
  }
  const uploadedFile = new Api.InputFileBig({
    id: fileId,
    parts: partCount,
    name: fileName,
  });
  fs.closeSync(file);
  fs.rmSync(filePath);

  return uploadedFile;
}
