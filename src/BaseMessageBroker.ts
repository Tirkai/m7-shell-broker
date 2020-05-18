import { v4 } from "uuid";
import { BrokerMessageType, IBrokerListener, Message } from "./";
export class BaseMessageBroker {
    listeners: IBrokerListener[] = [];

    constructor() {
        console.debug(`[Init broker] on page ${document.title}`);
        window.addEventListener("message", (event: MessageEvent) => {
            const message: Message<unknown> = event.data;
            this.listeners
                .filter((item) => item.type === message.type)
                .forEach((item) => {
                    console.debug(`[Message]`, item.type, message.payload);
                    item.listener(message.payload);
                });
        });
    }

    unsubscribe(listener: IBrokerListener) {
        this.listeners.splice(this.listeners.indexOf(listener));
    }

    unsubscribeAll() {
        this.listeners = [];
    }

    subscribe(
        type: BrokerMessageType | string,
        action: (payload: any) => void,
    ): IBrokerListener {
        console.debug(`[Subscribe]`, type);
        const listener: IBrokerListener = {
            id: v4(),
            type,
            listener: action,
        };

        this.listeners.push(listener);

        return listener;
    }
}
