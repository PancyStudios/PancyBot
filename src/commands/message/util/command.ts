import {
  Client,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  APISelectMenuComponent,
  SelectMenuBuilder,
  Colors,
  ComponentType
} from "discord.js";
import { Command } from "../../../structures/CommandMsg";

export default new Command({
    name: "commands",
    aliases: ["cmds", "cmd"],
    use: "<Command>",
    description: "Muestra la lista de comandos",
    category: "util",
    isDev: false,
    botPermissions: ["EmbedLinks"],

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


    const embed = new EmbedBuilder().setDescription(
        "Seleciona una categoria"
      ).setColor("Yellow").setFooter({ text: message.author.tag, iconURL: message.author.avatarURL()}).setTimestamp();
      
      const adw = new ActionRowBuilder<StringSelectMenuBuilder>()

      const components = (state: boolean) => [
        adw.addComponents([
          new StringSelectMenuBuilder()
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

        ])
      ];
      const initalMessage = await message.reply({
        embeds: [embed],
        components: components(false),
      });
  
      const filter = (interaction) => interaction.user.id === message.author.id;
  
      const collector = message.channel.createMessageComponentCollector({
        filter,
        componentType: ComponentType.StringSelect,
      });
  
      collector.on("collect", (interaction) => {
        const [directory] = (interaction as any).values;
        const category = categories.find(
          (x) => x.directory.toLowerCase() === directory
        );
  
        const categoryEmbed = new EmbedBuilder()
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
          .setColor(Colors.Blurple)
          .setThumbnail((interaction as any).user.avatarURL())
          .setFooter({
            text: (interaction as any).user.username,
            iconURL: (interaction as any).user.avatarURL()
          })
          .setTimestamp();
  
        (interaction as any).update({ embeds: [categoryEmbed] });
      });
  
      collector.on("end", () => {
        initalMessage.edit({ components: components(true) });
      });
    }
})