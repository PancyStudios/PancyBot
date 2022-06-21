import { writeFileSync, existsSync, mkdirSync } from 'fs'

export class AntiCrash {
    constructor() {}

    inint() {
        process.on('unhandledRejection', (reason, p) => {
            console.log(' [antiCrash] :: Unhandled Rejection/Catch');
            console.log(reason, p);
            const data = `${reason} ${p}`
            if (!existsSync('/home/container/crash_reports')) {
                mkdirSync('/home/container/crash_reports', { recursive: true});
            }
    
            writeFileSync("/home/container/crash_reports/unhandledRejection_"+Date.now()+".log", data);
        });
        process.on("uncaughtException", (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch');
            console.log(err, origin);
            const data = `${err + origin}`
            if (!existsSync('/home/container/crash_reports')) {
                mkdirSync('/home/container/crash_reports', { recursive: true});
            }
    
            writeFileSync("/home/container/crash_reports/uncaughtException_"+Date.now()+".log", data);
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
            console.log(err, origin);
            const data = `${err + origin}`
            if (!existsSync('/home/container/crash_reports')) {
                mkdirSync('/home/container/crash_reports', { recursive: true});
            }
    
            writeFileSync("/home/container/crash_reports/uncaughtExceptionMonitor_"+Date.now()+".log", data);
            
        });
        process.on('multipleResolves', (type, promise, reason, origin) => {
            console.log(' [antiCrash] :: Multiple Resolves');
            console.log(type, reason, promise, origin);
            const data = `${type + reason + promise + origin}`
            if (!existsSync('/home/container/crash_reports')) {
                mkdirSync('/home/container/crash_reports', { recursive: true});
            }
    
            writeFileSync("/home/container/crash_reports/multipleResolves_"+Date.now()+".log", data);
        });
    }
}