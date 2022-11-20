import { Command } from "../../../structures/CommandMsg";

export default new Command({
    name: 'test',
    description: 'Test',
    category: 'Test',
    use: '',

    async run({ message }) {
        message.reply('Tested')
    }
})