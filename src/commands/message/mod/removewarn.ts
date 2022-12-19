import { Command } from "../../../structures/CommandMsg";
import { warns } from "../../../database/Warns";
import { utils } from "../../..";
import { EmbedBuilder } from "discord.js";

export default new Command({
  name: "unwarn",
  description: "Elimina un warn de un usuario",
  use: "<user> [all / warn number]",
  category: "mod",
  isDev: false,
  botPermissions: ["EmbedLinks"],
  userPermissions: ["ManageMessages"],
  async run({ message, args, _guild }) {
    let userMention = message.mentions.members.first();
    if (!userMention)
      return message.reply(
        await utils.dataRequired(
          "Debes mencionar al usuario que deseas eliminarle un warn" +
            ".\n\n" +
            _guild.configuration.prefix +
            "unwarn <userMention> [all]"
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

    if (args[1] == "all") {
      message.reply({
        content:
          "Los " +
          userWarns.warns.length +
          " warns del usuario han sido eliminados.",
      });
      await warns.findOneAndDelete({
        guildId: message.guild.id,
        userId: userMention.id,
      });
    } else {
      let cc = 1;
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(0x0056ff)
            .setDescription(
              `Estás viendo los ${userWarns.warns.length} warns de <@${
                userMention.id
              }>, después de este mensaje escribe el numero adjunto al warn para eliminarlo.\n\n${userWarns.warns
                .map((x) => `\`${cc++}-\` ${x.reason}`)
                .join("\n")}`
            ),
        ],
      });
      let collector = message.channel.createMessageCollector({ time: 15000 });
      collector.on("collect", async (m) => {
        if (m.content == "") return;
        if (m.author.id == message.author.id) {
          if (isNaN(m.content as unknown as number)) {
            message.reply(`No es un numero.`);
            return collector.stop();
          }
          if ((m.content as unknown as number) > userWarns.warns.length) {
            message.reply(
              `No se encontro un numero de warns mayor a tu numero.`
            );
            return collector.stop();
          }

          message.channel.send({
            content: `El warn numero ${
              m.content as unknown as number
            } con la razón: "${
              userWarns.warns[(m.content as unknown as number) - 1].reason
            }", agregado por <@${
              userWarns.warns[(m.content as unknown as number) - 1].moderator
            }> ha sido eliminado.`,
          });

          if (userWarns.warns.length == 1) {
            await warns.findOneAndDelete({
              guildId: message.guild.id,
              userId: userMention.id,
            });
          } else {
            userWarns.warns = await utils.pulk(
              userWarns.warns,
              userWarns.warns[
                (m.content as unknown as number as unknown as number) - 1
              ]
            );
            userWarns.save();
          }
          collector.stop();
        }
      });
      collector.on("end", () => {
        message.channel.send({ content: `Colector obtenido.` });
      });
    }
  },
});
