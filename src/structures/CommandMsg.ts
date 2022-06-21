import { CommandTypeMsg } from "../typings/commandMsg";

export class Command {
    constructor(commandOptions: CommandTypeMsg) {
        Object.assign(this, commandOptions);
    }
}
