import {
    ApplicationCommandDataResolvable,
    Client,
    ClientEvents,
    Collection
} from "discord.js";
import { CommandType } from "../typings/command";
import { CommandTypeMsg } from "../typings/commandMsg";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Events"; 
import { cacheManager, cacheManagerDatabase } from "../utils/CacheSystem/cacheManager";
const globPromise = promisify(glob);



export class ExtendedClient extends Client {
    commands: Collection<string, CommandType> = new Collection();
    commandsMsg: Collection<string, CommandTypeMsg> = new Collection();
    database: {
        guild: cacheManagerDatabase 
        users: cacheManagerDatabase
    }
    super: {
        cache: cacheManager
    }

    constructor() {
        super({ 
            intents: 32767,
            shards: "auto"
        });
    }
    

    start() {
        this.registerModules();
        this.login(process.env.botToken);
        
        this.database = {
            guild: new cacheManagerDatabase(this, 'g'),
            users: new cacheManagerDatabase(this, 'u')
        }

        this.super = {
            cache: new cacheManager()
        }
    }
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands");
        }
    }

    async registerModules() {
        // Commands
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/interaction/*/*{.ts,.js}`
        );
       
        commandFiles.forEach(async (filePath) => {
            const command: CommandType = await this.importFile(filePath);
            if (!command.name) return;
            console.log(command);

            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

        this.on("ready", () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: null
            });
        });
        //Message Commands

        const commandFilesMsg = await globPromise(
            `${__dirname}/../commands/message/*/*{.js,.ts}`
        )
        commandFilesMsg.forEach(async (filePath) => {
            const command: CommandTypeMsg = await this.importFile(filePath)
            if(!command.name) return;
            console.log(command)
            this.commandsMsg.set(command.name, command)
        })

        // Event
        const eventFiles = await globPromise(
            `${__dirname}/../events/*/*{.ts,.js}`
        );
        eventFiles.forEach(async (filePath) => {
            
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            console.log(event.event)
            this.on(event.event, event.run);
        });
    }
}