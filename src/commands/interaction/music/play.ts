import { Command } from "../../../structures/CommandSlash";
import { ApplicationCommandOptionType, TextChannel } from "discord.js";
import { exclusiveUsers, botStaff } from "../../../utils/variables.json"
export default new Command({
    name: 'play', 
    description: 'Reproduce musica',
    options: [{
        name: "song",
        description: "URL o nombre de la cancion",
        type: ApplicationCommandOptionType.String,
        required: true
    }],

    async run ({ client, interaction, args }) {
        if (botStaff.ownerBot !== interaction.user.id || !exclusiveUsers.some(x => x.id === interaction.user.id)) return interaction.followUp("No tienes permitido usar este comando: \n\nDisponible para `ExclusiveUsers | botStaff`")
        const string = args.getString('song');
        if (!string) return interaction.followUp(`:x: | Please enter a song url or query to search.`)
        if (string.includes('youtube')) return interaction.followUp({ content: "Links de youtube no permitidos" })
        const msg = await interaction.followUp('** **')
        
        client.player.play(interaction.member.voice.channel, string, {
            member: interaction.member,
            textChannel: interaction.channel,
            message: msg,
        })
    }
})