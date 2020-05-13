import { IBrokerListener } from "./";
export class BaseMessageBroker {
    listeners: IBrokerListener[] = [];

    unsubscribe(listener: IBrokerListener) {
        window.removeEventListener(listener.type, listener.listener);
    }

    unsubscribeAll() {
        this.listeners.forEach((item) => {
            this.unsubscribe(item);
        });
    }
}
