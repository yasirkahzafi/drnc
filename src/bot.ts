import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import env from "./env.js";

export default new TelegramClient(new StringSession(env.stringSession), env.apiId, env.apiHash, {
  connectionRetries: 5,
});
