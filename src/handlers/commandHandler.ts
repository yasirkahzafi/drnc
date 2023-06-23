import { NewMessageEvent } from "telegram/events/index.js";
import downloadFileTask from "../tasks/downloadFileTask.js";
import uptimeHandler from "./uptimeHandler.js";

export default async function commandHandler(event: NewMessageEvent) {
  const command = event.message.text.substring(1).split(" ")[0];

  if (command === "r") {
    downloadFileTask(event);
  } else if (command === "uptime") {
    uptimeHandler(event);
  }
}
