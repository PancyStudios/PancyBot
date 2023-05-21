import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'
import { AntiCrash } from "./utils/SystemError/CrashError";
import { PancyBotUtils } from "./utils/SystemBot/BaseUtilsBot";
import { app } from "./utils/SystemServer";
import { sendImage } from "./utils/SystemBot/sendImage";
import danbot from 'danbot-hosting';
import donenv from 'dotenv';
import { Client } from 'craiyon';
import fs, { readdir } from "fs";
import path from "path";
import { ButtonBuilder, EmbedBuilder, ActionRowBuilder, TextChannel, ButtonStyle, ButtonInteraction, GuildMember } from 'discord.js'
import { Poru } from "poru";
import { Spotify } from "poru-spotify";
import ms from 'ms';


donenv.config();
const firstTime = Date.now();

var PORT = process.env.PORT || 3000
export const client = new ExtendedClient()
export const crashClient = new AntiCrash()
export const utils = new PancyBotUtils()
export const craiyon = new Client()
export let filesTemp = []
client.start()
crashClient.inint()
export const danbotUser = new danbot.Client('danbot-U&o8QDNj6L$%QWlSuj6TE1Mr&uVmKLOfFi5meGxO', client)

const database = connect(process.env.mongodbUrl, {
    keepAlive: true
})

database.then(x => console.log('DatabaseOn '))
.catch(y => console.log(`Error al conectar a DB: ${y}`))

setTimeout(() => {
    app.listen(PORT,() => {
        console.debug('[WEB] Start listening on')
    })
}, 5000)

readdir(path.join(__dirname, '/temp', '/images'), (err, files1) => {
    const username = process.env.username;
    const password = process.env.password;
    if(err) throw err;

    files1.forEach(async file => {
        const authString = `${username}:${password}`;
        const authBuffer = Buffer.from(authString, 'utf-8');
        const authBase64 = authBuffer.toString('base64');

        
        try {
            // Crea un objeto de configuración con una cabecera de autenticación
            await sendImage(path.join(__dirname, '/temp/images', file), `${process.env.imageDbUrl}upload`, file, authBase64)

            fs.unlink(path.join(__dirname, '/temp/images', file), (err) => {
                if(err) throw err;
                console.warn(`[FS] Eliminado ${file}`)
            })
        } catch (err) { 
            filesTemp.push(file)
        }
        
    })
})

console.debug(`[SYSTEM] Bot start in ${Date.now() - firstTime}ms`)

let reconnectIntents = 0

setInterval(() => {
    reconnectIntents = 0 
    console.log('[INFO] Reconnecting intents reset')
}, 2 * 60 * 1000 )

const spotifyClient = new Spotify({

})

