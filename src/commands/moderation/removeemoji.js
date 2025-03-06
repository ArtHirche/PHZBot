const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "removeemoji",
  description:
    "Remove um emoji do servidor. Utilize: `phz.removeemoji <emoji>`",
  execute: async (client, message, args) => {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageEmojisAndStickers
      )
    ) {
      return message.reply("Você não tem permissão para remover emojis!");
    }

    if (args.length < 1) {
      return message.reply(
        "Para remover um emoji, utilize o comando `!removeemoji <emoji>`."
      );
    }

    const emojiInput = args[0];
    const emoji = message.guild.emojis.cache.find(
      (e) => e.name === emojiInput || e.toString() === emojiInput
    );

    if (!emoji) {
      return message.reply(
        "Emoji inválido! Certifique-se de que o emoji existe no servidor."
      );
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageEmojisAndStickers
      )
    ) {
      return message.reply("Eu não tenho permissão para remover emojis!");
    }

    try {
      await emoji.delete();
      message.reply("Emoji removido com sucesso!");
      sendLog(client, "Emoji removido", `Emoji: ${emoji.name}`);
    } catch (error) {
      console.error("Erro ao remover emoji:", error);
      return message.reply(
        "Ocorreu um erro ao remover o emoji. Verifique o console para mais detalhes."
      );
    }
  },
};
