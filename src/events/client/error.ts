import { Event } from "../../structures/Events";

export default new Event('error', error => {
    console.log('[ERROR]:')
    console.error(error)
})