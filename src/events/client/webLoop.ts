import { Event } from "../../structures/Events"
import axios from "axios"

export default new Event("ready", async (client) => { 
    setTimeout(() => {
        axios.post('https://pancybot.ga/api/info', {
        apikey: process.env.PasswordApi,
        info: {
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
            channels: client.channels.cache.size}
    }, {
        maxRedirects: 100
    }).then(x => {
        console.log(x.status)
    }).finally(() => { console.log('send')})
    }, 30 * 1000)
})