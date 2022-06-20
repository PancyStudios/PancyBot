import { ShardingManager } from "discord.js";

export const shardManager = new ShardingManager('./src/index.ts', { token: process.env.botToken, totalShards: 'auto' })