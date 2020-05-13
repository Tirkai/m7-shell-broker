import { v4 } from "uuid";
import { BaseMessageBroker } from "./";
import { BrokerMessageType } from "./BrokerMessageType";
import { IBrokerListener } from "./IBrokerListener";
export class AppMessageBroker extends BaseMessageBroker {
    dispatch<T>(type: BrokerMessageType | string, message?: T): CustomEvent<T> {
        console.log(`[AppMessageBroker] Dispatch:${type}`, message);
        const event = new CustomEvent(type, {
            detail: message,
        });
        window.parent.dispatchEvent(event);
        return event;
    }

    subscribe<T>(
        type: BrokerMessageType | string,
        action: (data: T) => void,
    ): IBrokerListener {
        const id = v4();
        const eventListener = (event: Event) => {
            const customEvent = event as CustomEvent;
            const detail: T = customEvent.detail;
            action(detail);
        };

        window.addEventListener(type, eventListener);

        const brokerListener: IBrokerListener = {
            id,
            type,
            listener: eventListener,
        };

        this.listeners.push();
        return brokerListener;
    }
}
