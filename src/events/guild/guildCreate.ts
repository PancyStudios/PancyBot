import { client } from "../..";
import { Event } from "../../structures/Events";
import { install_commands } from "../../utils/install";

export default new Event('guildCreate', async guild => {
    install_commands(client, guild)
})