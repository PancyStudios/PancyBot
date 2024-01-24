import { Event } from "../../structures/Events";

export default new Event('shardDisconnect', async (close, shardId) => {
    const msgDisconnect = `Se desconecto el Shard ${shardId} con la siguiente informacion:\nCode: ${close.code}`
    console.error(msgDisconnect)
})

 