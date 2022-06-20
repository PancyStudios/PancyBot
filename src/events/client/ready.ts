import { Event } from "../../structures/Events";
import { version } from "../../../package.json"
import { client, danbotUser } from "../..";
import { cacheManagerDatabase } from "../../utils/CacheSystem/cacheManager";

export default new Event('ready', async (_client) => {
    console.log('Bot encendido')

    client.user.setPresence({
        activities: [
            {
                name:`PancyBot | ${version}`, 
                type:"WATCHING",
            }
        ],
        afk: false,
        shardId: 0,
        
    })
})