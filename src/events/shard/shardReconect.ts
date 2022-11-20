import { Event } from "../../structures/Events";

export default new Event('shardReconnecting', shardId => {
    console.warn(`[SHARD] Se reconecto con el Shard numero: ${shardId}`)
})