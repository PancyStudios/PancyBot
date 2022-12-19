import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder, Colors } from "discord.js";
import { ExtendedClient } from "../../../structures/Client";


export default new Command({
    name: "seticon",
    description: "Establece el icono del bot",
    category: "dev",
    use: "[URL_IMAGE]",
    isDev: true,
    botPermissions: ["EmbedLinks"],
    async run({ message, args, client }) {
        if (!args[0]) return message.reply("Debes especificar una imagen");
        let embed = new EmbedBuilder()
            .setTitle("Estableciendo icono del bot")
            .setColor(Colors.Yellow)
            .setDescription(`Estableciendo icono del bot...`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });
        try {
            message.reply({ embeds: [embed] }).then(async msg => {
                client.user.setAvatar((args[0] as string));
                embed.setDescription(`Icono establecido, reiniciando cliente...`);
                embed.setColor(Colors.Green);
                await msg.edit({ embeds: [embed] });
                const RestartClientEmbed = new EmbedBuilder()
                    .setTitle("Reiniciando cliente")
                    .setColor(Colors.Orange)
                    .setDescription(`Reiniciando cliente...`)
                    .setTimestamp()
                    .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });
                
                    await message.channel.send({ embeds: [RestartClientEmbed] });
                client.destroy();
                await client.start();
                embed.setDescription(`Cliente reiniciado, reiniciando servidor...`);
                embed.setColor(Colors.Yellow);
                await msg.edit({ embeds: [embed] })
            })
        } catch (e) {
            embed.setDescription(`Error: ${e.message}`);
        }
    }
})
