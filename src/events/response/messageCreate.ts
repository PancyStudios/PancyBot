import { Event } from "../../structures/Events";
import { client } from "../..";
import { fecthDataBase } from "../../utils/CacheSystem/functions";
import { fecthUsersDataBase } from "../../utils/CacheSystem/functions";
import { Message } from "discord.js";
import { GuildDataFirst } from "../../database/typings/Security";
import { antiRF } from "../../database/BotDataBase";

export default new Event('messageCreate', async msg => {
    const data = await antiRF.findOne({ user: msg.author.id })
    const {guild, author} = msg

    if(!guild) return console.log('No is guild');
    if(!guild.available) return console.log('Guild unavilable');

    let _guild = await fecthDataBase(client, guild, false) as GuildDataFirst;
    if(!_guild) return console.log('No cache');

    let _user = await fecthUsersDataBase(client, author, false)

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
    command.run({
      args,
      client,
      message: msg as Message,
      _guild: _guild
    })
})