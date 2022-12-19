import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder, Colors } from "discord.js";
import { version, dependencies } from "../../../../package.json";

export default new Command({
    name: "help",
    description: "Comando de ayuda",
    category: "util",
    use: "",
    isDev: false,
    botPermissions: ["EmbedLinks"],
    async run({ client, message, _guild }) {
        const HelpEmbed = new EmbedBuilder()
        .setTitle(client.user.username)
        .setAuthor({ name: message.author.username, iconURL: message.author.avatarURL() })
        .setColor(Colors.Blurple)
        .setDescription(`
            **📚 | Comandos de ayuda**
            \`\`\`${_guild.configuration.prefix}help\`\`\` Muestra los comandos basicos
            \`\`\`${_guild.configuration.prefix}invite\`\`\` Muestra la invitacion del bot
            \`\`\`${_guild.configuration.prefix}commands\`\`\` Muestra la lista de comandos
            \`\`\`${_guild.configuration.prefix}commands [Command]\`\`\` Muestra informacion sobre un comando
            \`\`\`<BotMention> prefix\`\`\` Muestra el prefijo actual
        `)
        message.reply({ embeds: [HelpEmbed] });
    }
})
    