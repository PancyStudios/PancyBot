declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildId: string;
            mongodbUrl: string;
            enviroment: "dev" | "prod" | "debug";
        }
    }
}

export {};
