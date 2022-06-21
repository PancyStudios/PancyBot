declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            mongodbUrl: string;
            topggPassword: string;
            ubfbToken: string;
            enviroment: "dev" | "prod" | "debug";
        }
    }
}

export {};
