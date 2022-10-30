import { Event } from "../../structures/Events";
import { client } from "../..";
import { fecthDataBase, updateDataBase } from "../../utils/CacheSystem/functions";
import { fecthUsersDataBase, updateUsersDataBase } from "../../utils/CacheSystem/functions";
import { utils } from "../..";
import { Message, TextChannel } from "discord.js";
import { GuildDataFirst } from "../../database/typings/Security";
import { antiRF } from "../../database/BotDataBase";
import { botStaff } from '../../utils/variables.json'
import ms from 'ms';
import antiIpLogger from 'anti-ip-logger'
const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default new Event('messageCreate', async msg => {
    const data = await antiRF.findOne({ user: msg.author.id })
    const {guild, author} = msg

    if(!guild) return console.log('No is guild');
    if(!guild.available) return console.log('Guild unavilable');

    let _guild = await fecthDataBase(client, guild, false) as GuildDataFirst;
    if(!_guild) return console.log('No cache');

    let _user = await fecthUsersDataBase(client, author, false)
    let cache = await client.super.cache.get(msg.author.id);

    try{
        if(!msg.member.permissions.has('MANAGE_MESSAGES')) {

            // Badwords:
            for(let x of _guild.moderation.dataModeration.badwords) {
                if(msg.content.toLowerCase().includes(x)) {
                    msg.reply({ content: `¡La palabra \`${x}\` está prohibida!` }).then(x => {
                        setTimeout(() => {
                            msg.delete().catch(err => {});
                            x.delete();
                        }, 2000);
                    });

                    if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.badwordDetect == true) {
                        await utils.automoderator(client, _guild, msg, 'Malas palabras.');
                    }
                }
            }

            // BasicFlood:
            if(_guild.protection.antiflood == true) {
                if(cache.amount >= _guild.moderation.automoderator.actions.floodDetect) {
                    msg.channel.send({ content: `¡Deja de hacer flood <@${msg.author.id}>!` });
                    if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.floodDetect == true) {
                        await utils.automoderator(client, _guild, msg, 'Flood.');
                    }
                }else{
                    client.super.cache.up(msg.author.id, cache);

                    setTimeout(() => {
                        client.super.cache.down(msg.author.id, cache);
                    }, 3000);
                }
            }

            // ManyPings:
            if(_guild.moderation.dataModeration.events.manyPings == true) {
                if(msg.content.split('@').length - 1 >= _guild.moderation.automoderator.actions.manyPings) {
                    msg.reply({ content: '¡No hagas tantas menciones!' }).then(async x => {
                        setTimeout(() => {
                            x.delete();
                            msg.delete().catch(err => {});
                        }, 2000);
                        if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.manyPings == true) {
                            await utils.automoderator(client, _guild, msg, 'Demasiadas menciones en un mismo mensaje.');
                        }
                    });
                }
            }

            // CapitalLetters:
            if(_guild.moderation.dataModeration.events.capitalLetters == true) {
                if(msg.content.length >= 6) {
                    let contar = 0;
                    for(let i = 0; i < mayus.length; i++) {
                        for(let x = 0; x < msg.content.length; x++) {
                            if(msg.content[x] == mayus[i]) {
                                contar++;
                            }
                        }
                    }
                    if(contar >= msg.content.length / 2) {
                        msg.reply({ content: '¡No escribas tantas mayúsculas!' }).then(async x => {
                            setTimeout(() => {
                                x.delete();
                                msg.delete().catch(err => {});
                            }, 2000);
                            if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.capitalLetters == true) {
                                await utils.automoderator(client, _guild, msg, 'Muchas mayúsculas en un mismo mensaje.');
                            }
                        });
                    }
                }
            }

            // ManyEmojis:
            if(_guild.moderation.dataModeration.events.manyEmojis == true) {
                if(!msg.content.includes('@') && (msg.content.split('<:').length - 1 >= _guild.moderation.automoderator.actions.manyEmojis || msg.content.split(/\p{Emoji}/u).length - 1 >= _guild.moderation.automoderator.actions.manyEmojis) && msg.content.split(/\p{Emoji}/u).length - 1 != 18) {
                    msg.reply({ content: 'No puedes escribir tantos emojis.' }).then(async x => {
                        setTimeout(() => {
                            x.delete();
                            msg.delete().catch(err => {});
                        }, 2000);
                        if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.manyEmojis == true) {
                            await utils.automoderator(client, _guild, msg, 'Demasiados emojis en un mismo mensaje.');
                        }
                    });
                }
            }

            // ManyWords:
            if(_guild.moderation.dataModeration.events.manyWords == true) {
                if(msg.content.length >= _guild.moderation.automoderator.actions.manyWords) {
                    msg.reply({ content: 'Escribe como máximo 250 caracteres.' }).then(async x => {
                        setTimeout(() => {
                            x.delete();
                            msg.delete().catch(err => {});
                        }, 2000);
                        if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.manyWords == true) {
                            await utils.automoderator(client, _guild, msg, 'Mensajes muy largos.');
                        }
                    });
                }
            }

            // LinkDetect:
            if(_guild.moderation.dataModeration.events.linkDetect == true) {
                if(msg.content.includes('http') || msg.content.includes('.gg')) {
                    let detect = false;
                    _guild.moderation.automoderator.actions.linksToIgnore.forEach(x => {
                        if(msg.content.includes(x)) detect = true;
                    });
                    if(detect == false) {
                        msg.reply({ content: '¡No hagas spam!' }).then(async x => {
                            setTimeout(() => {
                                x.delete();
                                msg.delete().catch(err => {});
                            }, 2000);
                            if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.linkDetect == true) {
                                await utils.automoderator(client, _guild, msg, 'Publicar enlaces.');
                            }
                        });
                    }
                }
            }

            // iploggerFilter
            if(_guild.moderation.dataModeration.events.iploggerFilter == true && msg.content.includes('http')) {
                (msg as any).rememberContent = msg.content;
                (msg.content as any) = msg.content.split(' ');
                msg.content = (msg.content as any).filter(word => word.includes('http'));
                if(msg.content[0]) msg.content = msg.content[0];
                else msg.content = (msg as any).rememberContent;

                if(await antiIpLogger(`${msg.content}`)) {
                    msg.reply({ content: '¡Ese link contiene un iplogger!' }).then(async x => {
                        setTimeout(() => {
                            x.delete();
                            msg.delete().catch(err => {});
                        }, 2000);
                        if(_guild.moderation.automoderator.enable == true && _guild.moderation.automoderator.events.iploggerFilter == true) {
                            await utils.automoderator(client, _guild, msg, 'Enviar iploggers.');
                        }
                    });
                }
            }
        }

        // IntelligentAntiflood:
        if(_guild.protection.intelligentAntiflood == true) {
            if(msg.guild.me.permissions.has('KICK_MEMBERS')) {
                if(`${(msg.channel as TextChannel).name}`.includes('flood') || (`${(msg.channel as TextChannel).topic}`.includes('permite') && `${(msg.channel as TextChannel).topic}`.includes('flood') && !`${(msg.channel as TextChannel).topic}`.includes('no')))return;
                if(msg.content == cache.lastContent) {
                    cache.lastContent = msg.content;
                    client.super.cache.up(msg.author.id, cache);
                    if(cache.amount >= 5) {
                        client.super.cache.delete(msg.author.id);

                        msg.guild.members.ban(msg.author.id, { reason: 'Flood masivo.' }).then(async () => {
                            msg.channel.send('He baneado al usuario.');
                            if(_guild.protection.intelligentSOS.enable == true) {
                                await utils.intelligentSOS(_guild, client, 'Flood masivo');
                            }
                        }).catch(err => {});
                    }
                    msg.delete().catch(err => {});

                    setTimeout(() => {
                        client.super.cache.delete(msg.author.id);
                    }, 6100);
                }else{
                    cache.lastContent = msg.content;
                    client.super.cache.post(msg.author.id, cache);
                }
            }
        }

        // Infecteds users with antiraid system:
        if(_guild.protection.antiraid.enable == true && msg.member.moderatable) {
            let newmsg = `${msg.content}`.toLowerCase();
            if((newmsg.includes('free') || newmsg.includes('steam') || newmsg.includes('discord')) && newmsg.includes('nitro') && newmsg.includes('http')) {
                msg.member.timeout(ms('7d'), 'Usuario infectado.').then(() => {
                    setTimeout(() => {
                        msg.delete();
                    }, 2000);
                    msg.reply({ content: 'Un usuario infectado ha aparecido regalando nitro falso en el servidor (`' + msg.author.id + '`), lo he muteado una semana.' });
                }).catch(e => {});
            }
        }

        // Disable raidmode:
        if(_guild.protection.raidmode.enable == true && _guild.protection.raidmode.activedDate + ms(_guild.protection.raidmode.timeToDisable) <= Date.now()) {
            _guild.protection.raidmode.enable = false;
            updateDataBase(client, msg.guild, _guild);
            msg.reply({ content: '`Raidmode fue desactivado:` Ha expirado el tiempo establecido desde la activación.' });
        }

    }catch(err) {}

    let prefix = _guild.configuration.prefix
    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
      );
    
    if (!prefixRegex.test(msg.content)) return;
    if(msg.author.bot) return msg.reply('LOS BOTS NO PUEDEN USAR COMANDOS')

    
    const [, matchedPrefix] = msg.content.match(prefixRegex);

    const args = msg.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;

    const command = client.commandsMsg.get(cmd)
    if(command) {

      let userPermissions = command.userPermissions;
      let botPermissions = command.botPermissions;
      if(!msg.member.permissions.has(userPermissions || [])) return msg.reply(`No tienes permisos para ejecutar este comando.\n Uno de estos permisos puede faltar: \`${typeof userPermissions === 'string' ? userPermissions : userPermissions.join(', ')}\``)
      if(!msg.guild.me.permissions.has(botPermissions || [])) return msg.reply(`No tengo permisos para ejecutar este comando.\n Uno de estos permisos puede faltar: \`${typeof botPermissions === 'string' ? botPermissions : botPermissions.join(', ')}\``)
      if(command.isDev) {
        if(msg.author.id !== botStaff.ownerBot) return msg.reply('Comando solo de desarrollador')
        command.run({
          args,
          client,
          message: msg,
          _guild: _guild
        })
      } else {
        command.run({
          args,
          client,
          message: msg,
          _guild: _guild
        })
      }
    } else {
      msg.reply('No existe el comando:' + cmd)
    }
  }
)