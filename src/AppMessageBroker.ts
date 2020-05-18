import {
    BaseMessageBroker,
    BrokerMessageType,
    IBrokerListener,
    Message,
} from "./";
export class AppMessageBroker extends BaseMessageBroker {
    listeners: IBrokerListener[] = [];

    dispatch<T>(type: BrokerMessageType, message?: T) {
        console.debug(`[App Dispatch]`, type, message);
        window.parent.postMessage(new Message<T>(type, message), "*");
    }
}
