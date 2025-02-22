const { Events } = require("discord.js");

module.exports = (client) => {
  client.on(Events.GuildMemberAdd, async (member) => {
    const welcomeChannelId = "1320884565182775366";
    const guideChannel = "1329933138557800488";
    const emojiId = "1342621823694671933";
    const receptionistId = "1320884375616749578";

    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) return;

    const emoji = `<:D_zero_ccwave:${emojiId}> `;
    const receptionist = `<@&${receptionistId}>`;

    channel.send(
      `**Olá ${member}, seja bem-vindo(a) à ${member.guild.name}!\n**${emoji} ${receptionist} digam olá à nosso(a) novo(a) membro(a)! ${emoji}\n- Caso se sinta perdido com a quantidade de chats, passe em \<#${guideChannel}>.`
    );
  });
};
