module.exports = {
  name: "ping",
  description: "Testa a latência do bot.",
  execute: async (client, message) => {
    const msg = await message.reply("🏓 Pong...");
    const latency = msg.createdTimestamp - message.createdTimestamp;
    msg.edit(`🏓 Pong! Latência: **${latency}ms**`);
  },
};
