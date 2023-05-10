import { Event } from "../../structures/Events";
import { PojDB } from "../../database/PojDatabase";
import { TextChannel } from 'discord.js'

export default new Event('guildMemberAdd', async (member) => {
    const { guild, id } = member    

    try {
        const PojGuild = await PojDB.findOne({ guildId: guild.id })
        if(!PojGuild) return;

        const channels = PojGuild.channels
        channels.forEach(async Id => {
            const channel = guild.channels.cache.get(Id);
            const message = await (channel as TextChannel).send(`<@${id}>`)
            setTimeout(() => {
                message.delete()
            }, 1000)
        })
    } catch (err) {
        console.log(err)
    }
})