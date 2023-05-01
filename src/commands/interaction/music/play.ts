import { Command } from "../../../structures/CommandSlash";
import { ApplicationCommandOptionType, TextChannel } from "discord.js";
import { player } from "../../..";
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
        const song = args.getString('song')
        const memberChannel = interaction.member.voice.channel.id

        // Spawning lavalink player
        const player1 = player.createConnection({
          guildId: interaction.guild.id,
          voiceChannel: interaction.member.voice.channel.id,
          textChannel: interaction.channel.id,
          deaf: true,
          mute: false
        })
        
        if(!player1) return interaction.followUp('Error desconocido')

        const resolve = await player.resolve({
          query: song,
          source: 'spsearch'
        })
        const { loadType, tracks, playlistInfo } = resolve;
        // Adding in queue
        if (loadType === "PLAYLIST_LOADED") {
    
          for (let x of resolve.tracks) {
             x.info.requester = interaction.user;
              player1.queue.add(x);
    
          }
          interaction.followUp({ content: `Added: \`${resolve.tracks.length} from ${resolve.playlistInfo.name}\`` });
          if (!player1.isPlaying && !player1.isPaused) return  player1.play();
    
        }else if(loadType ==="SEARCH_RESULT"|| loadType ==="TRACK_LOADED"){
          const track = tracks.shift();
        track.info.requester = interaction.user;
    
          
          
         player1.queue.add(track);         
            interaction.followUp({ content: `Added: \`${track.info.title}\`` });
            if (!player1.isPlaying && !player1.isPaused) return  player1.play();
            
        }else{
           return interaction.followUp({ content: "There are no results found."})
        }
    }
})