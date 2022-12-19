import { Command } from "../../../structures/CommandMsg";
import { EmbedBuilder } from "discord.js";

export default new Command({
    name: "modules",
    description: "Estado de los modulos de proteccion",
    category: "security",
    isDev: false,
    userPermissions: ["ManageGuild"],
    use: "",

    async run ({ message, _guild }){

        let p;
        if(_guild.moderation.automoderator.enable == true) {
            p = 'Automoderador: Activo.';
        }else{
            p = 'Automoderador: Desactivado.'
        }

        const Embed = new EmbedBuilder().setColor(0x0056ff).setFooter({ text: `${message.guild.name}, ${message.guild.id}`, iconURL: message.guild.iconURL()}).setDescription(`Status Del Servidor \`${message.guild.name}\`\nPrefix: \`${_guild.configuration.prefix}\` | ${p}\n> **Miembros actuales:** ${message.guild.memberCount}\n> **Cantidad de Roles:** ${message.guild.roles.cache.size}\n> **Creado el:** ${message.guild.joinedAt.toDateString()}`)
        .addFields([
            {
                name: "📣 Warn Entry:",
                value: `Estado: \`${_guild.protection.warnEntry ? 'Activado' : 'Desactivado'}\``,
                inline: true 
            },
            {
                name: "💻 Sistema Personalizado:",
                value: `Estado: \`${_guild.protection.ownSystem.enable ? 'Activado' : 'Desactivado'}\``,
                inline: true 
                
            },
            {
                name: "🌊 Antiflood:",
                value: `Estado: \`${_guild.protection.antiflood ? 'Activado' : 'Desactivado'}\``,
                inline: true
                
            },
            {
                name: "🆕 bloqNewCreatedUsers:",
                value: `Tiempo: \`${_guild.protection.bloqNewCreatedUsers.time}\``,
                inline: true
                
            },
            {
                name: "🚨 Antiraid:",
                value: `Estado: \`${_guild.protection.antiraid.enable ? 'Activado' : 'Desactivado'}\`\nContador: \`${_guild.protection.antiraid.amount}\``,
                inline: true
                
            },
            {
                name: "🤖 Antibots:",
                value: `Estado: \`${_guild.protection.antibots.enable ? 'Activado' : 'Desactivado'}\`\nTipo: \`${_guild.protection.antibots._type}\``,
                inline: true
                
            },
            {
                name: "🔍 Antijoins:",
                value: `Estado: \`${_guild.protection.antijoins.enable ? 'Activado' : 'Desactivado'}\`\nRecordando: \`${_guild.protection.antijoins.rememberEntrities.length}\``,
                inline: true
                
            },
            {
                name: "👮‍♂️ Expulsar Maliciosos:",
                value: `Estado: \`${_guild.protection.kickMalicious.enable ? 'Activado' : 'Desactivado'}\`\nRecordando: \`${_guild.protection.kickMalicious.rememberEntrities.length}\``,
                inline: true
                
            },
            {
                name: "📏 Logs:",
                value: `Canal: \`${_guild.configuration.logs[0] ?? 'Logs desactivados.'}\`\nCanal de error: \`${_guild.configuration.logs[1] ?? 'Logs desactivados.'}\``,
                inline: true
                
            },
            {
                name: "🔐 Raidmode:",
                value: `Estado: \`${_guild.protection.raidmode.enable ? 'Activado' : 'Desactivado'}\`\nTtd: \`${_guild.protection.raidmode.timeToDisable}\`\nContraseña: \`${_guild.protection.raidmode.password.length} caracteres\`\nDía activado: \`${_guild.protection.raidmode.activedDate}\``,
                inline: true
                
            },
            {
                name: "🧾 Verificación:",
                value: `Estado: \`${_guild.protection.verification.enable ? 'Activado' : 'Desactivado'}\`\nTipo: \`${_guild.protection.verification._type ?? 'Tipo no establecido.'}\`\nRol: \`${_guild.protection.verification.role ?? 'Rol no establecido.'}\`\nCanal: \`${_guild.protection.verification.channel ?? 'Sin canal establecido.'}\``,
                inline: true
            }
        ])
        message.reply({ embeds: [Embed] })
    }
})