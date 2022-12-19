import { TextChannel, ChannelType } from "discord.js";
import { Command } from "../../../structures/CommandMsg";
import { updateDataBase } from "../../../utils/CacheSystem/functions";
import { utils } from "../../..";

export default new Command({
    name: "logs",
    description: "Establece el canal de Logs",
    use: "{enable <channelMention>, disable}",
    category: "config",
    userPermissions: ["ManageGuild"],
    botPermissions: ["ViewChannel"],
    isDev: false,

    async run ({ client, message, args, _guild }) {
        if(!args[0])return message.reply(await utils.dataRequired('No has escrito el tipo de función.\n\n' + _guild.configuration.prefix + 'logs {enable <channelMention>, disable}'));   
        if(args[0] == "enable") {
            if(_guild.configuration.logs[0])return message.reply({ content: "Los logs ya estaban activos." });
            let channelMention = (message.mentions.channels.first() as TextChannel);
            if(!channelMention)return message.reply(await utils.dataRequired("Necesitas mencionar un canal de texto.\n\n" + _guild.configuration.prefix + "logs enable <channelMention>"));
            if(channelMention.type !== ChannelType.GuildText)return message.reply(await utils.dataRequired(".Necesitas mencionar un canal de texto.\n\n" + _guild.configuration.prefix + "logs enable <channelMention>"));
            if(message.guild.channels.resolve(channelMention.id)) {
                if(!(channelMention as TextChannel).parentId)return message.reply("`Error "+Buffer.from('003', 'base64')+"`: Channel must be on this guild.");
                _guild.configuration.logs = [ channelMention.id, message.channel.id ];
                updateDataBase(client, message.guild, _guild, true);
                message.reply({ content: "Los logs han sido activados correctamente." });
            }else{
                message.reply(await utils.dataRequired("¡El canal mencionado debe estar en este servidor!\n\n" + _guild.configuration.prefix + "logs enable <channelMention>"));
            }
        }else if(args[0] == "disable") {
            if(!_guild.configuration.logs[0])return message.reply({ content: "Los logs no estaban activos." });
            _guild.configuration.logs = [];
            updateDataBase(client, message.guild, _guild, true);
            message.reply({ content: "Los logs han sido desactivados correctamente." });
        }else{
            message.reply(await utils.dataRequired("¡Esa función no es válida!\n\n" + _guild.configuration.prefix + "logs {enable <channelMention>, <disable>"));
        }
    }
})