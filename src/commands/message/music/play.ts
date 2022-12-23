import { Command } from "../../../structures/CommandMsg";
import { TextChannel } from "discord.js";
import { exclusiveUsers, botStaff } from "../../../utils/variables.json"
export default new Command({
    name: 'play', 
    description: 'Reproduce musica',
    category: "music",
    botPermissions: ['Connect', 'Speak'],
    use: '<Song>',

    async run ({ client, message, args }) {
        if (botStaff.ownerBot !== message.author.id || !exclusiveUsers.some(x => x.id === message.author.id)) return message.reply("No tienes permitido usar este comando: \n\nDisponible para `ExclusiveUsers | botStaff`")
        const string = (args as []).join(' ') + "(Spotify)";
        if (!string) return message.reply(`:x: | Please enter a song url or query to search.`)
        if (string.includes("youtube")) return message.reply({ content: "Youtube Links no permitidos"})
        client.player.play(message.member.voice.channel, string, {
          member: message.member,
          textChannel: message.channel as TextChannel,
          message: message,
        })
    }
})