import { EmbedBuilder } from "@discordjs/builders";
import { Colors, Guild, GuildMember, TextChannel, User } from "discord.js"
import { Command } from "../../../structures/CommandMsg";

export default new Command({
    name: "ban",
    description: "Banea a un usuario del servidor",
    category: "mod",
    use: "<User> [Reason]",
    userPermissions: ["BanMembers"],
    botPermissions: ["BanMembers", "EmbedLinks"],

    async run({client, message, args, _guild}) {
        const canal = client.channels.cache.get("872627833225232434");
        const embed = new EmbedBuilder()
          .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
          .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL()});
    
        if (!args[0]) {
          embed.setDescription("Debes que mencionar a un usuario.");
          embed.setColor(Colors.Red);
          return message
            .reply({ embeds: [embed] })
            .then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 3000)
            });
        }
    
        let member =
          message.mentions.members.first() ||
          message.guild.members.resolve((args as any[])[0]) ||
          message.guild.members.cache.find(
            (m) => m.user.username.toLowerCase() == args[0]
          ) ||
          (await client.users.fetch((args as any[])[0]));
        if (!member || member.id == message.author.id) {
          embed.setDescription("Debes que mencionar a un usuario.");
          embed.setColor(Colors.Red);
          return message.reply({ embeds: [embed] });
        }
    
    
        if (message.guild.members.resolve(member.id)) {
          if (
            message.member.roles.highest.comparePositionTo((member as GuildMember).roles.highest) <=
            0
          ) {
            embed.setDescription(
              "No puedes banear a un usuario con mayor o igual nivel jerarquico que tu."
            );
            embed.setColor(Colors.Red);
            return message.reply({ embeds: [embed] });
          }
          if (!(member as GuildMember).bannable) {
            embed.setDescription("No puedo banear a este usuario");
            embed.setColor(Colors.Red);
            return message.reply({ embeds: [embed] });
          }
        }
        let razon = (args.slice(1) as any[]).join(" ")
          ? (args.slice(1) as any[]).join(" ")
          : "Razon sin especificar";
        message.guild.members.ban(member.id, {
          reason: `${message.author.tag} - ${razon}`,
        });
        embed
          .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL()})
          .setThumbnail(
            !!(member as GuildMember).user
              ? (member as GuildMember).user.displayAvatarURL()
              : member.displayAvatarURL()
          )
          .setTitle("Baneo exitoso ")
          .addFields([
            {
                name: "> Usuario Baneado",
                value: !!(member as any).user ? (member as GuildMember).user.tag : (member as User).tag
            },
            {
                name: "> Razón:",
                value: razon
            },
            {
                name: "> ID del Moderador:",
                value: message.author.id
            },
            {
                name: "> ID del Servidor:",
                value: message.guild.id
            }
          ])
          .setColor(Colors.Aqua)
          .setTimestamp();
    
        if (!!(member as any).user) (member as any).user.send({ embeds: [embed] }).catch((e) => e);
        message.reply({ embeds: [embed] });
        (canal as TextChannel).send({ embeds: [embed] });
    }
})