import { NewMessageEvent } from "telegram/events/index.js";
import commandHandler from "./commandHandler.js";

export default async function newMessageHandler(event: NewMessageEvent) {
  const text = event.message.text;

  if (text.startsWith("/")) {
    commandHandler(event);
  }
}
