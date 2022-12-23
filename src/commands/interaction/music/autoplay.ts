import { Command } from "../../../structures/CommandSlash";
import { exclusiveUsers, botStaff } from "../../../utils/variables.json"

export default new Command({
    name: 'autoplay',
    description: 'Reproduce automaticamente canciones',
    run: async ({ client, interaction, args }) => {
        if (botStaff.ownerBot !== interaction.user.id || !exclusiveUsers.some(x => x.id === interaction.user.id)) return interaction.followUp("No tienes permitido usar este comando: \n\nDisponible para `ExclusiveUsers | botStaff`")
        const queue = client.player.getQueue(interaction.guild.id)
        if (!queue) return interaction.followUp(`:x: | There is nothing in the queue right now!`)
        const autoplay = queue.toggleAutoplay()
        interaction.followUp(` | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
    }
})