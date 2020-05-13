import { BrokerMessageType } from "./";

export interface IBrokerListener {
    id: string;
    type: BrokerMessageType | string;
    listener: EventListenerOrEventListenerObject;
}
