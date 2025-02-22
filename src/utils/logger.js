const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

module.exports = {
  sendLog: async (client, action, details) => {
    const logChannel = client.channels.cache.get(config.logsChannelId);

    if (!logChannel) {
      console.error("Canal de logs não encontrado! Verifique se o ID está correto no config.json.");
      return;
    }

    if (!details || typeof details !== "string" || details.trim() === "") {
      console.error("Detalhes inválidos para o log. Evitando envio de mensagem vazia.");
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("#ffcc00")
      .setTitle(`📢 ${action}`)
      .setDescription(details || "Nenhuma informação disponível.") // Garante que sempre haja um texto
      .setTimestamp();

    try {
      await logChannel.send({ embeds: [embed] });
    } catch (err) {
      console.error("Erro ao enviar log para o canal:", err);
    }
  }
};
