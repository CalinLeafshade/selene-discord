import { sample } from "lodash";
import { SeleneMessage } from "../types";

const invalid = [
  "you're trying to trick me.",
  "you're bad at maths.",
  "it's not nice to try a remote code execution attack on me."
];

const prefixes = ["simple, ", "that's ", "EZ-PZ, ", ""];

function onMessage(msg: SeleneMessage) {
  if (msg.isDirect && msg.strippedContent.startsWith("calc")) {
    const safeExpr = msg.strippedContent.replace(/[^-()\d/*+.]/g, "").trim();
    let res = null;
    try {
      const a = eval(safeExpr);
      if (a) {
        res = sample(prefixes) + a;
      }
    } catch (e) {}
    msg.message.reply(res ?? sample(invalid));
    return true;
  }

  return false;
}

export const Calc = {
  onMessage
};