export const player = new Poru(client, [{
    name: "v1",
    host: 'pnode1.danbot.host',
    password: "pancybot91",
    port: 3625,
    secure: false
}], {
    defaultPlatform: 'ytsearch',
    send: null,
    autoResume: false,
    library: "discord.js",
})
.on('nodeConnect', async (node) => {
    console.log('[DEBUG] Conectado con lavalink server')
})
.on('socketClose', async player => {
    console.log('[WARN] Socket closed ', player.guildId)
})
.on('nodeError', async (err) => { 
    console.error(`[CRITICAL] Error al conectar con el servidor local de lavalink: ${err.name}`)
    console.warn('[CRITICAL] Intentando reconectar...')
    await crashClient.report({
        error: 'Lavalink 401',
        message: `Error al conectar con el servidor local de lavalink: ${err.name}`
    })
    console.log(process.platform)
    console.log(err.ws.readyState)
    err.reconnect()
    reconnectIntents++;
    if (reconnectIntents >= 3) {
        console.log(err)
        console.log('[CRITICAL] No se puede conectar con lavalink...')
        process.abort()
    }
})
.on('trackStart', async (player, track) => {
    const guild = client.guilds.cache.get(player.guildId)
    const button1 = new ButtonBuilder()
    .setLabel('Pause')
    .setCustomId('pause')
    .setStyle(ButtonStyle.Primary)

    const button2 = new ButtonBuilder()
    .setLabel('Resume')
    .setCustomId('resume')
    .setStyle(ButtonStyle.Success)

    const button3 = new ButtonBuilder()
    .setLabel('Skip')
    .setCustomId('skip')
    .setStyle(ButtonStyle.Success)

    const button4 = new ButtonBuilder()
    .setLabel('Pause')
    .setCustomId('dpause')
    .setDisabled(true)
    .setStyle(ButtonStyle.Secondary)

    const button5 = new ButtonBuilder()
    .setLabel('Resume')
    .setCustomId('dresume')
    .setDisabled(true)
    .setStyle(ButtonStyle.Secondary)

    const button6 = new ButtonBuilder()
        .setLabel('Skip')
        .setCustomId('dskip')
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)

    const button7 = new ButtonBuilder()
        .setLabel('Stop')
        .setCustomId('stop')
        .setStyle(ButtonStyle.Danger)

    const button8 = new ButtonBuilder()
        .setLabel('Stop')
        .setCustomId('dstop')
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)

    const row1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button4, button5, button6, button8)
    const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button1, button3, button7)
    const row3 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(button2, button3)

    const embed = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Reproduciendo')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** **Playing** \n\n *Join my VC to use buttons*`)
        .setFooter({ text: `Author: ${track.info.author}`});

    const embed3 = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('La cancion termino')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** **Finished** `)
        .setFooter({ text: `Author: ${track.info.author}`});
        
    const channelText = guild.channels.cache.get(player.textChannel) as TextChannel
    const MESSAGE = await channelText.send({ embeds: [embed], components: [row2]});

    const ttt = track.info.length

    const filter = i  => (i as ButtonInteraction).guild.members.cache.get(client.user.id).voice.channel == ((i as ButtonInteraction).member as GuildMember).voice.channel

    const collector = MESSAGE.channel.createMessageComponentCollector({ filter, time: ttt });
    collector.on('collect', async i => {
    const embed4 = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Reproduciendo')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** Resumed by <@${i.user.id}> \n\n *People in channel can use button* `)
        .setFooter({ text: `Author: ${track.info.author}`});

        const embed2 = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Pausado')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration:** ${ms(track.info.length)}   \n\n **Status:** Paused by <@${i.user.id}> \n\n *People in channel can use button* `)
        .setFooter({ text: `Author: ${track.info.author}`});

        const embed5 = new EmbedBuilder()
        .setColor('Blurple')
        .setTitle('Reproduciendo')
        .setThumbnail(track.info.image)
        .setTimestamp()
        .setDescription(`**Title:** [${track.info.title}](${track.info.uri}) \n\n **Song Duration** ${ms(track.info.length)}   \n\n **Status:** Skiped by <@${i.user.id}> `)
        .setFooter({ text: `Author: ${track.info.author}`});

                        
    if (i.customId === 'pause') {
            if (i.guild.members.cache.get('').voice.channel !== (i.member as GuildMember).voice.channel) {
            await i.reply({ content: 'Necesitas unirte a mi VC!', ephemeral: true});
            }
        
    await i.deferUpdate();
    if(player.isPaused){
        await i.reply({ content: 'La musica ya estaba pausada', ephemeral: true});
    }  
    
    if (!player.isPaused)  {
        
        player.pause(true)
        await i.editReply({ embeds: [embed2], components: [row3]});
    }
    }   if (i.customId === 'resume') {
        await i.deferUpdate();
        player.pause(false)
        await i.editReply({ embeds: [embed4], components: [row2]});
    }

            if (i.customId === 'skip') {
        await i.deferUpdate();   
            player.stop();
                await i.editReply({ embeds: [embed5], components: [row1]});
    }
            if (i.customId === 'stop') {
            await i.deferUpdate();
                player.destroy()
            await i.editReply({ embeds: [embed5], components: [row1]});
    }
    });

    collector.on('end', async (i) => {
        await MESSAGE.edit({ embeds: [embed3], components: [row1]});
    })
})
.on('trackEnd', (player, track, _lavalink) => {
    const guild = client.guilds.cache.get(player.guildId);
    (guild.channels.cache.get(player.textChannel) as TextChannel).send({content:`Cancion terminada`});
})
.on('queueEnd', (player) => {
    const guild = client.guilds.cache.get(player.guildId);
    (guild.channels.cache.get(player.textChannel) as TextChannel).send({content:`Fila de reproduccion terminada!`});
    player.destroy();
})



