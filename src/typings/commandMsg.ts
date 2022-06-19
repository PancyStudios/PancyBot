import {
    ChatInputApplicationCommandData,
    Message,
    PermissionResolvable
} from "discord.js";
import { ExtendedClient } from "../structures/Client";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ message }) => {
 *
 * }
 * }
 */

interface RunOptions {
    client: ExtendedClient;
    message: Message;
    args: String[] | String[0];
}

type RunFunction = (options: RunOptions) => any;

export type CommandTypeMsg = {
    category: string;
    use: string;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;