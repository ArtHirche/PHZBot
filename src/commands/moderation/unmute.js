const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "unmute",
  description: "Unmutes a user",
  execute: async (client, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    ) {
      return message.reply("Você não tem permissão para desmutar usuários!");
    }

    const member = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "Sem motivo especificado.";

    if (!member) {
      return message.reply("Mencione um usuário válido para desmutar.");
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return message.reply("Eu não tenho permissão para gerenciar cargos.");
    }

    const muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Silenciado"
    );

    if (!muteRole) {
      return message.reply("O cargo de mute não existe no servidor.");
    }

    if (!member.roles.cache.has(muteRole.id)) {
      return message.reply("Esse usuário não está mutado.");
    }

    try {
      await member.roles.remove(muteRole);
      message.reply(`${member.user.tag} foi desmutado. Motivo: **${reason}**.`);

      sendLog(
        client,
        "🔊 Usuário Desmutado",
        `Usuário: ${member.user.tag} (ID: ${member.id})\nMotivo: ${reason}\nExecutor: ${message.author.tag} (ID: ${message.author.id})`
      );
    } catch (error) {
      console.error(error);
      message.reply("Ocorreu um erro ao tentar desmutar o usuário.");
    }
  },
};
