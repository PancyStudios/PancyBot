import { writeFileSync, existsSync, mkdirSync } from 'fs';
import axios from 'axios';
import { EmbedBuilder, WebhookClient, MessageMentionOptions } from 'discord.js';
import { version } from '../../../package.json'
import { ReportErrorOptions } from '../../typings/reportError';
import { client } from '../..';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
});
const Webhook = new WebhookClient({ url: 'https://discord.com/api/webhooks/990077896498483260/tATJeJMEF03sfW0G3YwUCCrmGd7znIimQuFpwG-5tMs8DGQsMwoTFPMdL60bt8cf0_vJ'})

export class CrashError extends Error {
    constructor(message: string, location: string, type: string) {
      super(`[${type}] ${message} at ${location}`);
      logger.error(`[${type}] ${message} at ${location}`);
    }
  }
export class AntiCrash {
    constructor() {}

    inint() {
        let errors = 0
        const clearErrorMax = setInterval(() => {
            errors = 0
        }, 5000)

        const autoKill = setInterval(() => {
            if(errors > 15) {
                const time = Date.now()
                console.warn("[CRITICAL] Se detecto un numero demaciado alto de errores")
                console.warn("[CRITICAL] Apagando...")
                this.report({ error: "Critical Error", message: "Numero inusual de errores. Apagando..."})
                clearInterval(clearErrorMax)
                client.destroy()
                const finalTime = Date.now() - time
                console.warn("[CRITICAL] Finalizando proceso... Tiempo total: "+finalTime+"")
                process.abort()
            }   
        }, 1000)

        process.on('unhandledRejection', async (err, reason, p,) => {
            errors++;
            console.log(errors)
            console.log(' [antiCrash] :: Unhandled Rejection/Catch');
            console.log(reason, p);
            logger.error(`unhandled Rejection: ${err.message}`)
            const data = `${reason} ${p}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
            
            writeFileSync(""+process.cwd()+"/ErrorLogs/unhandledRejection_"+Date.now()+".log", data);

            const Embed = new EmbedBuilder()
            .setAuthor({ name: 'CrashReport'})
            .setDescription(`CrashError: ${reason} ${p}`)
            .setColor('Red')
            .setFooter({ text: `Pancybot v${version}` })

            const message = await Webhook.send({
                username: `PancyBot ${version} | CrashError`,
                avatarURL: 'https://califerbot.tk/assets/img/LaTurbis.jpg',
                embeds: [
                    Embed
                ],
            })

            console.warn(`[AntiCrash] :: Sent CrashError to Webhook, Type: ${message.type}`);
            
        });
        process.on("uncaughtException", (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch');
            console.log(err, origin);
            logger.error(`uncaught Exception: ${err.message}`)
            const data = `${err + origin}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
            writeFileSync(""+process.cwd()+"/ErrorLogs/uncaughtException_"+Date.now()+".log", data);
            errors++;
            console.log(errors)
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
            console.log(err, origin);
            const data = `${err + origin}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
    
            writeFileSync(""+process.cwd()+"/ErrorLogs/uncaughtExceptionMonitor_"+Date.now()+".log", data);
            errors++;
        });
        process.on('multipleResolves', (type, promise, reason, origin) => {
            console.log(' [antiCrash] :: Multiple Resolves');
            console.log(type, reason, promise, origin);
        });
    }

    /**
     * @interface ReportErrorOptions
     */
    async report(data: ReportErrorOptions) {
        const Embed = new EmbedBuilder()
        .setAuthor({ name: 'CrashReport'})
        .setDescription(`CrashError: ${data.error} ${data.message ?? "unknown"}`)
        .setColor('Red')
        .setFooter({ text: `Pancybot v${version}` })


        const message = await Webhook.send({
            username: `PancyBot ${version} | CrashError`,
            avatarURL: 'https://califerbot.tk/assets/img/LaTurbis.jpg',
            embeds: [
                Embed
            ],
        })

        console.warn(`[AntiCrash] :: Sent CrashError to Webhook, Type: ${message.type}`);
    }
}