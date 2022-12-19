import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder } from "discord.js";

export default new Command({
    name: "prefix",
    description: "Muestra el prefijo actual",
    category: "util",
    use: "",
    isDev: false,
    botPermissions: ["EmbedLinks"],

    async run({ message, args, client, _guild }) {
        let embed = new EmbedBuilder()
            .setTitle("Este es el prefix actual")
            .setColor("Blue")
            .setDescription(`\`${_guild.configuration.prefix}\``)
            .setFooter({ text: "Powered by CacheSystem", iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
})