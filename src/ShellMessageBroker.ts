import { BrokerMessageType } from "./BrokerMessageType";

export class ShellMessageBroker {
    context: Window | null = null;
    constructor(context?: Window) {
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
        window.addEventListener(type, (event: Event) => {
            const customEvent = event as CustomEvent;
            const detail: T = customEvent.detail;
            action(detail);
        });
        return this;
    }
}
