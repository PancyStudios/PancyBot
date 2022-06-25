import mongoose, { model } from 'mongoose';

const timersSchema = new mongoose.Schema({
    servers: mongoose.SchemaTypes.Array,
    partners: mongoose.SchemaTypes.Array,
    serversBloqued: mongoose.SchemaTypes.Array,
    maliciousQueue: mongoose.SchemaTypes.Array,
    staff: mongoose.SchemaTypes.Array,
    panels: {
        web: mongoose.SchemaTypes.Array,
        nuclearSafety: mongoose.SchemaTypes.Array,
        PBStudios: mongoose.SchemaTypes.Array,
    }
});

export const Timers = model('Timers', timersSchema);