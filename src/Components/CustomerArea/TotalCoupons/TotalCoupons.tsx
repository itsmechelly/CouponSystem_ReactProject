import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../Redux/Store";

interface TotalCouponsState {
    count: number;
}

class TotalCoupons extends Component<{}, TotalCouponsState> {

    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ count: store.getState().CouponsState.coupons.length });
        });
        if (store.getState().CouponsState.coupons.length === 0) {
            this.setState({ count: store.getState().CouponsState.coupons.length });
        }
    }

    public render(): JSX.Element {
        return (
            <div className="TotalCoupons">
                <span>Total Coupons: {this.state.count}</span>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default TotalCoupons;
