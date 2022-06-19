import { Event } from "../../structures/Events";

export default new Event('debug', message => {
    console.debug('[DEBUG]: ' + message)
})