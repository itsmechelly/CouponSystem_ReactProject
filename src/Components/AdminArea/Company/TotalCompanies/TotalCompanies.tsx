import { Component } from "react";
import { Unsubscribe } from "redux";
import store from "../../../../Redux/Store";

interface TotalCompaniesState {
    count: number;
}

class TotalCompanies extends Component<{}, TotalCompaniesState> {

    private unsubscribeMe: Unsubscribe;

    public constructor(props: {}) {
        super(props);
        this.state = { count: 0 };
    }

    public componentDidMount(): void {
        this.unsubscribeMe = store.subscribe(() => {
            this.setState({ count: store.getState().CompaniesState.companies.length });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="TotalCompanies">
                <span>Total Companies: {this.state.count}</span>
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

}

export default TotalCompanies;
