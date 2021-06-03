import { Client, Message } from "discord.js";

import { Factoids } from "./plugins/factoids";
import { Calc } from "./plugins/calc";
import { Dice } from "./plugins/dice";
import { SeleneMessage } from "./types";

const token = process.env.DISCORD_TOKEN;
const client = new Client();

const plugins = [Calc, Dice, Factoids];

function buildMessage(message: Message): SeleneMessage {
  const isDirect = message.mentions.users.has(client.user.id);
  const strippedContent = message.content
    .replace(new RegExp(`<@!${client.user.id}>,?`), "")
    .trim();

  return {
    isDirect,
    strippedContent,
    message
  };
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}, ${client.user.id}`);
});

client.on("message", (message) => {
  const msg = buildMessage(message);

  for (const p of plugins) {
    if (p.onMessage(msg)) {
      break;
    }
  }
});

client.login(token);
