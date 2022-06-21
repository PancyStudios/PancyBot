import { Webhook } from '@top-gg/sdk'
import express from 'express'
import { Event } from '../../structures/Events'
import { json, urlencoded } from 'body-parser'

export default new Event('ready', async client => {
    const app = express()
    const webhook = new Webhook(process.env.topggPassword)

    app.use(json())
    app.use(urlencoded({ extended: true }))

    app.post('/votes', webhook.listener(async votes => {
        let user = client.users.cache.get(votes.user) || await client.users.fetch(votes.user)
        if(!user) return;

        
    }))
})