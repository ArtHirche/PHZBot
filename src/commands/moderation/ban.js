const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "ban",
  description: "Bans a user",
  execute: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("Você não tem permissão para banir usuários!");
    }

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sem motivo especificado.";

    if (!member) {
      return message.reply("Mencione um usuário válido para banir.");
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    ) {
      return message.reply("Eu não tenho permissão para banir usuários.");
    }

    if (
      message.guild.members.me.roles.highest.position <=
      member.roles.highest.position
    ) {
      return message.reply(
        "Não posso banir esse usuário, pois o cargo dele é maior ou igual ao meu."
      );
    }

    try {
      await member.ban({ reason });
      message.reply(`✅ ${member.user.tag} foi banido. Motivo: **${reason}**.`);

      sendLog(
        client,
        "⛔ Usuário Banido",
        `Usuário: ${member.user.tag} (ID: ${member.id})\nMotivo: ${reason}\nExecutor: ${message.author.tag} (ID: ${message.author.id})`
      );
    } catch (error) {
      console.error(error);
      message.reply("Ocorreu um erro ao tentar banir o usuário.");
    }
  },
};
