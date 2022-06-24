import { TextChannel } from "discord.js";
import { Command } from "../../../structures/CommandMsg";
import { updateDataBase } from "../../../utils/CacheSystem/functions";

export default new Command({
    name: "setprefix",
    description: "Set the prefix of the command",
    category: __dirname,
    use: '<NewPrefix>',
    userPermissions: ['MANAGE_GUILD'],

    async run({ message, args, client, _guild }) {
        
        if(!message.member.permissions.has('ADMINISTRATOR'))return message.reply({ content: 'Necesitas permisos de __Administrador__.'});
        if(!args[0])return message.reply('Especifica prefix');
        if(args[0].length > 5)return message.reply('¡Ese prefijo es muy largo!');
        _guild.configuration.prefix = (args[0] as string);
        updateDataBase(client, message.guild, _guild, true);
        message.reply({ content: `> Prefijo actualizado a \`${args[0]}\`` });
        (client.channels.cache.get('822642829335593081') as TextChannel).send(`Prefix actualizado a \`${args[0]}\` en **${message.guild.name}** (${message.guild.id})`);
    }
})