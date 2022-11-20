import { GuildDataFirst } from "./typings/Security";
import { Schema, model, SchemaTypes } from 'mongoose'
import { UserData } from "./typings/User";


const guildsSchema = new Schema({
    // SERVER ID
    id: SchemaTypes.String,
    ownerId: SchemaTypes.String,

    // PROTECCIÓN
    protection: {
        antiraid: {
            enable: SchemaTypes.Boolean,
            amount: SchemaTypes.Number,
            saveBotsEntrities: {
                authorOfEntry: SchemaTypes.String,
                _bot: SchemaTypes.String
            }
        },
        antibots: {
            enable: SchemaTypes.Boolean,
            _type: SchemaTypes.String
        },
        antitokens: {
            enable: SchemaTypes.Boolean,
            usersEntrities: SchemaTypes.Array,
            entritiesCount: SchemaTypes.Number
        },
        antijoins: {
            enable: SchemaTypes.Boolean,
            rememberEntrities: SchemaTypes.Array
        },
        markMalicious: {
            enable: SchemaTypes.Boolean,
            _type: SchemaTypes.String,
            rememberEntrities: SchemaTypes.Array
        },
        warnEntry: SchemaTypes.Boolean,
        kickMalicious: {
            enable: SchemaTypes.Boolean,
            rememberEntrities: SchemaTypes.Array
        },
        ownSystem: {
            enable: SchemaTypes.Boolean,
            events: {
                messageCreate: SchemaTypes.Array,
                messageDelete: SchemaTypes.Array,
                messageUpdate: SchemaTypes.Array,
                channelCreate: SchemaTypes.Array,
                channelDelete: SchemaTypes.Array,
                channelUpdate: SchemaTypes.Array,
                roleCreate: SchemaTypes.Array,
                roleDelete: SchemaTypes.Array,
                roleUpdate: SchemaTypes.Array,
                emojiCreate: SchemaTypes.Array,
                emojiDelete: SchemaTypes.Array,
                emojiUpdate: SchemaTypes.Array,
                stickerCreate: SchemaTypes.Array,
                stickerDelete: SchemaTypes.Array,
                stickerUpdate: SchemaTypes.Array,
                guildMemberAdd: SchemaTypes.Array,
                guildMemberRemove: SchemaTypes.Array,
                guildMemberUpdate: SchemaTypes.Array,
                guildBanAdd: SchemaTypes.Array,
                guildBanRemove: SchemaTypes.Array,
                inviteCreate: SchemaTypes.Array,
                inviteDelete: SchemaTypes.Array,
                threadCreate: SchemaTypes.Array,
                threadDelete: SchemaTypes.Array
            }
        },
        verification: {
            enable: SchemaTypes.Boolean,
            _type: SchemaTypes.String,
            channel: SchemaTypes.String,
            role: SchemaTypes.String
        },
        cannotEnterTwice: {
            enable: SchemaTypes.Boolean,
            users: SchemaTypes.Array
        },
        purgeWebhooksAttacks: {
            enable: SchemaTypes.Boolean,
            amount: SchemaTypes.Number,
            rememberOwners: SchemaTypes.String
        },
        intelligentSOS: {
            enable: SchemaTypes.Boolean,
            cooldown: SchemaTypes.Boolean
        },
        intelligentAntiflood: SchemaTypes.Boolean,
        antiflood: SchemaTypes.Boolean,
        bloqEntritiesByName: {
            enable: SchemaTypes.Boolean,
            names: SchemaTypes.Array
        },
        bloqNewCreatedUsers: {
            time: SchemaTypes.String
        },
        raidmode: {
            enable: SchemaTypes.Boolean,
            timeToDisable: SchemaTypes.String,
            password: SchemaTypes.String,
            activedDate: SchemaTypes.Number
        }
    },

    // MODERACIÓN
    moderation: {
        dataModeration: {
            muterole: SchemaTypes.String,
            forceReasons: SchemaTypes.Array,
            timers: SchemaTypes.Array,
            badwords: SchemaTypes.Array,
            events: {
                manyPings: SchemaTypes.Boolean,
                capitalLetters: SchemaTypes.Boolean,
                manyEmojis: SchemaTypes.Boolean,
                manyWords: SchemaTypes.Boolean,
                linkDetect: SchemaTypes.Boolean,
                ghostping: SchemaTypes.Boolean,
                nsfwFilter: SchemaTypes.Boolean,
                iploggerFilter: SchemaTypes.Boolean
            },
            snipes: {
                editeds: SchemaTypes.Array,
                deleteds: SchemaTypes.Array
            }
        },
        automoderator: {
            enable: SchemaTypes.Boolean,
            actions: {
                warns: SchemaTypes.Array,
                muteTime: SchemaTypes.Array,
                action: SchemaTypes.String,
                linksToIgnore: SchemaTypes.Array,
                floodDetect: SchemaTypes.Number,
                manyEmojis: SchemaTypes.Number,
                manyPings: SchemaTypes.Number,
                manyWords: SchemaTypes.Number,
            },
            events: {
                badwordDetect: SchemaTypes.Boolean,
                floodDetect: SchemaTypes.Boolean,
                manyPings: SchemaTypes.Boolean,
                capitalLetters: SchemaTypes.Boolean,
                manyEmojis: SchemaTypes.Boolean,
                manyWords: SchemaTypes.Boolean,
                linkDetect: SchemaTypes.Boolean,
                ghostping: SchemaTypes.Boolean,
                nsfwFilter: SchemaTypes.Boolean,
                iploggerFilter: SchemaTypes.Boolean
            }
        }
    },

    // CONFIGURACIÓN
    configuration: {
        _version: SchemaTypes.String,
        prefix: SchemaTypes.String,
        whitelist: SchemaTypes.Array,
        logs: SchemaTypes.Array,
        language: SchemaTypes.String,
        ignoreChannels: SchemaTypes.Array,
        password: {
            enable: SchemaTypes.Boolean,
            _password: SchemaTypes.String,
            usersWithAcces: SchemaTypes.Array,
        },
        subData: {
            showDetailsInCmdsCommand: SchemaTypes.String,
            pingMessage: SchemaTypes.String,
            dontRepeatTheAutomoderatorAction: SchemaTypes.Boolean
        }
    },
});


const AntiRFSchema = new Schema({
    user: SchemaTypes.String,
    content: SchemaTypes.String,
    amount: SchemaTypes.Number,
    isBloqued: SchemaTypes.Boolean,
    isToken: SchemaTypes.Boolean,
    achievements: {
        array: SchemaTypes.Array,
        data: {
            bugs: SchemaTypes.Number,
            serversCreatedTotally: SchemaTypes.Number,
            serversPartner: SchemaTypes.Array,
            reports: SchemaTypes.Number,
            totalVotes: SchemaTypes.Number,
            initialMember: SchemaTypes.Boolean
        }
    },
    serversCreated: {
        servers: SchemaTypes.Number,
        date: SchemaTypes.String,
    },
    premium: {
        isActive: SchemaTypes.Boolean,
        endAt: SchemaTypes.Number
    },
    servers: SchemaTypes.Array
})
export const antiRF = model<UserData>('AntiRF', AntiRFSchema)
export const Guild = model<GuildDataFirst>('Guild', guildsSchema);
