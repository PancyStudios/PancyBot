import { Event } from "../../structures/Events";

export default new Event('warn', message => {
    console.warn(`[WARN]: ${message}`)
})