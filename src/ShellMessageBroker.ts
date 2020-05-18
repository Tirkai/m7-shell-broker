import { BaseMessageBroker, BrokerMessageType, Message } from "./";

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

    dispatch<T>(type: BrokerMessageType, message: T) {
        console.debug(`[Shell Dispatch]`, type, message);
        this.context?.postMessage(new Message<T>(type, message), "*");
    }
}
