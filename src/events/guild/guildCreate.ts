import { client } from "../..";
import { Event } from "../../structures/Events";
import { install_commands } from "../../utils/install";
import { privateBot } from "../../../package.json"

export default new Event('guildCreate', async guild => {
    if(privateBot === true) {
        
    } else {
        install_commands(client, guild)
    }
})