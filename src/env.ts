import "dotenv/config";

const env = process.env;

const apiId = Number(env.API_ID);
const apiHash = env.API_HASH;
const stringSession = env.STRING_SESSION || "";
const botToken = env.BOT_TOKEN;

if (!apiId) {
  throw Error("Provide API_ID");
}
if (!apiHash) {
  throw Error("Provide API_HASH");
}
if (!botToken) {
  throw Error("Provide BOT_TOKEN");
}

export default { apiId, apiHash, stringSession, botToken };
