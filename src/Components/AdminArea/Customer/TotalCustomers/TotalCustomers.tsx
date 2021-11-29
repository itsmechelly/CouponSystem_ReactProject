import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../../Redux/Store";

interface TotalCustomersState {
    count: number;
}

class TotalCustomers extends Component<{}, TotalCustomersState> {

    //Function which will unsubscribe from the subscribe operator:
    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    public componentDidMount(): void {
        // On any AppState change - call this function:
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ count: store.getState().CustomersState.customers.length });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="TotalCustomers">
                <span>Total Customers: {this.state.count}</span>
            </div>
        );
    }

    // Unsubscribe from the subscribe operation.
    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default TotalCustomers;