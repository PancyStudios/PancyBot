import { 
    QueueInterface, 
    MusicBotInterface, 
    PlayerlistInterface, 
    PlayerlistTimer2Interface, 
    PlayerlistTimerInterface, 
    LoopInterface 
} from "./typings/Music";
import { model, Schema, SchemaTypes } from "mongoose";

const QueueSechema = new Schema<QueueInterface>({
    userID: { type: SchemaTypes.String , required: true },
    guildID: { type: SchemaTypes.String, required: true},
    channelID: { type: SchemaTypes.String, required: true},
    messageID: { type: SchemaTypes.String, required: true}
})

const MusicBotSchema = new Schema<MusicBotInterface>({
    guildId: { type: SchemaTypes.String, required: true},
    role: { type: SchemaTypes.String, required: true},
    language: { type: SchemaTypes.String, required: true},
    channels: Array<any>
})

const PlayerlistSchema = new Schema<PlayerlistInterface>({
    userID: { type: SchemaTypes.String, required: true},
    playlist: Array<any>,
    musics: Array<any>,
})

const LoopSchema = new Schema<LoopInterface>({
    userID: { type: SchemaTypes.String, required: true},
    guildID: { type: SchemaTypes.String, required: true},
    channelID: { type: SchemaTypes.String, required: true},
    messageID: { type: SchemaTypes.String, required: true},
})

const PlayerlistTimerSchema = new Schema<PlayerlistTimerInterface>({
    userID: { type: SchemaTypes.String, required: true},
    guildID: { type: SchemaTypes.String, required: true},
    channelID: { type: SchemaTypes.String, required: true},
    messageID: { type: SchemaTypes.String, required: true}
})

const PlayerlistTimer2Schema = new Schema<PlayerlistTimer2Interface>({
    userID: { type: SchemaTypes.String, required: true},
    guildID: { type: SchemaTypes.String, required: true},
    channelID: { type: SchemaTypes.String, required: true},
    messageID: { type: SchemaTypes.String, required: true}
})


const MusicBot = model<MusicBotInterface>('musicbot', MusicBotSchema)
const Queue = model<QueueInterface>('queue', QueueSechema)
const Loop = model<LoopInterface>('loop', LoopSchema)
const Playlist = model<PlayerlistInterface>('playlist', PlayerlistSchema)
const PlaylistTimer = model<PlayerlistTimerInterface>('playlistTimer', PlayerlistTimerSchema)
const PlaylistTimer2 = model<PlayerlistTimer2Interface>('playerlistTimer2', PlayerlistTimer2Schema)

export { 
    MusicBot, 
    Queue, 
    Loop, 
    Playlist, 
    PlaylistTimer, 
    PlaylistTimer2 
}