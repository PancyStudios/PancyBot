import { Command } from '../../../structures/CommandMsg'
import { utils } from '../../..'
import { MessageEmbed } from 'discord.js'

export default new Command({
    name: '8ball',
    description: "Preguntale algo al bot",
    use: '[Pregunta]',
    category: __dirname,

    async run({ message, args, _guild }) {
        const responses = ['Si', 'No', 'Tal vez', 'Probablemente', 'Probablemente no', 'No se', 'Tu que piensas?']
        const random = responses[Math.floor(Math.random() * responses.length)]
        const question = (args as Array<string>).join(' ')

        if(!question) return utils.dataRequired(`No se escribio una pregunta\n\n${_guild.configuration.prefix}8ball <Pregunta>`)
        
        const EmbedQuest = new MessageEmbed()
        .setTitle('8ball')
        .setFields([
            {
                name: 'Pregunta',
                value: question
            },
            {
                name: 'Respuesta',
                value: random
            }
        ])
        .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL()}` })
        .setTimestamp()
        .setColor('RANDOM')

        message.reply({ embeds: [EmbedQuest] })
    }
})