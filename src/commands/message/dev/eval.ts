import { Command } from '../../../structures/CommandMsg';
import { transpile } from 'typescript';
import is from '../../../utils/SystemBot/inspect';
import { minify } from 'uglify-js'; 
import { inspect } from 'util';
import { EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'eval',
    description: 'Evaluates code',
    use: '<code>',
    category: 'dev',
    isDev: true,
    botPermissions: ['EmbedLinks'],
    async run({ message, args, client }) {
        const start = Date.now();
        let code = (args as string[]).join(' ');
        if(code === '') return message.reply('Porfavor, inserte un código a evaluar.');
        if(code.includes(client.token)) return message.reply('No puedes evaluar el token del bot.');

        const FirstEmbed = new EmbedBuilder()
        .setDescription(":stopwatch: Evaluando...")
        .setColor("#7289DA")

        message.reply({ embeds: [FirstEmbed] }).then(async msg => {
            code = transpile(code);
            console.debug('[DEBUG] Transpiled code to JS:', code);
            try {
                const result = await eval(code);
                console.debug('[DEBUG] Evaluated code:', result);
                const end = Date.now();
                const time = end - start;
                const evaluated = inspect(result, { depth: 0 });

                const SecondEmbed = new EmbedBuilder()
                .setDescription(`:stopwatch: Evaluado en ${time}ms`)
                .setColor("#7289DA")
                .addFields([
                    {
                        name: "Code",
                        value: `\`\`\`js\n${code}\n\`\`\``
                    },
                    {
                        name: "Resultado",
                        value: `\`\`\`js\n${evaluated}\`\`\``
                    }
                ])
                .setFooter({ text: `Evaluado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                msg.edit({ embeds: [SecondEmbed] });

            } catch (err) {
                
                console.error('[ERROR] Evaluated code:', err);
                const end = Date.now();
                const time = end - start;
                const SecondEmbed = new EmbedBuilder()
                .setDescription(`:stopwatch: Evaluado en ${time}ms`)
                .setColor("#7289DA")
                .addFields([
                    {
                        name: "Code",
                        value: `\`\`\`js\n${code}\n\`\`\``
                    },
                    {
                        name: "Error",
                        value: `\`\`\`js\n${err}\n\`\`\``
                    }
                ])
                .setFooter({ text: `Evaluado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                msg.edit({ embeds: [SecondEmbed] });
            }
        })
    }
})