import { Event } from "../../structures/Events";
import { version } from "../../../package.json"
import { client, danbotUser } from "../..";
export default new Event('ready', async (_client) => {
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
                type: 'PLAYING'
            }],
            afk: false,
        })
    }, 1000 * 15)
})