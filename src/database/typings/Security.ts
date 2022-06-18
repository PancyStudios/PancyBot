export interface GuildDataFirst {
    // SERVER ID
    id: String
    ownerId: String

    // PROTECCIÓN
    protection: {
        antiraid: {
            enable: Boolean
            amount: Number
            saveBotsEntrities: {
                authorOfEntry: String
                _bot: String
            }
        }
        antibots: {
            enable: Boolean
            _type: String
        }
        antitokens: {
            enable: Boolean
            usersEntrities: Array<any>
            entritiesCount: Number
        }
        antijoins: {
            enable: Boolean
            rememberEntrities: Array<any>
        }
        markMalicious: {
            enable: Boolean
            _type: String
            rememberEntrities: Array<any>
        }
        warnEntry: Boolean
        kickMalicious: {
            enable: Boolean
            rememberEntrities: Array<any>
        }
        ownSystem: {
            enable: Boolean
            events: {
                messageCreate: Array<any>
                messageDelete: Array<any>
                messageUpdate: Array<any>
                channelCreate: Array<any>
                channelDelete: Array<any>
                channelUpdate: Array<any>
                roleCreate: Array<any>
                roleDelete: Array<any>
                roleUpdate: Array<any>
                emojiCreate: Array<any>
                emojiDelete: Array<any>
                emojiUpdate: Array<any>
                stickerCreate: Array<any>
                stickerDelete: Array<any>
                stickerUpdate: Array<any>
                guildMemberAdd: Array<any>
                guildMemberRemove: Array<any>
                guildMemberUpdate: Array<any>
                guildBanAdd: Array<any>
                guildBanRemove: Array<any>
                inviteCreate: Array<any>
                inviteDelete: Array<any>
                threadCreate: Array<any>
                threadDelete: Array<any>
            }
        }
        verification: {
            enable: Boolean
            _type: String
            channel: String
            role: String
        }
        cannotEnterTwice: {
            enable: Boolean
            users: Array<any>
        }
        purgeWebhooksAttacks: {
            enable: Boolean
            amount: Number
            rememberOwners: String
        }
        intelligentSOS: {
            enable: Boolean
            cooldown: Boolean
        }
        intelligentAntiflood: Boolean
        antiflood: Boolean
        bloqEntritiesByName: {
            enable: Boolean
            names: Array<any>
        }
        bloqNewCreatedUsers: {
            time: String
        }
        raidmode: {
            enable: Boolean
            timeToDisable: String
            password: String
            activedDate: Number
        }
    }

    // MODERACIÓN
    moderation: {
        dataModeration: {
            muterole: String
            forceReasons: Array<any>
            timers: Array<any>
            badwords: Array<any>
            events: {
                manyPings: Boolean
                capitalLetters: Boolean
                manyEmojis: Boolean
                manyWords: Boolean
                linkDetect: Boolean
                ghostping: Boolean
                nsfwFilter: Boolean
                iploggerFilter: Boolean
            }
            snipes: {
                editeds: Array<any>
                deleteds: Array<any>
            }
        }
        automoderator: {
            enable: Boolean
            actions: {
                warns: Array<any>
                muteTime: Array<any>
                action: String
                linksToIgnore: Array<any>
                floodDetect: Number
                manyEmojis: Number
                manyPings: Number
                manyWords: Number
            }
            events: {
                badwordDetect: Boolean
                floodDetect: Boolean
                manyPings: Boolean
                capitalLetters: Boolean
                manyEmojis: Boolean
                manyWords: Boolean
                linkDetect: Boolean
                ghostping: Boolean
                nsfwFilter: Boolean
                iploggerFilter: Boolean
            }
        }
    }

    // CONFIGURACIÓN
    configuration: {
        _version: String
        prefix: String
        whitelist: Array<any>
        logs: Array<any>
        language: String
        ignoreChannels: Array<any>
        password: {
            enable: Boolean
            _password: String
            usersWithAcces: Array<any>
        }
        subData: {
            showDetailsInCmdsCommand: String
            pingMessage: String
            dontRepeatTheAutomoderatorAction: Boolean
        }
    }
}