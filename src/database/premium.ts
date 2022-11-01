import { Premium, PremiumGuild } from "./typings/Premium";
import { Schema, SchemaTypes, model } from "mongoose";


const premiumSchema = new Schema<Premium>({
    User: { type: SchemaTypes.String },
    Permanent: { type: SchemaTypes.Boolean },
    Expira: { type: SchemaTypes.Number },
})

const premiumGuildSchema = new Schema<PremiumGuild>({
    Guild: { type: SchemaTypes.String },
    Permanent: { type: SchemaTypes.Boolean },
    Expira: { type: SchemaTypes.Number },
})

export const premiumModel = model("premium", premiumSchema)
export const premiumGuildModel = model("premium_guilds", premiumGuildSchema)