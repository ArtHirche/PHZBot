const { EmbedBuilder } = require("discord.js");
const { name } = require("../moderation/addemoji");

module.exports = {
  name: "help",
  description: "Lista todos os comandos e demonstra como usá-los.",
  execute: async (client, message) => {
    const commands = client.commands;

    if (!commands || commands.size === 0) {
      return message.reply("Não há comandos registrados.");
    }

    const embed = new EmbedBuilder()
      .setTitle("Lista de comandos")
      .setColor("#00ADEF")
      .setDescription("Aqui está a lista de comandos disponíveis:")
      .setFooter({ text: "Use `phz.<command>` para executar um comando." });

    commands.forEach((command) => {
      embed.addFields({
        name: `💎 ${command.name}`,
        value: command.description || "Sem descrição.",
        inline: false,
      });
    });

    message.reply({ embeds: [embed] });
  },
};
