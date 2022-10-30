import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed } from "discord.js"
import ms from "ms"

export default new Command({
    name: "tempban",
    description: "Banea temporalmente a alguien",
    category: "mod",
    use: "<User> <Time> [Reason]",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["EMBED_LINKS", "BAN_MEMBERS"],

    run: async ({ client, args, _guild }) => {
        
    }
})