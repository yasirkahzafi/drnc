import globalState from "../services/globalState.js";
import formatBytes from "./formatBytes.js";

export default function getProgressText() {
  const tasks = globalState.tasks;
  let text = "";

  if (!tasks.size) return;

  for (let task of tasks.values()) {
    text +=
      `${task.fileName}\n` +
      `Type: ${task.type}\n` +
      `${formatBytes(task.currentState)} / ${formatBytes(task.total)}\n\n`;
  }
  text += `Total task: ${tasks.size}`;

  return text;
}
