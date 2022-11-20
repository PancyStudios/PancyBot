import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'
import { AntiCrash } from "./utils/SystemError/CrashError";
import { PancyBotUtils } from "./utils/SystemBot/BaseUtilsBot";
import { app } from "./utils/SystemServer";
import danbot from 'danbot-hosting';
import donenv from 'dotenv';
import ubfb from 'ubfb';

donenv.config();
const firstTime = Date.now();

var PORT = process.env.PORT || 3000
export const client = new ExtendedClient()
export const crashClient = new AntiCrash()
export const utils = new PancyBotUtils()
client.start()
crashClient.inint()
export const danbotUser = new danbot.Client('danbot-U&o8QDNj6L$%QWlSuj6TE1Mr&uVmKLOfFi5meGxO', client)

console.log(process.env.botToken)

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

console.debug(`[SYSTEM] Bot start in ${Date.now() - firstTime}ms`)





