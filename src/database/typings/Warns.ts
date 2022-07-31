
export type Warns = { 
    moderator: String,
    reason: String,
}

export interface WarnsSchema {
    content: Warns[]
    guildid: String;
    user: String
}