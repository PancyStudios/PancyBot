export interface UserData {
    user: string,
    isBloqued: boolean,
    isToken: boolean,
    achievements: {
        array: string[],
        data: {
            bugs: number,
            serversCreatedTotally: number,
            serversPartner: [],
            reports: number,
            totalVotes: number,
            initialMember: number
        }
    },
    serversCreated: {
        servers: number,
        date: string,
    },
    premium: {
        isActive: boolean,
        endAt: number
    },
    servers: string[],
    content: string,
    amount: number
}