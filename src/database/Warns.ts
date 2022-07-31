
import { Schema, SchemaTypes, model } from "mongoose";
import { Warns } from "./typings/Warns";

interface WarnsInterface {
    guildId: string;
    userId: string;
    warns: Array<Warns>;
    subCount: number;
}

const warnsSchema = new Schema({
    guildId: SchemaTypes.String,
    userId: SchemaTypes.String,
    warns: SchemaTypes.Array,
    subCount: SchemaTypes.Number
});

export const warns = model<WarnsInterface>('Warns', warnsSchema);