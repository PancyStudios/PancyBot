import { Command } from "../../../structures/CommandMsg";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "modules",
    description: "Estado de los modulos de proteccion",
    category: "security",
    isDev: false,
    userPermissions: ["MANAGE_GUILD"],
    use: "",

    async run ({ message, _guild }){

        let p;
        if(_guild.moderation.automoderator.enable == true) {
            p = 'Automoderador: Activo.';
        }else{
            p = 'Automoderador: Desactivado.'
        }

        const Embed = new MessageEmbed().setColor(0x0056ff).setFooter({ text: `${message.guild.name}, ${message.guild.id}`, iconURL: message.guild.iconURL()}).setDescription(`Status Del Servidor \`${message.guild.name}\`\nPrefix: \`${_guild.configuration.prefix}\` | ${p}\n> **Miembros actuales:** ${message.guild.memberCount}\n> **Cantidad de Roles:** ${message.guild.roles.cache.size}\n> **Creado el:** ${message.guild.joinedAt.toDateString()}`)
        .addField('📣 Warn Entry:', `Estado: \`${_guild.protection.warnEntry ? 'Activado' : 'Desactivado'}\``, true)
        .addField('💻 Sistema Personalizado:', `Estado: \`${_guild.protection.ownSystem.enable ? 'Activado' : 'Desactivado'}\``, true)
        .addField('🌊 Antiflood:', `Estado: \`${_guild.protection.antiflood ? 'Activado' : 'Desactivado'}\``, true)
        .addField('🆕 bloqNewCreatedUsers:', `Tiempo: \`${_guild.protection.bloqNewCreatedUsers.time}\``, true)
        .addField('🚨 Antiraid:', `Estado: \`${_guild.protection.antiraid.enable ? 'Activado' : 'Desactivado'}\`\nContador: \`${_guild.protection.antiraid.amount}\``, true)
        .addField('🤖 Antibots:', `Estado: \`${_guild.protection.antibots.enable ? 'Activado' : 'Desactivado'}\`\nTipo: \`${_guild.protection.antibots._type}\``, true)
        .addField('🔍 Antijoins:', `Estado: \`${_guild.protection.antijoins.enable ? 'Activado' : 'Desactivado'}\`\nRecordando: \`${_guild.protection.antijoins.rememberEntrities.length}\``, true)
        .addField('👮‍♂️ Expulsar Maliciosos:', `Estado: \`${_guild.protection.kickMalicious.enable ? 'Activado' : 'Desactivado'}\`\nRecordando: \`${_guild.protection.kickMalicious.rememberEntrities.length}\``, true)
        .addField('📏 Logs:', `Canal: \`${_guild.configuration.logs[0] ?? 'Logs desactivados.'}\`\nCanal de error: \`${_guild.configuration.logs[1] ?? 'Logs desactivados.'}\``, true)
        .addField('🔐 Raidmode:', `Estado: \`${_guild.protection.raidmode.enable ? 'Activado' : 'Desactivado'}\`\nTtd: \`${_guild.protection.raidmode.timeToDisable}\`\nContraseña: \`${_guild.protection.raidmode.password.length} caracteres\`\nDía activado: \`${_guild.protection.raidmode.activedDate}\``, true)
        .addField('🧾 Verificación:', `Estado: \`${_guild.protection.verification.enable ? 'Activado' : 'Desactivado'}\`\nTipo: \`${_guild.protection.verification._type ?? 'Tipo no establecido.'}\`\nRol: \`${_guild.protection.verification.role ?? 'Rol no establecido.'}\`\nCanal: \`${_guild.protection.verification.channel ?? 'Sin canal establecido.'}\``, true)
    }
})