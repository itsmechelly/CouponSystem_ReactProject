import { Component } from "react";
import { RouteComponentProps } from "react-router";
import "./GetOneCustomer.css";
import { NavLink } from "react-router-dom";
import happy from "../../../../Assets/Images/Happy.jpg";
import CustomerModel from "../../../../Models/CustomerModel";
import { ClientType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/Notification";

interface RouteParams {
    id: string;
}

interface GetOneCustomerProps extends RouteComponentProps<RouteParams> {
}

interface GetOneCustomerState {
    customer: CustomerModel;
}

class GetOneCustomer extends Component<GetOneCustomerProps, GetOneCustomerState> {

    public constructor(props: GetOneCustomerProps) {
        super(props);
        this.state = { customer: null };
    }

    public async componentDidMount() {
        try {
            if (
                store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
                notify.error("please log in");
                this.props.history.push("/login");
            }
            const id = +this.props.match.params.id;
            const customer = store.getState().CustomersState.customers.find(c => c.id === id);
            this.setState({ customer })
        }
        catch (err) {
            notify.error(err);
            // alert("error: " + err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="GetOneCustomer1">

                {this.state.customer &&
                    <>
                        <div className="MainHeader1">
                            <h1>Get One Company</h1>
                            <p>Some text about who we are and what we do.</p>
                            <p>Resize the browser window to see that this page is responsive by the way.</p>
                        </div>
                        <br />

                        <div className="Row1">
                            <div className="Column1">
                                <div className="Card1">

                                    <img className="CustomerImg1" src={happy} alt="Customer Image" style={{ width: '1000', height: '300' }} />

                                    <div className="Container1">

                                        <h2>{this.state.customer.firstName}</h2>
                                        <p className="CustomerId1">Customer Id Number: {this.state.customer.id}</p>
                                        <p>{this.state.customer.firstName}</p>
                                        <p>{this.state.customer.lastName}</p>
                                        <p>{this.state.customer.email}</p>
                                        <p>{this.state.customer.password}</p>

                                        <button><NavLink to="/admin/getAllCustomers">Go Back</NavLink></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
        );
    }
}

export default GetOneCustomer;
