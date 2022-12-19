import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder, Colors } from "discord.js";
import nekos from "nekos.life";
const neko = new nekos();

export default new Command({
    name: "dog",
    description: "Muestra una imagen de un perro",
    use: "",
    category: "diversion",
    botPermissions: ["EmbedLinks"],
    isDev: false,

    async run({ message }) {
        let imagen = await neko.woof() 
        const randomPorcentage = Math.floor(Math.random() * 100)
        if(randomPorcentage > 90) {
            imagen.url = "https://media.discordapp.net/attachments/970050180965597234/1001279578943275080/IMG-20220618-WA0009.jpg?width=630&height=473"
        }
        let embed = new EmbedBuilder()
            .setTitle("Mira un perro")
            .setColor(Colors.Blurple)
            .setImage(imagen.url)
            .setFooter({ text: "Powered by nekos.life", iconURL: message.author.displayAvatarURL()});

        message.reply({ embeds: [embed] });
    }
})