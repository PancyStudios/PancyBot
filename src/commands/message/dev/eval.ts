import { Command } from '../../../structures/CommandMsg';
import { transpile } from 'typescript';
import is from '../../../utils/SystemBot/inspect';
import { minify } from 'uglify-js'; 
import { inspect } from 'util';
import { MessageEmbed } from 'discord.js';

export default new Command({
    name: 'eval',
    description: 'Evaluates code',
    use: '<code>',
    category: 'dev',
    isDev: true,
    botPermissions: ['EMBED_LINKS'],
    async run({ message, args, client }) {
        const start = Date.now();
        let code = (args as string[]).join(' ');
        if(code === '') return message.reply('Porfavor, inserte un código a evaluar.');
        if(code.includes(client.token)) return message.reply('No puedes evaluar el token del bot.');

        const FirstEmbed = new MessageEmbed()
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

                const SecondEmbed = new MessageEmbed()
                .setDescription(`:stopwatch: Evaluado en ${time}ms`)
                .setColor("#7289DA")
                .addField("Code", `\`\`\`js\n${code}\n\`\`\``)
                .addField('Resultado', `\`\`\`js\n${evaluated}\`\`\``)
                .setFooter({ text: `Evaluado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                msg.edit({ embeds: [SecondEmbed] });

            } catch (err) {
                
                console.error('[ERROR] Evaluated code:', err);
                const end = Date.now();
                const time = end - start;
                const SecondEmbed = new MessageEmbed()
                .setDescription(`:stopwatch: Evaluado en ${time}ms`)
                .setColor("#7289DA")
                .addField("Code", `\`\`\`js\n${code}\n\`\`\``)
                .addField('Error', `\`\`\`js\n${err}\n\`\`\``)
                .setFooter({ text: `Evaluado por ${message.author.tag}`, iconURL: message.author.displayAvatarURL()})
                msg.edit({ embeds: [SecondEmbed] });
            }
        })
    }
})