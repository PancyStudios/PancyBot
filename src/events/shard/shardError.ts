import { Event } from "../../structures/Events";

export default new Event('shardError', async (error, shardId) => {
    console.warn('[ERROR] Se detecto un error en el shard ' + shardId)
    console.error(error)
})