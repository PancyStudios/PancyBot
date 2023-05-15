import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../../structures/CommandSlash";
import { updateDataBase } from "../../../utils/CacheSystem/functions";

export default new Command({
    name: "antibots",
    description: "Evita que se unan bots segun su tipo",
    options: [
        {
            name: "type",
            description: "Que tipo de bots expulso?",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Todos los bots',
                    value: 'all'
                },
                {
                    name: 'Solo bots sin verificar',
                    value: 'only_nv'
                },
                {
                    name: 'Solo bots verificados',
                    value: 'only_v'
                }
            ],
            required: true 
        }
    ],
    botPermissions: ['KickMembers'],

    run: async ({ interaction, args, _guild }) => {
        
    }
})