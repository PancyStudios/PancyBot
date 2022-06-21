import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed } from "discord.js";
import { version, dependencies } from '../../../../package.json'

export default new Command({
    name: 'info',
    description: 'Command info',
    category: __dirname,
    use: '',

    async run ({ message, args, client })  {    

    }
})