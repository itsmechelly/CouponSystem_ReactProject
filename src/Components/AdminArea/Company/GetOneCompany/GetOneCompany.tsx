import { Component } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router";
import "./GetOneCompany.css";
import { NavLink } from "react-router-dom";
import happy from "../../../../Assets/Images/Happy.jpg";
import CompanyModel from "../../../../Models/CompanyModel";
import { ClientType } from "../../../../Models/UserModel";
import store from "../../../../Redux/Store";
import notify from "../../../../Services/Notification";

interface RouteParams {
    id: string;
}

interface GetOneCompanyProps extends RouteComponentProps<RouteParams> {
}

interface GetOneCompanyState {
    company: CompanyModel;
}

class GetOneCompany extends Component<GetOneCompanyProps, GetOneCompanyState> {

    public constructor(props: GetOneCompanyProps) {
        super(props);
        this.state = { company: null };
    }

    public async componentDidMount() {
        try {
            if (
                store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
                notify.error("please log in");
                this.props.history.push("/login");
            }
            const id = +this.props.match.params.id;
            const company = store.getState().CompaniesState.companies.find(c => c.id === id);
            this.setState({ company })
        }
        catch (err) {
            notify.error(err);
            // alert("error: " + err.message);
        }
    }

    public render(): JSX.Element {
        return (
            <div className="GetOneCompany">

                {this.state.company &&
                    <>
                        <div className="MainHeader">
                            <h1>Get One Company</h1>
                            <p>Some text about who we are and what we do.</p>
                            <p>Resize the browser window to see that this page is responsive by the way.</p>
                        </div>
                        <br />

                        <div className="Row">
                            <div className="Column">
                                <div className="Card">

                                    <img className="CompanyImg" src={happy} alt="Company Image" style={{ width: '1000', height: '300' }} />

                                    <div className="Container">

                                        <h2>{this.state.company.name}</h2>
                                        <p className="CompanyId">Company Id Number: {this.state.company.id}</p>
                                        <p>{this.state.company.name}</p>
                                        <p>{this.state.company.email}</p>
                                        <p>{this.state.company.password}</p>

                                        <button><NavLink to="/admin/getAllCompanies">Go Back</NavLink></button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>


        );
    }
}

export default GetOneCompany;
