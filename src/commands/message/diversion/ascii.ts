import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder, Colors } from "discord.js";
import figlet from "figlet";

export default new Command({
    name: "ascii",
    description: "Muestra un texto ASCII",
    use: "[Texto]",
    category: "diversion",
    botPermissions: ["EmbedLinks"],
    isDev: false,

    async run({ message, args }) {
        let text = (args as String[]).join(" ");
        if(!text) return message.reply("No se escribio un texto");
        let ascii = figlet.textSync(text, { horizontalLayout: "full" });
        let embed = new EmbedBuilder()
            .setTitle("ASCII")
            .setColor(Colors.Blurple)
            .setDescription(ascii)
            .setFooter({ text: "Powered by figlet.js", iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed] });
    }
})