import { Command } from "../../../structures/CommandMsg";
import { install_commands } from "../../../utils/install";
import { curly } from 'node-libcurl' 
import { version } from '../../../../package.json'
import { MessageEmbed } from "discord.js";

export default new Command({
    name: 'force',
    description: 'Fuerza el uso de una funcion',
    use: '<function>',
    category: 'dev',
    isDev: true,

    async run({ message, args, client }) {
        if(args[0] === 'install') {
            install_commands(client, message.guild)
            .catch(x => {
                message.reply('Ocurrio un error al ejecutar la funcion. Mas info en consola')
                console.error(x)
            })
            .finally(() => {
                message.reply('Se completo la funcion')
            })
        } else if(args[0] === 'webhookPost') {
            const Embed = new MessageEmbed()
            .setDescription('Tested')

            const {statusCode} = await curly.post(process.env.errorWebhook, {
                postFields: JSON.stringify({
                    username: `PancyBot ${version} | ForceFunctions`,
                    embeds: [
                        Embed
                    ]
                }),
                httpHeader: [
                    'Content-Type: application/json',
                ],
            });

            message.reply(`Status Code: ${statusCode}`) // Status Code: 200
        }
        else {
            message.reply('No existe la funcion')
        }
    }
})