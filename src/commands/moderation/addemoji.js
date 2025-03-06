const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");
const axios = require("axios");

module.exports = {
  name: "addemoji",
  description:
    "Adiciona um emoji ao servidor. Utilize: `phz.addemoji <nome> <url>`",
  execute: async (client, message, args) => {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageEmojisAndStickers
      )
    ) {
      return message.reply("Você não tem permissão para adicionar emojis!");
    }

    if (args.length < 2) {
      return message.reply(
        "Para adicionar um emoji, utilize o comando `!addemoji <nome> <url>`."
      );
    }

    const emojiName = args[0];
    const emojiUrl = args[1];

    if (!emojiUrl.startsWith("http")) {
      return message.reply(
        "URL inválida! Certifique-se de que a URL comece com `http`."
      );
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageEmojisAndStickers
      )
    ) {
      return message.reply("Eu não tenho permissão para adicionar emojis!");
    }

    try {
      const response = await axios.head(emojiUrl);
      const imageSize = parseInt(response.headers["content-length"], 10);

      if (imageSize > 256000) {
        return message.reply(
          "O tamanho do emoji não pode ser maior que 256KB."
        );
      }

      const emoji = await message.guild.emojis.create({
        attachment: emojiUrl,
        name: emojiName,
      });

      message.reply(`Emoji adicionado com sucesso! ${emoji}`);
      sendLog(client, "Emoji adicionado", `Emoji: ${emoji}`);
    } catch (error) {
      console.error("Erro ao adicionar emoji:", error);
      return message.reply(
        "Ocorreu um erro ao adicionar o emoji. Verifique o console para mais detalhes."
      );
    }
  },
};
