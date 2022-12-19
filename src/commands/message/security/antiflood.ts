import { Command } from "../../../structures/CommandMsg";
import { updateDataBase } from "../../../utils/CacheSystem/functions";

export default new Command({
    name: "antiflood",
    category: "proteccion",
    description: "Evita el flood en el servidor",
    botPermissions: ["ManageMessages", "BanMembers"],
    userPermissions: ["ManageGuild"],
    use: "flood [maxAmountDetect]",

    run: async ({ client, message, args, _guild}) => { 

        //if(message.author.id != message.guild.ownerId)return message.reply({ content: `No eres dueño de este servidor.` });

        if(args[0]) {
            if(isNaN(parseInt((args as string[])[0])))return message.reply({ content: `El argumento no es un número.` });
            _guild.moderation.automoderator.actions.floodDetect = parseInt((args as string[])[0]);
            updateDataBase(client, message.guild, _guild, true);
            message.reply({ content: `Dato actualizado con éxito, para recordar: recomendamos mantener este valor en __5__.` });
        }else{
            if(_guild.protection.antiflood == false) {
                _guild.protection.antiflood = true;
                updateDataBase(client, message.guild, _guild, true);
                message.reply({ content: `Antiflood activado, vuelve a escribir el comando para desactivarlo.\n\nAl escribir de nuevo el comando, puedes adjuntar el número de mensajes que debo recopilar para considerar un evento de flood.` });
            }else{
                _guild.protection.antiflood = false;
                updateDataBase(client, message.guild, _guild, true);
                message.reply({ content: `Antiflood desactivado.` });
            }
        }
    },
})