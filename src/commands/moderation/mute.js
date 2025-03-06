const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "mute",
  description: "Mute um usuário. Utilize: `phz.mute @usuário <tempo> [motivo]`",
  execute: async (client, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    ) {
      return message.reply("Você não tem permissão para usar este comando.");
    }

    const member = message.mentions.members.first();
    const reason = args.slice(2).join(" ") || "Sem motivo especificado.";
    const duration = args[1]; // 1h, 2d, 3s, 4m
    if (!member) {
      return message.reply("Por favor, mencione um usuário válido.");
    }

    if (!duration || !/^\d+[smhd]$/.test(duration)) {
      return message.reply(
        "Por favor, especifique um tempo válido para o mute. Use `s` (segundos), `m` (minutos), `h` (horas) ou `d` (dias). Exemplo: `10m`."
      );
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return message.reply("Eu não tenho permissão para gerenciar cargos.");
    }

    let muteRole = message.guild.roles.cache.find(
      (role) => role.name === "Silenciado"
    );

    if (!muteRole) {
      try {
        muteRole = await message.guild.roles.create({
          name: "Silenciado",
          color: "#018386",
          permissions: [],
        });

        message.guild.channels.cache.forEach((channel) => {
          channel.permissionOverwrites.create(muteRole, {
            SendMessages: false,
            Speak: false,
            AddReactions: false,
            Connect: false,
          });
        });
      } catch (error) {
        console.error(error);
        return message.reply(
          "Ocorreu um erro ao tentar criar o cargo de silenciado."
        );
      }
    }

    if (member.roles.cache.has(muteRole.id)) {
      return message.reply("Este usuário já está mutado.");
    }

    try {
      await member.roles.add(muteRole);
      message.reply(
        `O usuário ${member.user.tag} foi mutado por **${duration}** com sucesso. Motivo do mute: **${reason}**`
      );

      sendLog(
        client,
        "🔇 Usuário Mutado",
        `Usuário: ${member.user.tag} (ID: ${member.id})\nDuração: ${duration}\nMotivo: ${reason}\nExecutor: ${message.author.tag} (ID: ${message.author.id})`
      );

      const msDuration = convertToMilliseconds(duration);
      setTimeout(async () => {
        await member.roles.remove(muteRole);
        message.channel.send(
          `O usuário ${member.user.tag} foi desmutado automaticamente após **${duration}**.`
        );
        sendLog(
          client,
          "🔈 Usuário Desmutado",
          `Usuário: ${member.user.tag}\nMotivo: Tempo de mute expirado.`
        );
      }, msDuration);
    } catch (error) {
      console.error(error);
      return message.reply("Ocorreu um erro ao tentar mutar este usuário.");
    }
  },
};

// Function to convert time to milliseconds
function convertToMilliseconds(time) {
  const units = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1));
  return value * units[unit];
}
