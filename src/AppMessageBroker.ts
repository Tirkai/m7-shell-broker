import { BrokerMessageType } from "./BrokerMessageType";

export class AppMessageBroker {
    dispatch<T>(type: BrokerMessageType | string, message?: T) {
        console.log(`[AppMessageBroker] Dispatch:${type}`, message);
        window.parent.dispatchEvent(
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
