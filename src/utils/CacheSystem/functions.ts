import { Guild as GuildDb, antiRF } from "../../database/BotDataBase";
import { ExtendedClient } from "../../structures/Client";
import { install_commands } from "../install";
import Discord, { Guild } from 'discord.js'
const usersWithCooldown = new Map();
const cooldown = new Map();
const responses = new Map();


async function fecthDataBase(client, guild, save = true) {
    let database = await client.database.guilds.get(guild.id) || await GuildDb.findOne({ id: guild.id });
    if(!database)return install_commands(client, guild);
    if(save) updateDataBase(client, guild, database);
    return database;
}

let used = false;
async function updateDataBase(client: ExtendedClient, guild, database, important = false) {
    if(!database) {
        database = await install_commands(client, guild);
    }else{
        if(used == false || important == true) {
            used = true;
            let db = await GuildDb.findOne({ id: guild.id });
            db = database;
            if(db) {
                await GuildDb.findOneAndUpdate({ id: guild.id }, database);
            }
            if(guild && guild.id) client.database.guilds.post(guild.id, db);

            used = false;
        }
    }
}

async function fecthUsersDataBase(client, user, save = true) {
    let database = await client.database.users.get(user.id, true) || await antiRF.findOne({ user: user.id });
    if(save) updateUsersDataBase(client, user, database);
    return database;
}

let used2 = false;
async function updateUsersDataBase(client, user, database, important = false) {
    if(database) {
        if(used2 == false || important == true) {
            used2 = true;
            let db = await antiRF.findOne({ user: user.id });
            db = database;
            if(db) {
                await GuildDb.findOneAndUpdate({ id: user.id }, database);
            }
            if(user && user.id) client.database.users.post(user.id, db);

            used2 = false;
        }
    }
}

function newResponse(response) {
    responses.set(response.authorId, response);
}

async function getResponseAndDelete(userId) {
    if(responses.has(userId)) {
        let res = await responses.get(userId);
        responses.delete(userId);
        return res;
    }
}


async function ratelimitFilter(message: Discord.Message) {
    if(usersWithCooldown.has(message.author.id)) {
		let seeCooldown = await usersWithCooldown.get(message.author.id);
		if(seeCooldown != new Date().getHours()) {
			usersWithCooldown.delete(message.author.id);
		}else return false;
	}

	if(!cooldown.has(message.author.id)) {
		cooldown.set(message.author.id, 1);
	}

	let stop = await cooldown.get(message.author.id);

	if(stop >= 3) {
		message.channel.send(`Debido a la inundación de comandos, has sido limitado (Es decir, no podrás usar comandos) durante ${60 - new Date().getMinutes()} minutos.`);
		usersWithCooldown.set(message.author.id, parseInt((new Date().getHours() as unknown as string)));
        return false;
	}else{
		
		if(stop == 2) message.channel.send('Escribe los comandos de forma más lenta o serás limitado.').then(x => {
			setTimeout(() => {
				x.delete();
			}, 1500);
		});

		cooldown.set(message.author.id, await cooldown.get(message.author.id) +1);

		setTimeout(async () => {
            cooldown.set(message.author.id, await cooldown.get(message.author.id) -1);
		}, 1000);

        return true;
	}
}


export {
    updateDataBase,
    getResponseAndDelete,
    newResponse, 
    fecthDataBase, 
    fecthUsersDataBase ,
    updateUsersDataBase
}