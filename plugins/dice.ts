import { range, sum, random } from "lodash";
import { SeleneMessage } from "../types";

function onMessage(msg: SeleneMessage) {
  if (msg.isDirect) {
    const v = msg.strippedContent.replace("roll", "").trim();
    const reg = /^(\d+)d(\d+)$/.exec(v);
    if (reg) {
      const count = parseInt(reg[1], 10);
      const sides = parseInt(reg[2], 10);
      if (count > 50 || sides > 50) {
        msg.message.reply("sensible numbers, please.");
        return true;
      }
      const rolls = range(count).map(() => random(1, sides));
      const total = sum(rolls);
      msg.message.reply(`[${rolls.join(", ")}] for a total of ${total}`);
      return true;
    }
  }

  return false;
}

export const Dice = {
  onMessage
};
