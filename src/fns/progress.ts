import globalState from "../services/globalState.js";
import getProgressText from "./getProgressText.js";

export default function progress() {
  const progressMessage = globalState.progressMessage;
  if (!progressMessage) return;

  try {
    const text = getProgressText();
    if (!text) return progressMessage.delete({ revoke: true });
    progressMessage.edit({ text });
  } catch {}
}
