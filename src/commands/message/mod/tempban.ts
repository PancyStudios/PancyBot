import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder } from "discord.js"
import ms from "ms"

export default new Command({
    name: "tempban",
    description: "Banea temporalmente a alguien",
    category: "mod",
    use: "<User> <Time> [Reason]",
    userPermissions: ["BanMembers"],
    botPermissions: ["EmbedLinks", "BanMembers"],

    run: async ({ client, message, args, _guild }) => {
        message.reply('Commando en desarrollo')
    }
})