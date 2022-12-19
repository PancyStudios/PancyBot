import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder } from "discord.js";
import { utils } from "../../..";
import { warns } from "../../../database/Warns";

export default new Command({
  name: "warns",
  use: "<user>",
  description: "Muestra la lista de warns de un usuario",
  category: "mod",
  isDev: false,
  botPermissions: ["EmbedLinks"],
  userPermissions: ["ManageMessages"],
  async run({ message, _guild }) {
    let userMention = message.mentions.members.first();
    if (!userMention)
      return message.reply(
        await utils.dataRequired(
          "Necesitas mencionar al usuario que quieres ver sus warns" +
            ".\n\n" +
            _guild.configuration.prefix +
            "warn-list <userMention>"
        )
      );

    let userWarns = await warns.findOne({
      guildId: message.guild.id,
      userId: userMention.id,
    });
    if (!userWarns)
      return message.reply({
        content: `El usuario mencionado no tiene warns.`,
      });

    let cc = 1;
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor(0x0056ff)
          .setDescription(
            `Estas viendo los ${userWarns.warns.length} warns de <@${
              userMention.id
            }>.\n\n${userWarns.warns
              .map(
                (x) =>
                  `\`${cc++}-\` __${x.reason}__, moderador: <@${x.moderator}>`
              )
              .join("\n")}`
          ),
      ],
    });
  },
});
