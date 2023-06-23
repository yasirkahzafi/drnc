import formatBytes from "./formatBytes.js";
import globalState from "../services/globalState.js";

export default function progress() {
  const progressMessage = globalState.progressMessage;
  if (!progressMessage) return;

  try {
    const tasks = globalState.tasks;
    let text = "";

    if (!tasks.size) {
      return progressMessage.delete({ revoke: true });
    }
    for (let task of tasks.values()) {
      text +=
        `${task.fileName}\n` +
        `Type: ${task.type}\n` +
        `${formatBytes(task.currentState)} / ${formatBytes(task.total)}\n\n`;
    }
    text += `Total task: ${tasks.size}`;
    progressMessage.edit({ text });
  } catch {}
}
