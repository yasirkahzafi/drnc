import { NewMessage } from "telegram/events/index.js";
import bot from "./bot.js";
import env from "./env.js";
import newMessageHandler from "./handlers/newMessageHandler.js";

bot.addEventHandler(newMessageHandler, new NewMessage({}));

(async () => {
  await bot.start({
    botAuthToken: env.botToken,
  });
  console.log("You should now be connected");
  if (!env.stringSession) {
    console.log(bot.session.save());
  }
})();
