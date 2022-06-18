import { User } from "discord.js"



export interface EconomyGlobal {
    user: User, 
    GameData: {
        xp: number,
        level: number,
        intentory: {
            water: {
                cantidad: number,
                isEquipable: false
            },
            pico: {
                cantidad: number,
                isEquipable: true
            },
            hacha: {
                cantidad: number,
                isEquipable: true
            },
            caña: {
                cantidad: number,
                isEquipable: true
            },
        }
        equipo: {
            pico: boolean,
            hacha: boolean,
            caña: boolean,
        }
    },
    EconomyData: {
        bank: number,
        money: number
    }
}