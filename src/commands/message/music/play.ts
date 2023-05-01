import { Command } from "../../../structures/CommandMsg";
import { TextChannel } from "discord.js";
import { player } from "../../..";
import { exclusiveUsers, botStaff } from "../../../utils/variables.json"
export default new Command({
    name: 'play', 
    description: 'Reproduce musica',
    category: "music",
    botPermissions: ['Connect', 'Speak'],
    use: '<Song>',

    async run ({ client, message, args }) {
      const memberChannel = message.member.voice.channel.id

      // Spawning lavalink player
      const player1 = await player.createConnection({
        guildId: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        deaf: true,
        mute: false
      })

      const resolve = await client.player.resolve({
        query: (args as string[]).join(' '),
        
      })
      const { loadType, tracks, playlistInfo } = resolve;
      // Adding in queue
      if (loadType === "PLAYLIST_LOADED") {
  
        for (let x of resolve.tracks) {
           x.info.requester = message.author;
            player1.queue.add(x);
  
        }
        message.channel.send({ content: `Added: \`${resolve.tracks.length} from ${resolve.playlistInfo.name}\`` });
        if (!player1.isPlaying && !player1.isPaused) return  player1.play();
  
      }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
        const track = tracks.shift();
      track.info.requester = message.author;
  
        
        
       player1.queue.add(track);         
          message.channel.send({ content: `Added: \`${track.info.title}\`` });
          if (!player1.isPlaying && !player1.isPaused) return  player1.play();
          
      }else{
        
         return message.channel.send({ content: "There are no results found."})
      }
    }
})