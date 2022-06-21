import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'
import { AntiCrash } from "./utils/SystemError/CrashError";
import danbot from 'danbot-hosting'
import donenv from 'dotenv'
import ubfb from 'ubfb'
donenv.config()
export const client = new ExtendedClient()
export const crashClient = new AntiCrash()
client.start()
crashClient.inint()
export const ubfbClient = new ubfb(client, {
    token: 'NzExMzI5MzQyMTkzNjY0MDEyLjM3MzA2NzYuMTY1NTY4MDk5NDI2NQ==',
    password: '#?'
});

export const danbotUser = new danbot.Client('danbot-U&o8QDNj6L$%QWlSuj6TE1Mr&uVmKLOfFi5meGxO', client)





console.log(process.env.botToken)

const database = connect(process.env.mongodbUrl, {
    keepAlive: true
})

database.then(x => console.log('DatabaseOn '))
.catch(y => console.log(`Error al conectar a DB: ${y}`))

