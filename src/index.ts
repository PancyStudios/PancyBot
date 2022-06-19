import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'
import donenv from 'dotenv'
donenv.config()


export const client = new ExtendedClient()
client.start()


console.log(process.env.botToken)

const database = connect(process.env.mongodbUrl, {
    keepAlive: true
})

database.then(x => console.log('DatabaseOn '))
.catch(y => console.log(`Error al conectar a DB: ${y}`))

