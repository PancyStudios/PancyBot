
import { Schema, SchemaTypes, model } from "mongoose";

interface WarnsInterface {
    guildId: string;
    userId: string;
    warns: Array<object>;
    subCount: number;
}

const warnsSchema = new Schema({
    guildId: SchemaTypes.String,
    userId: SchemaTypes.String,
    warns: SchemaTypes.Array,
    subCount: SchemaTypes.Number
});

export const warns = model<WarnsInterface>('Warns', warnsSchema);