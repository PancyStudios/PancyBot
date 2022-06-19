import { connect } from "mongoose";
import { ExtendedClient } from './structures/Client'

export const client = new ExtendedClient()
client.start

const database = connect('')