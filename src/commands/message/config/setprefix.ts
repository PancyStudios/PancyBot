import { Command } from "../../../structures/CommandMsg";
import { updateDataBase } from "../../../utils/CacheSystem/functions";

export default new Command({
    name: "setprefix",
    description: "Set the prefix of the command",
    category: __dirname,
    use: '<NewPrefix>',

    async run ({ message, args, client, _guild }) {
        
    }
})