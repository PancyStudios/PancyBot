import { Event } from "../../structures/Events";
import { version } from "../../../package.json"
import { client, crashClient, danbotUser } from "../..";
import { ActivityType } from "discord.js"
import { player } from "../..";
export default new Event('ready', async (o) => {
    console.log('Bot encendido')

    const activities = [
        `PancyBot | ${version}`,
        `pan! | ${version}`,
        `PancyBot Studios | ${version}`
    ]

    const random = activities[Math.floor(Math.random() * activities.length)]

    setInterval(() => {
        client.user.setPresence({
            activities: [{
                name: random,
                type: ActivityType.Playing,
            }],
            afk: false,
        })
    }, 1000 * 15)

    

    console.log('001')
    console.log(player.nodes)
    player.init(o)
    console.log(player.isActivated)
})