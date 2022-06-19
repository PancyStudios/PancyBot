declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildId: string;
            mongodnUrl: string;
            enviroment: "dev" | "prod" | "debug";
        }
    }
}

export {};
