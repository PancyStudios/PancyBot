import { TextChannel } from "discord.js"

export interface MusicBotInterface {
    guildId: string;
    role: string;
    language: string;
    channels: Array<TextChannel>;
}

export interface LoopInterface {
    userID: string;
    guildID: string;
    channelID: string;
    messageID: string;
}

export interface QueueInterface {
    userID: string;
    guildID: string;
    channelID: string;
    messageID: string;
}

export interface PlayerlistInterface {
    userID: string;
    playlist: Array<any>;
    musics: Array<any>;
}

export interface PlayerlistTimerInterface {
    userID: string;
    guildID: string;
    channelID: string;
    messageID: string;
}

export interface PlayerlistTimer2Interface {
    userID: string;
    guildID: string;
    channelID: string;
    messageID: string;
}