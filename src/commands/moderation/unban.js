const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "unban",
  description: "Unbans a user for ID",
  execute: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("Você não tem permissão para desbanir usuários!");
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    ) {
      return message.reply("Eu não tenho permissão para desbanir usuários.");
    }

    const userId = args[0];
    const reason = args.slice(1).join(" ") || "Sem motivo especificado.";

    if (!userId) {
      return message.reply(
        "Você precisa fornecer o ID do usuário para desbanir."
      );
    }

    try {
      const bannedUsers = await message.guild.bans.fetch();
      const userBan = bannedUsers.get(userId);

      if (!userBan) {
        return message.reply("Esse usuário não está banido.");
      }

      await message.guild.bans.remove(userId, reason);
      message.reply(
        `O usuário <@${userId}> foi desbanido. Motivo: **${reason}**.`
      );

      sendLog(
        client,
        "✅ Usuário Desbanido",
        `Usuário: <@${userId}> (ID: ${userId})\nMotivo: ${reason}\nExecutor: ${message.author.tag} (ID: ${message.author.id})`
      );
    } catch (error) {
      console.error(error);
      message.reply("Ocorreu um erro ao tentar desbanir o usuário.");
    }
  },
};
