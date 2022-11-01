import { Command } from "../../../structures/CommandMsg";

export default new Command({
    name: "modules",
    description: "Estado de los modulos de proteccion",
    category: "security",
    isDev: false,
    userPermissions: ["MANAGE_GUILD"],
    use: "",

    async run ({ message }){

    }
})