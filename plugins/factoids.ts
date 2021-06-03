import { SeleneMessage } from "../types";
import { sample } from "lodash";

const confused = ["Huh?", "What?", "Je ne comprend pas."];

const factoids = {};

function onMessage(msg: SeleneMessage) {
  if (msg.isDirect) {
    const res = /(\w+) is (.+)/.exec(msg.strippedContent);
    if (res != null) {
      factoids[res[1].toLowerCase()] = res[2];
      msg.message.reply("Ok, I'll remember that!");
      return true;
    }

    const item = factoids[msg.strippedContent];
    const response = item
      ? `${msg.strippedContent} is ${item}`
      : sample(confused);
    msg.message.reply(response);
    return true;
  }

  return false;
}

export const Factoids = {
  onMessage
};
