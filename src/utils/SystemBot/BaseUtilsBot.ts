import { connection } from "mongoose";

export class PancyBotUtils {
    constructor(){}

    getStatusDB () {
        var StringStatus = '| Unknown'
        var isOnline = false
        switch (connection.readyState) {
            case 0:
                StringStatus = '| Desconectado'
            break;
            case 1:
                StringStatus = '| En linea'
                isOnline = true
            break;
            case 2:
                StringStatus = '| Conectando'
                isOnline = true
            break;
            case 3:
                StringStatus = '| Desconectando'
            break;
            case 99:
                StringStatus = '| Error `MONGODB: 99`'
            break;
        }
        return {
            StringStatus,
            isOnline
        }
    }
}