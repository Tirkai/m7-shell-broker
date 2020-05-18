import { BrokerMessageType } from "./";

export class Message<T> {
    type: BrokerMessageType;
    payload: T | null;
    constructor(type: BrokerMessageType, payload?: T) {
        this.type = type;
        this.payload = payload ?? null;
    }
}
