const { PermissionsBitField } = require("discord.js");
const { sendLog } = require("../../utils/logger");

module.exports = {
  name: "role",
  description: "Adiciona ou remove um ou mais cargos de um usuário.",
  execute: async (client, message, args) => {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return message.reply("Você não tem permissão para gerenciar cargos!");
    }

    if (args.length < 3) {
      return message.reply(
        "Uso correto: `phz.role add|remove @usuário @cargo1 @cargo2 ...`"
      );
    }

    const action = args[0].toLowerCase();
    const member = message.mentions.members.first();
    const roles = message.mentions.roles;

    if (!member) {
      return message.reply("Usuário inválido! Mencione um usuário válido.");
    }

    if (roles.size === 0) {
      return message.reply(
        "Cargo inválido! Mencione pelo menos um cargo válido."
      );
    }

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return message.reply("Eu não tenho permissão para gerenciar cargos.");
    }

    let modifiedRoles = [];
    let failedRoles = [];

    try {
      for (const role of roles.values()) {
        if (message.guild.members.me.roles.highest.position <= role.position) {
          failedRoles.push(role.name);
          continue;
        }

        if (action === "add") {
          await member.roles.add(role);
          modifiedRoles.push(role.name);
        } else if (action === "remove") {
          await member.roles.remove(role);
          modifiedRoles.push(role.name);
        }
      }

      let responseMessage = "Operação concluída!";
      if (modifiedRoles.length > 0) {
        responseMessage += `\nCargos **${
          action === "add" ? "adicionados" : "removidos"
        }**: **${modifiedRoles.join(", ")}** para ${member}.`;

        const cargosTexto =
          modifiedRoles.length > 0
            ? modifiedRoles.join(", ")
            : "Nenhum cargo modificado";

        console.log("📢 Dados para Log ->", {
          action: `Cargo ${action === "add" ? "Adicionado" : "Removido"}`,
          details: `Cargos: ${cargosTexto}\nUsuário: ${member.user.tag} (ID: ${member.id})\nExecutor: ${message.author.tag} (ID: ${message.author.id})`,
        });

        sendLog(
          client,
          `📢 Cargos ${action === "add" ? "adicionados" : "removidos"}`,
          `Cargos: ${cargosTexto}\nUsuário: ${member.user.tag} (ID: ${member.id})\nExecutor: ${message.author.tag} (ID: ${message.author.id})`
        );
      }
      if (failedRoles.length > 0) {
        responseMessage += `\nNão consegui modificar os seguintes cargos (hierarquia muito alta): **${failedRoles.join(
          ", "
        )}**.`;
      }

      message.reply(responseMessage);
    } catch (error) {
      console.error(error);
      message.reply("Ocorreu um erro ao modificar os cargos.");
    }
  },
};
