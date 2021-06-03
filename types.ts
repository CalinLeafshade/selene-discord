import { Message } from "discord.js";

export type SeleneMessage = {
  isDirect: boolean;
  strippedContent: string;
  message: Message;
};

export type SelenePlugin = {
  onMessage: (msg: SeleneMessage) => boolean;
};
