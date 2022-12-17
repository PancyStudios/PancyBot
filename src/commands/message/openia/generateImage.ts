import { craiyon, crashClient, utils } from "../../..";
import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed, MessageAttachment } from "discord.js";
import path from "path"

export default new Command({
    name: "createimage",
    description: "Genera una imagen",
    isDev: false,
    category: "IA",
    botPermissions: ["EMBED_LINKS"],
    use: "<Descripcion de la imagen>",

    async run({ message, args, _guild }) {
        const text = args[0]
        if(!text) return utils.dataRequired("Necesitas dar una descripcion sobre la imagen que quieres generar "+_guild.configuration.prefix+"createImage <Depcription>")
        try {
            console.log(1)
            message.reply("Generando...").then(async msg => {
                const firstTime = Date.now()
                await craiyon.generate({
                    prompt: `${text}`,
                }).then(async x => {
                    const name = `craiyon${Date.now().toString()}.png`
                    const stream = x.images[0].asBuffer();
                    x.images[0].saveToFileSync(path.join(__dirname, '../../../', '/temp', '/images', name));

                    const image = new MessageAttachment(stream, "craiyon.png")

                    const finalTime = Date.now() - firstTime;
                    msg.edit({ content: `Generado en: ${finalTime / 1000}s`, files: [image] })
                }).catch(err => console.log(err))
                .finally(() => console.log("done"))
            })
        } catch (error) {
                const ErrorMessage = new MessageEmbed()
                .setTitle("Craiyon Error")
                .setDescription(`Error: ${error}`)
                .setColor("RED")
                .setTimestamp()

                message.reply({ embeds: [ErrorMessage]})

                crashClient.report({ error: "Craiyon", message: error })
                console.log(error)
        }
    }
})

