import { NewMessageEvent } from "telegram/events/index.js";
import downloadFile from "../fns/downloadFile.js";
import bot from "../bot.js";
import uploadFile from "../fns/uploadFile.js";
import globalState from "../services/globalState.js";
import { getFileName } from "../fns/getFileName.js";
import getProgressText from "../fns/getProgressText.js";

export default async function downloadFileTask(event: NewMessageEvent) {
  try {
    const message = event.message;
    const chatId = event.chatId;
    const url = message.text.split(" ")[1];

    if (!chatId) {
      return;
    }
    if (!url) {
      return message.reply({ message: "Mana linknya cuy" });
    }
    const tasks = globalState.tasks;
    const fileName = getFileName(url);

    await globalState.progressMessage?.delete({ revoke: true });
    tasks.set(fileName, { fileName, type: "prepare", currentState: 0, total: 0 });

    const replyMessage = await message.reply({ message: getProgressText() });
    globalState.progressMessage = replyMessage;

    const filePath = await downloadFile(url, (chunkLength, downloaded, total) => {
      tasks.set(fileName, { fileName, type: "download", currentState: downloaded, total });
    });
    const uploadedFile = await uploadFile(filePath, (chunkLength, uploaded, total) => {
      tasks.set(fileName, { fileName, type: "upload", currentState: uploaded, total });
    });
    tasks.delete(fileName);

    await bot.sendFile(event.chatId, { file: uploadedFile });
  } catch (err) {
    console.error((err as Error).message);
  }
}
