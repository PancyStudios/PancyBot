import { Command } from '../../../structures/CommandMsg'

export default new Command({
    name: '8ball',
    description: "Preguntale algo al bot",
    use: '[Pregunta]',
    category: __dirname,

    async run ({ message, args }) {
        const responses = ['']
    }
})