import { Command } from "../../../structures/CommandMsg";
import { warns as Warns } from "../../../database/Warns";
import { Timers } from "../../../database/Timers";
import { utils } from "../../..";
import { MessageEmbed, MessageActionRow, MessageButton } from "discord.js";
import { updateDataBase } from "../../../utils/CacheSystem/functions";


export default new Command({
    name: "warn",
    description: "Warn a user",
    category: "mod",
    use: "<user> <reason>",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ['MANAGE_ROLES'],
    
    run: async ({ message, args, client, _guild }) => {
        let reason = (args.slice(1) as string[]).join(" ");
        let userMention = message.mentions.members.first();
        if(!userMention)return message.reply(await utils.dataRequired('No se menciono a nadie.\n\n' + _guild.configuration.prefix + 'warn <userMention> [reason]'));
        if(_guild.moderation.dataModeration.forceReasons.length > 0) {
            if(!reason)return message.reply(await utils.dataRequired('La razón es obligatoria.\n\n' + _guild.configuration.prefix + 'warn <userMention> <reason>\n\n' + 'Razones validas' + ': ' + _guild.moderation.dataModeration.forceReasons.map(x => `${x}`).join(', ')));
            if(!_guild.moderation.dataModeration.forceReasons.includes(args[1]))return message.reply(await utils.dataRequired('Razón invalida.\n\n' + _guild.configuration.prefix + 'warn <userMention> <reason>\n\n' + 'Razónes validas' + ': ' + _guild.moderation.dataModeration.forceReasons.map(x => `${x}`).join(', ')));
        }
        if(!reason) reason = `Sin especificar.`;

        let userWarns = await Warns.findOne({ guildId: message.guild.id, userId: userMention.id });
        if(userWarns) {
            userWarns.warns.push({
                reason: reason,
                moderator: message.author.id,
            });
            userWarns.save();
        }else{
            let newUser = new Warns({
                guildId: message.guild.id,
                userId: userMention.id,
                warns: [{
                    reason: reason,
                    moderator: message.author.id
                }],
                subCount: 0
            });
            userWarns = newUser;
            newUser.save();
        }

        message.reply({ embeds: [ new MessageEmbed().setColor(0x0056ff).setDescription(`<@${userMention.id}>, Has sido advertido tienes ${userWarns.warns.length} Warns\n\nRazón: \`${(args as Array<string>).join(' ').split(`${userMention.id}> `)[1]}\`\nModerador: \`${message.author.tag}\``) ] });
        if((userWarns.warns.length == _guild.moderation.automoderator.actions.warns[0] || userWarns.warns.length == _guild.moderation.automoderator.actions.warns[1]) && _guild.configuration.subData.dontRepeatTheAutomoderatorAction == true) {
            message.reply({ content: `Se advirtio al usuario \`${userMention.user.username}\` tiene muchas infracciones pero esta acción automática del automoderador fue desactivada, eso quiere decir que no puedo mutearle/banearle/expulsarle.\n\n> Acción realizada por: Sistema automoderador.`, components: [
                new MessageActionRow().addComponents(new MessageButton().setCustomId('dontRepeatTheAutomoderatorAction').setLabel(`Activar el sistema.`).setStyle('DANGER'))
            ] });
        }

        if(_guild.moderation.automoderator.enable == true) {
            if(userWarns.warns.length == _guild.moderation.automoderator.actions.warns[0] && _guild.configuration.subData.dontRepeatTheAutomoderatorAction == false) {
                let remember = [];
                try{
                    userMention.roles.cache.forEach(x => {
                        remember.push(x.id);
                        userMention.roles.remove(x.id).catch(err => {});
                    });
                
                    userMention.roles.add(_guild.moderation.dataModeration.muterole).catch(err => {
                        message.channel.send(err);
                    });
                }catch(err) {
                    message.channel.send(err);
                }

                // Set timer:
                _guild.moderation.dataModeration.timers.push({
                    user: {
                        id: userMention.id,
                        username: userMention.user.username,
                        roles: remember
                    },
                    endAt: Date.now() + _guild.moderation.automoderator.actions.muteTime[0],
                    action: 'UNMUTE',
                    channel: message.channel.id,
                    inputTime: args[1]
                });
                updateDataBase(client, message.guild, _guild, true);
                let _timers = await Timers.findOne({ });
                if(!(_timers.servers as unknown as Array<any>).includes(message.guild.id)) {
                    (_timers.servers as unknown as Array<any>).push(message.guild.id);
                    _timers.save();
                }

                message.reply({ content: `He muteado a \`${userMention.user.username}\` durante \`${_guild.moderation.automoderator.actions.muteTime[1]}\`\n\n> Acción realizada por: Sistema automoderador ya que tenía muchas infracciónes.`, components: [
                    new MessageActionRow().addComponents(new MessageButton().setCustomId('dontRepeatTheAutomoderatorAction').setLabel(`No repetir esta acción.`).setStyle('DANGER'))
                ] });
            }else if(userWarns.warns.length == _guild.moderation.automoderator.actions.warns[1] && _guild.configuration.subData.dontRepeatTheAutomoderatorAction == false) {
                userMention.ban({ reason: (args as Array<string>).join(' ').split(`${userMention.id}> `)[1] });

                message.reply({ content: `He baneado a \`${userMention.user.username}\`\n\n> Acción realizada por: Sistema automoderador ya que tenía el máximo de infracciónes.`, components: [
                    new MessageActionRow().addComponents(new MessageButton().setCustomId('dontRepeatTheAutomoderatorAction').setLabel(`No repetir esta acción.`).setStyle('DANGER'))
                ] });
            }
        }
    }
});