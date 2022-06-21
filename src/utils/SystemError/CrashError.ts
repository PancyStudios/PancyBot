import { writeFileSync, existsSync, mkdirSync } from 'fs'

export class AntiCrash {
    constructor() {}

    inint() {
        process.on('unhandledRejection', (reason, p) => {
            console.log(' [antiCrash] :: Unhandled Rejection/Catch');
            console.log(reason, p);
            const data = `${reason} ${p}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
            
            writeFileSync(""+process.cwd()+"/ErrorLogs/unhandledRejection_"+Date.now()+".log", data);
        });
        process.on("uncaughtException", (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch');
            console.log(err, origin);
            const data = `${err + origin}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
            writeFileSync(""+process.cwd()+"/ErrorLogs/uncaughtException_"+Date.now()+".log", data);
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
            console.log(err, origin);
            const data = `${err + origin}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
    
            writeFileSync(""+process.cwd()+"/ErrorLogs/uncaughtExceptionMonitor_"+Date.now()+".log", data);
            
        });
        process.on('multipleResolves', (type, promise, reason, origin) => {
            console.log(' [antiCrash] :: Multiple Resolves');
            console.log(type, reason, promise, origin);
            const data = `${type + reason + promise + origin}`
            if (!existsSync(`${process.cwd()}/ErrorLogs`)) {
                mkdirSync(`${process.cwd()}/ErrorLogs`, { recursive: true});
            }
    
            writeFileSync(""+process.cwd()+"/ErrorLogs/multipleResolves_"+Date.now()+".log", data);
        });
}
}