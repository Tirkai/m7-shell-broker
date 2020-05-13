import { v4 } from "uuid";
import { BaseMessageBroker, IBrokerListener } from "./";
import { BrokerMessageType } from "./BrokerMessageType";

export class ShellMessageBroker extends BaseMessageBroker {
    context: Window | null = null;
    constructor(context?: Window) {
        super();
        if (context) {
            this.context = context;
        }
    }

    setContext(context: Window) {
        this.context = context;
        return this;
    }

    dispatch<T>(type: BrokerMessageType | string, message?: T) {
        console.log(`[ShellMessageBroker] Dispatch:${type}`, message);

        this.context?.dispatchEvent(
            new CustomEvent(type, {
                detail: message,
            }),
        );
        return this;
    }

    subscribe<T>(type: BrokerMessageType | string, action: (data: T) => void) {
        const id = v4();
        const eventListener = (event: Event) => {
            const customEvent = event as CustomEvent;
            const detail: T = customEvent.detail;
            action(detail);
        };

        const brokerListener: IBrokerListener = {
            id,
            type,
            listener: eventListener,
        };

        window.addEventListener(type, eventListener);
        this.listeners.push(brokerListener);
        return brokerListener;
    }
}
