import { Command } from "../../../structures/CommandSlash";
import { ApplicationCommandOptionType, ChannelType, TextChannel, EmbedBuilder } from "discord.js";
import { PojDB } from '../../../database/PojDatabase'

export default new Command({
    name: "poj",
    description: "Menciona a los usuarios cada que se unen en diferentes canales",
    options: [
        {
            name: "add",
            description: "Añade un poj",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Canal donde va a ser mencionado el nuevo usuario",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }
            ], 
        },
        {   
            name: "del",
            description: "Elimina un poj",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "channel",
                    description: "Canal del cual vas a quitar el poj",
                    type: ApplicationCommandOptionType.Channel,
                    channelTypes: [ChannelType.GuildText],
                    required: true
                }
            ], 
        },
        {
            name: "list",
            description: "Lista de poj",
            type: ApplicationCommandOptionType.Subcommand,
        }
    ],
    botPermissions: ['SendMessages', 'EmbedLinks'],
    userPermissions: ['ManageGuild'],

    run: async ({ interaction, args }) => {
        const command = args.getSubcommand()
        const channel = (args.getChannel('channel') as TextChannel) 

        let GuildBase = await PojDB.findOne({ guildId: interaction.guild.id })
        switch (command) {
            case 'add':
                if(channel.type !== ChannelType.GuildText) return interaction.followUp({ content: 'No es un GuildText channel' })
                channel.sendTyping()
                .catch(_ => {
                    interaction.followUp({ content: 'Ocurrio un error al intentar agregar el canal puede que el bot no tenga acceso a este canal o no tenga permisos de mandar mensajes', ephemeral: true })
                })
                if(GuildBase) {
                    const IsReady = GuildBase.channels.find(Id => Id === channel.id)
                    if(IsReady) return interaction.followUp({ content: 'Este canal ya esta añadido'})
                    GuildBase.channels.push(channel.id)
                    GuildBase.save()
                } else {
                    const IsReady = GuildBase.channels.find(Id => Id === channel.id)
                    if(IsReady) return interaction.followUp({ content: 'Este canal ya esta añadido'})
                    let newGuild = new PojDB({
                        guildId: interaction.guild.id,
                        channels: [channel.id]
                    })
                    GuildBase = newGuild
                    newGuild.save()
                }
                interaction.followUp({ content: 'Poj añadido'})
            break;
            case 'del':
                if(!GuildBase) return interaction.followUp({ content: `No hay canales añadidos`, ephemeral: true })
                let channels = GuildBase.channels 
                const channelDel = channels.find(channelId => channelId === channel.id)
                if(!channelDel) return interaction.followUp({ content: 'Este canal no esta añadido' })
                const index = channels.indexOf(channelDel)
                if(index !== -1) {
                    channels.splice(index, 1)
                }
                GuildBase.channels = channels
                GuildBase.save()
                interaction.followUp({ content: 'Poj eliminado' })
            break;
            case 'list':
                if(!GuildBase) return interaction.followUp({ content: `No hay canales añadidos`, ephemeral: true })
                let cc = 1
                interaction.followUp({ embeds: [
                    new EmbedBuilder()
                    .setTitle('Poj list')
                    .setDescription(
                        `Estas viendo los ${GuildBase.channels.length} pojs del servidor
                        \n\n${GuildBase.channels
                          .map(
                            (x) =>
                              `\`${cc++}-\` __<#${x}>__`
                          )
                          .join("\n")}`
                    )
                    .setColor('Blurple')
                ]})
            break;
            default:
                interaction.followUp({ content: `Error desconocido` })
            break;
        }
    }
})