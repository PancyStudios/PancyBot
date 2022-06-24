import { client } from "../..";
import { Event } from "../../structures/Events";

export default new Event('shardReady', async (shardid, guilds) => {
    console.warn("[SHARD] El Shard numero: "+shardid+" inicio")
})