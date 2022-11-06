import { Event } from "../../structures/Events"
import { TempbanModel } from "../../database/Tempbans"


export default new Event("ready", async (client) => {
    setInterval(() => {
        let guilds = client.guilds.cache.size
        for (let i = 0; i < guilds; i++) {
            const guild = client.guilds.cache.at(i)
            const guildBans = guild.bans
            TempbanModel.find({ ServerId: guild.id }, {}, (err, data) => {
                if(err) throw new Error(`${err}`)
                data.forEach(x => {
                    const user = guild.members.cache.get(x.UserId)
                    if(!user) return;   
                    if(guildBans.resolveId(user)) {
                        if(x.Expira <= Date.now()) {
                            guild.members.unban(user, "Tiempo de ban expirado")
                        }
                    }
                    x.delete()
                })
            })
        }
    }, 60 * 1000)
})
