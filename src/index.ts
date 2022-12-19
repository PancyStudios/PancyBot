import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'
import { AntiCrash } from "./utils/SystemError/CrashError";
import { PancyBotUtils } from "./utils/SystemBot/BaseUtilsBot";
import { app } from "./utils/SystemServer";
import { sendImage } from "./utils/SystemBot/sendImage";
import danbot from 'danbot-hosting';
import donenv from 'dotenv';
import { Client } from 'craiyon';
import fs, { readdir } from "fs";
import path from "path";



donenv.config();
const firstTime = Date.now();

var PORT = process.env.PORT || 3000
export const client = new ExtendedClient()
export const crashClient = new AntiCrash()
export const utils = new PancyBotUtils()
export const craiyon = new Client()
export let filesTemp = []
client.start()
crashClient.inint()
export const danbotUser = new danbot.Client('danbot-U&o8QDNj6L$%QWlSuj6TE1Mr&uVmKLOfFi5meGxO', client)

const database = connect(process.env.mongodbUrl, {
    keepAlive: true
})

database.then(x => console.log('DatabaseOn '))
.catch(y => console.log(`Error al conectar a DB: ${y}`))

setTimeout(() => {
    app.listen(PORT,() => {
        console.debug('[WEB] Start listening on')
    })
}, 5000)

readdir(path.join(__dirname, '/temp', '/images'), (err, files1) => {
    const username = process.env.username;
    const password = process.env.password;
    if(err) throw err;

    files1.forEach(async file => {
        const authString = `${username}:${password}`;
        const authBuffer = Buffer.from(authString, 'utf-8');
        const authBase64 = authBuffer.toString('base64');

        
        try {
            // Crea un objeto de configuración con una cabecera de autenticación
            await sendImage(path.join(__dirname, '/temp/images', file), `${process.env.imageDbUrl}upload`, file, authBase64)

            fs.unlink(path.join(__dirname, '/temp/images', file), (err) => {
                if(err) throw err;
                console.warn(`[FS] Eliminado ${file}`)
            })
        } catch (err) { 
            filesTemp.push(file)
        }
        
    })
})

console.debug(`[SYSTEM] Bot start in ${Date.now() - firstTime}ms`)





