import { Component } from "react";
import { AppMessageBroker, BrokerMessageType } from "./";

interface IM7ShellAuthProviderProps {
    onRecieveToken: (token: string) => void;
}

export class M7ShellAuthProvider extends Component<IM7ShellAuthProviderProps> {
    constructor(props: IM7ShellAuthProviderProps) {
        super(props);
        const broker = new AppMessageBroker();
        broker
            .subscribe<string>(
                BrokerMessageType.UpdateAuthToken,
                (token: string) => this.props.onRecieveToken(token),
            )
            .dispatch(BrokerMessageType.Connected);
    }
    render() {
        return this.props.children;
    }
}
