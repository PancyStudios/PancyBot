import { Guild, antiRF } from "../../database/BotDataBase";
import { ExtendedClient } from "../../structures/Client";
import { install_commands } from "../install";
import Discord from 'discord.js'


export async function fecthDataBase(client: ExtendedClient, guild: Discord.Guild, save = true) {
    let database = await client.database.guild.get(guild.id, true) || await Guild.findOne({ id: guild.id });
    if(!database)return install_commands(client, guild);
    if(save) updateDataBase(client, guild, database);
    return database;
}

let used = false;
export async function updateDataBase(client: ExtendedClient, guild: Discord.Guild, database, important = false) {
    if(!database) {
        database = await install_commands(client, guild);
    }else{
        if(used == false || important == true) {
            used = true;
            let db = await Guild.findOne({ id: guild.id });
            db = database;
            if(db) {
                await Guild.findOneAndUpdate({ id: guild.id }, database);
            }
            if(guild && guild.id) client.database.guild.post(guild.id, db);

            used = false;
        }
    }
}

export async function fecthUsersDataBase(client, user, save = true) {
    let database = await client.database.users.get(user.id, true) || await antiRF.findOne({ user: user.id });
    if(save) updateUsersDataBase(client, user, database);
    return database;
}

let used2 = false;
export async function updateUsersDataBase(client, user, database, important = false) {
    if(database) {
        if(used2 == false || important == true) {
            used2 = true;
            let db = await antiRF.findOne({ user: user.id });
            db = database;
            if(db) {
                await Guild.findOneAndUpdate({ id: user.id }, database);
            }
            if(user && user.id) client.database.users.post(user.id, db);

            used2 = false;
        }
    }
}