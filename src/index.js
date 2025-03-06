require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const loadCommands = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith(".js")) {
      const command = require(fullPath);
      client.commands.set(command.name, command);
    }
  }
};

loadCommands(path.join(__dirname, "commands"));

client.once("ready", () => {
  console.log(`🚀 Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (command) {
    try {
      await command.execute(client, message, args);
    } catch (error) {
      console.error(`Erro ao executar o comando '${commandName}':`, error);
      message.reply("Ocorreu um erro ao executar esse comando.");
    }
  }
});

client.login(process.env.TOKEN);
