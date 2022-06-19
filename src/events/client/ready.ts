import { Event } from "../../structures/Events";
import { version } from "../../../package.json"

export default new Event('ready', (client) => {
    console.log('Bot encendido')

    client.user.setPresence({activities:[{name:`PancyBot | ${version}`, type:"WATCHING"}]})
})