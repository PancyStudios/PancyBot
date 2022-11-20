import { Router } from "express";
import { utils } from "../../../..";

export var StatusRouter = Router()

StatusRouter.get("/bot", (req, res) => { 
    const Payload = req.body

    if(Payload.apikey === process.env.PasswordApi) {
        res.status(200).json({ 
            bot: {
                isOnline: utils.botIsOnline(),
                statsBot: { 

                }
            },
            database: { 
                isOnline: utils.getStatusDB().isOnline || false,
                modules: {
                    Prefixes: true,
                    GuildBlacklist: true,
                    UserBlacklist: true,
                    PremiumUser: true,
                    PremiumGuild: true,
                    AntiRaid: true,
                    AntiChannels: true,
                    AntiRoles: false,
                    AntiBots: false,
                    AntiJoins: false,
                }
            }
         })
    }

    return res.status(404).json({
        error: "NotFound / NotAcces",
    })
})

console.debug("[WEB] StatusRouter is loading")