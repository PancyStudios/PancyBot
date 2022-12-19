import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { version } from "../../../../package.json";

export default new Command({
    name: "invite",
    description: "Invitacion del bot",
    category: "util",
    use: "",
    isDev: false,
    botPermissions: ["EmbedLinks"],
    async run({ message }) {
        const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Invite')
            .setURL("https://discord.com/api/oauth2/authorize?client_id=978037412078964847&permissions=8&scope=bot%20applications.commands")
            .setStyle(ButtonStyle.Link)
        )

        let embed = new EmbedBuilder()
            .setTitle("Invitacion del bot")
            .setColor("Blurple")
            .setDescription(`Puedes apoyarme invitandome a tu servidor con el boton de abajo`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed], components: [row] });
    }   
})