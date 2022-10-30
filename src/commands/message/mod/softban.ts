import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed } from "discord.js";
import { utils } from "../../../";

export default new Command({
    name: "softban",
    aliases: ["sb"],
    description: "Softbans a user",
    category: "mod",
    use: "<user> [reason]",
    isDev: false,
    botPermissions: ["BAN_MEMBERS"],
    userPermissions: ["BAN_MEMBERS"],

    async run ({ message, args, _guild }) {
        const userBan = message.mentions.members.first();
        if(!userBan) return utils.dataRequired("Necesitas mencionar a un usuario" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(!message.guild.members.resolve(userBan)) return utils.dataRequired("El usuario mencionado no esta en el servidor" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.id === message.author.id) return utils.dataRequired("No puedes softban a ti mismo" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.id === message.guild.ownerId) return utils.dataRequired("No puedes softban al dueño del servidor" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.id === message.guild.me.id) return utils.dataRequired("No puedes softban al bot" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.roles.highest.position >= message.member.roles.highest.position) return utils.dataRequired("No puedes softban a un usuario con un rol mayor o igual al tuyo" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.roles.highest.position >= message.guild.me.roles.highest.position) return utils.dataRequired("No puedes softban a un usuario con un rol mayor o igual al del bot" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(userBan.roles.highest.position >= message.guild.members.cache.get(message.guild.ownerId).roles.highest.position) return utils.dataRequired("No puedes softban a un usuario con un rol mayor o igual al del dueño del servidor" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(args[1].length > 1024) return utils.dataRequired("La razon no puede superar los 1024 caracteres" + `${_guild.configuration.prefix}softban <user> [reason]`);
        if(!userBan.bannable) return utils.dataRequired("No puedo banear a este usuario" + `${_guild.configuration.prefix}softban <user> [reason]`);
        const reason = (args.slice(1) as string[]).join(" ") || "No reason provided";

        await userBan.send(`Has sido softbanned por ${message.author.tag} por la razon: ${reason}`);
        await userBan.ban({ reason: reason, days: 7  });

    }
})