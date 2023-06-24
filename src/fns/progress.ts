import globalState from "../services/globalState.js";
import getProgressText from "./getProgressText.js";

export default async function progress() {
  const progressMessage = globalState.progressMessage;
  if (!progressMessage) return;

  try {
    const text = getProgressText();
    if (!text) return progressMessage.delete({ revoke: true });
    await progressMessage.edit({ text });
  } catch (err) {
    console.error((err as Error).message);
  }
}
