import {
  Client,
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} from "discord.js";
import { Command } from "../../../structures/CommandMsg";

export default new Command({
    name: "commands",
    aliases: ["cmds", "cmd"],
    use: "<Command>",
    description: "Muestra la lista de comandos",
    category: "util",
    isDev: false,
    botPermissions: ["EMBED_LINKS"],

    async run({ message, client }) {
        const directories = [
            ...new Set(client.commandsMsg.map((cmd) => cmd.category)),
        ]

        const formatString = (str: string) =>  `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`

        const categories = directories.map((dir) => {
            const getCommands = client.commandsMsg
              .filter((cmd) => cmd.category === dir)
              .map((cmd) => {
                return {
                  name: cmd.name || "Comando no cargado",
                  description: cmd.description || "El comando no tiene descripcion",
                };
              });
            return {
              directory: formatString(dir),
              commands: getCommands,
            };
          });


    const embed = new MessageEmbed().setDescription(
        "Seleciona una categoria"
      ).setColor('YELLOW').setFooter(message.author.tag, message.author.avatarURL({ dynamic: true })).setTimestamp();
  
      const components = (state) => [
        new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId("help-menu")
            .setPlaceholder("Porfavor selecciona una categoria")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Comandos de ${cmd.directory}`,
                };
              })
            )
        ),
      ];
      const initalMessage = await message.reply({
        embeds: [embed],
        components: components(false),
      });
  
      const filter = (interaction) => interaction.user.id === message.author.id;
  
      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: "SELECT_MENU",
      });
  
      collector.on("collect", (interaction) => {
        const [directory] = interaction.values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );
  
        const categoryEmbed = new MessageEmbed()
          .setTitle(`comandos de ${directory}`)
          .setDescription("Lista de comandos")
          .addFields(
            category.commands.map((cmd) => {
              return {
                name: `\`${cmd.name}\``,
                value: cmd.description,
                inline: true,
              };
            })
          )
          .setColor("RANDOM")
          .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
          .setFooter(
            interaction.user.username,
            interaction.user.avatarURL({ dynamic: true })
          )
          .setTimestamp();
  
        interaction.update({ embeds: [categoryEmbed] });
      });
  
      collector.on("end", () => {
        initalMessage.edit({ components: components(true) });
      });
    }
})