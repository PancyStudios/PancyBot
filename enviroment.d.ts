declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            mongodbUrl: string;
            topggPassword: string;
            ubfbToken: string;
            errorWebhook: string;
            enviroment: "dev" | "prod" | "debug";
            PORT: number;
            PasswordApi: string;
            OpenAIApi: string;
            username: string;
            password: string;
            imageDbUrl: string;
            lavaserver: string;
            lavapassword: string;
        }
    }
}

export {};
