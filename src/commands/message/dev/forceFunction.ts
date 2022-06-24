import { Command } from "../../../structures/CommandMsg";
import { install_commands } from "../../../utils/install";

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
        } else {
            message.reply('No existe la funcion')
        }
    }
})