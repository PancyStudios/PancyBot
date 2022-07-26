import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "prefix",
    description: "Muestra el prefijo actual",
    category: __dirname,
    use: "",
    isDev: false,
    botPermissions: ["EMBED_LINKS"],

    async run({ message, args, client, _guild }) {
        let embed = new MessageEmbed()
            .setTitle("Este es el prefix actual")
            .setColor("RANDOM")
            .setDescription(`\`${_guild.configuration.prefix}\``)
            .setFooter({ text: "Powered by CacheSystem", iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
})