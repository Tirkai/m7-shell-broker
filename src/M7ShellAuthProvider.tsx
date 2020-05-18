import { Component } from "react";
import { AppMessageBroker, BrokerMessageType } from "./";

interface IM7ShellAuthProviderProps {
    onRecieveToken: (token: string) => void;
}

export class M7ShellAuthProvider extends Component<IM7ShellAuthProviderProps> {
    state = {
        isReady: false,
    };

    constructor(props: IM7ShellAuthProviderProps) {
        super(props);
        const broker = new AppMessageBroker();

        broker.subscribe(BrokerMessageType.UpdateAuthToken, (payload) => {
            this.props.onRecieveToken(payload);
            this.setState({
                isReady: true,
            });
        });
        broker.dispatch(BrokerMessageType.Connected);
    }
    render() {
        if (this.state.isReady) {
            return this.props.children;
        } else {
            return "Wait Authorization..." + JSON.stringify(this.state.isReady);
        }
    }
}
