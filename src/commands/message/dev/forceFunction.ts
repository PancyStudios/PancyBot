import { Command } from "../../../structures/CommandMsg";
import { install_commands } from "../../../utils/install";
import { version } from '../../../../package.json'
import { EmbedBuilder, Colors, WebhookClient } from "discord.js";
import { app } from "../../../utils/SystemServer";

const Webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/990077896498483260/tATJeJMEF03sfW0G3YwUCCrmGd7znIimQuFpwG-5tMs8DGQsMwoTFPMdL60bt8cf0_vJ'})

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
            const Embed = new EmbedBuilder()
            .setDescription('Tested')

            const message2 = await Webhook.send({
                username: `PancyBot ${version} | CrashError`,
                avatarURL: 'https://califerbot.tk/assets/img/LaTurbis.jpg',
                embeds: [
                    Embed
                ],
            })

            console.warn(`[AntiCrash] :: Sent CrashError to Webhook, Type: ${message2.type}`);

            message.reply(`Status Code: ${message2.id}`) // Status Code: 200
        } else if(args[0] === "killSystem") {
            const Embed = new EmbedBuilder()
            .setDescription('Estas seguro que quieres forzar esta funcion?, en caso de estar seguro escribe `confirm`')
            .setColor(Colors.Yellow)
            .setFooter({ text: `PancyBot v${version} | Dev Funtions`, iconURL: client.user.avatarURL() })
            
            const msg_filter = (m) => m.author.id === message.author.id && m.channelId === message.channelId;
            const collector = message.channel.awaitMessages({ time: 15000, filter: msg_filter, max: 1 })

            message.reply({ embeds: [Embed] }).then(async msg => {
                collector.then(async x => {
                    const actionConfirm = x.first().content 
                    if(!actionConfirm) {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                        
                    }
                    if(actionConfirm !== 'confirm') {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                    }

                    const EmbedConfirm = new EmbedBuilder()
                    .setDescription("Apagando sistema...\n\n\n||Es probable que tengas que volver a ejecutar este comando mas de 2 veces||")
                    msg.edit({ embeds: [EmbedConfirm], })

                    await msg.react('✅')
                    client.destroy()
                    process.exit(1)
                })
            })

        } else if(args[0] === "killWebServer") {
            const Embed = new EmbedBuilder()
            .setDescription('Estas seguro que quieres forzar esta funcion?, esto dejara al bot sin acceso a la api de Top.gg usada para votar\n\n en caso de estar seguro escribe `confirm`')
            .setColor(Colors.Yellow)
            .setFooter({ text: `PancyBot v${version} | Dev Funtions`, iconURL: client.user.avatarURL() })
            
            const msg_filter = (m) => m.author.id === message.author.id && m.channelId === message.channelId;
            const collector = message.channel.awaitMessages({ time: 15000, filter: msg_filter, max: 1 })

            message.reply({ embeds: [Embed] }).then(async msg => {
                collector.then(async x => {
                    const actionConfirm = x.first().content 
                    if(!actionConfirm) {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                        
                    }
                    if(actionConfirm !== 'confirm') {
                        Embed.setDescription('Accion cancelada')
                        msg.edit({ embeds: [Embed] })
                                                return
                    }

                    const EmbedConfirm = new EmbedBuilder()
                    .setDescription("Apagando la pagina local...")
                    .setColor('Red')
                    .setTimestamp()
                    msg.edit({ embeds: [EmbedConfirm], })

                    app.removeAllListeners()
                    await msg.react('✅')
                })
            })
        }
        else {
            message.reply('No existe la funcion')
        }
    }
})