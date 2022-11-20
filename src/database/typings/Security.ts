export interface GuildDataFirst {
    // SERVER ID
    id: string
    ownerId: string

    // PROTECCIÓN
    protection: {
        antiraid: {
            enable: boolean
            amount: number
            saveBotsEntrities: {
                authorOfEntry: string
                _bot: string
            }
        }
        antibots: {
            enable: boolean
            _type: string
        }
        antitokens: {
            enable: boolean
            usersEntrities: Array<any>
            entritiesCount: number
        }
        antijoins: {
            enable: boolean
            rememberEntrities: Array<any>
        }
        markMalicious: {
            enable: boolean
            _type: string
            rememberEntrities: Array<any>
        }
        warnEntry: boolean
        kickMalicious: {
            enable: boolean
            rememberEntrities: Array<any>
        }
        ownSystem: {
            enable: boolean
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
            enable: boolean
            _type: string
            channel: string
            role: string
        }
        cannotEnterTwice: {
            enable: boolean
            users: Array<any>
        }
        purgeWebhooksAttacks: {
            enable: boolean
            amount: number
            rememberOwners: string
        }
        intelligentSOS: {
            enable: boolean
            cooldown: boolean
        }
        intelligentAntiflood: boolean
        antiflood: boolean
        bloqEntritiesByName: {
            enable: boolean
            names: Array<any>
        }
        bloqNewCreatedUsers: {
            time: string
        }
        raidmode: {
            enable: boolean
            timeToDisable: string
            password: string
            activedDate: number
        }
    }

    // MODERACIÓN
    moderation: {
        dataModeration: {
            muterole: string
            forceReasons: Array<any>
            timers: Array<any>
            badwords: Array<any>
            events: {
                manyPings: boolean
                capitalLetters: boolean
                manyEmojis: boolean
                manyWords: boolean
                linkDetect: boolean
                ghostping: boolean
                nsfwFilter: boolean
                iploggerFilter: boolean
            }
            snipes: {
                editeds: Array<any>
                deleteds: Array<any>
            }
        }
        automoderator: {
            enable: boolean
            actions: {
                warns: Array<any>
                muteTime: Array<any>
                action: string
                linksToIgnore: Array<any>
                floodDetect: number
                manyEmojis: number
                manyPings: number
                manyWords: number
            }
            events: {
                badwordDetect: boolean
                floodDetect: boolean
                manyPings: boolean
                capitalLetters: boolean
                manyEmojis: boolean
                manyWords: boolean
                linkDetect: boolean
                ghostping: boolean
                nsfwFilter: boolean
                iploggerFilter: boolean
            }
        }
    }

    // CONFIGURACIÓN
    configuration: {
        _version: string
        prefix: string
        whitelist: Array<any>
        logs: Array<any>
        language: string
        ignoreChannels: Array<any>
        password: {
            enable: boolean
            _password: string
            usersWithAcces: Array<any>
        }
        subData: {
            showDetailsInCmdsCommand: string
            pingMessage: string
            dontRepeatTheAutomoderatorAction: boolean
        }
    }
}