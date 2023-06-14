import { NewMessageEvent } from "telegram/events/index.js";
import downloadFile from "../fns/downloadFile.js";
import formatBytes from "../fns/formatBytes.js";
import bot from "../bot.js";

export default async function downloadFileTask(event: NewMessageEvent) {
  const message = event.message;
  const chatId = event.chatId;
  const url = message.text.split(" ")[1];

  if (!chatId) {
    return;
  }
  if (!url) {
    return message.reply({ message: "Mana linknya cuy" });
  }
  const updateDelay = 3000;
  const replyMessage = await message.reply({ message: "Terminal Running" });
  let inDebounce = false;

  if (!replyMessage) return;

  const filePath = await downloadFile(url, (chunkLength, downloaded, total) => {
    if (inDebounce) return;
    inDebounce = true;
    setTimeout(() => (inDebounce = false), updateDelay);

    try {
      replyMessage.edit({
        text: `Downloading ${formatBytes(downloaded)} / ${formatBytes(total)}`,
      });
    } catch {}
  });
  await bot.sendFile(event.chatId, {
    file: filePath,
    progressCallback(progress) {
      if (inDebounce) return;
      inDebounce = true;
      setTimeout(() => (inDebounce = false), updateDelay);

      const percentNumber = Math.round(progress * 100);
      try {
        replyMessage.edit({ text: `Uploading ${percentNumber}%` });
      } catch {}
    },
  });
  await replyMessage.delete({ revoke: true });
}
