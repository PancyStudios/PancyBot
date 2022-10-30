import { Webhook } from '@top-gg/sdk'
import { Router} from 'express'
import { Event } from '../../structures/Events'
const RouterVotos = Router()

export default new Event('ready', async client => {
    const webhook = new Webhook(process.env.topggPassword)

    RouterVotos.post('/votes', webhook.listener(async votes => {
        let user = client.users.cache.get(votes.user) || await client.users.fetch(votes.user)
        if(!user) return;

        
    }))
})