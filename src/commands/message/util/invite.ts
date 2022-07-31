import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { version } from "../../../../package.json";

export default new Command({
    name: "invite",
    description: "Invitacion del bot",
    category: "util",
    use: "",
    isDev: false,
    botPermissions: ["EMBED_LINKS"],
    async run({ message }) {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Invite')
            .setURL("https://discord.com/api/oauth2/authorize?client_id=978037412078964847&permissions=8&scope=bot%20applications.commands")
            .setStyle("LINK")
        )

        let embed = new MessageEmbed()
            .setTitle("Invitacion del bot")
            .setColor("RANDOM")
            .setDescription(`Puedes apoyarme invitandome a tu servidor con el boton de abajo`)
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });

        message.reply({ embeds: [embed], components: [row] });
    }   
})