import { Event } from "../../structures/Events";
import { version } from "../../../package.json"
import { client, danbotUser } from "../..";
import { ActivityType } from "discord.js"
export default new Event('ready', async () => {
    console.log('Bot encendido')

    const activities = [
        `PancyBot | ${version}`,
        `pan! | ${version}`,
        `Naoki Solutions | ${version}`,
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
})