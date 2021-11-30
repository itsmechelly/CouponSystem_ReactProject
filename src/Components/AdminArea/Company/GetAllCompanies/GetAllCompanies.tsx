// import "./GetAllCompanies.css";
// import { useEffect, useState } from "react";
// import CompaniesCard from "../CompaniesCard/CompaniesCard";
// import TotalCompanies from "../TotalCompanies/TotalCompanies";
// import { useHistory } from "react-router-dom";
// import CompanyModel from "../../../../Models/CompanyModel";
// import { ClientType } from "../../../../Models/UserModel";
// import { companiesDownloadedAction } from "../../../../Redux/CompaniesState";
// import store from "../../../../Redux/Store";
// import globals from "../../../../Services/Globals";
// import jwtAxios from "../../../../Services/jwtAxios";
// import notify from "../../../../Services/Notification";

// function GetAllCompanies(): JSX.Element {

//     // let history = useHistory();
//     // let [companies, setCompanies] = useState<CompanyModel[]>(store.getState().CompaniesState.companies);

//     // useEffect(() => {
//     //     let unSubscribeMe = store.subscribe(() => {
//     //         setCompanies(store.getState().CompaniesState.companies);
//     //     })
//     //     if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
//     //         notify.error("Please log in");
//     //         history.push("/login");
//     //     }
//     //     else if (store.getState().CompaniesState.companies.length === 0) {
//     //         getCompanies();
//     //     }
//     //     return function cleanup() {
//     //         unSubscribeMe();
//     //     }
//     // }, []);

//     // async function getCompanies() {
//     //     try {
//     //         let response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
//     //         store.dispatch(companiesDownloadedAction(response.data));
//     //     } catch (error) {
//     //         notify.error(error);
//     //     }
//     // }

//     let history = useHistory();
//     let [companies, setCompanies] = useState<CompanyModel[]>(null);

//     useEffect(() => {
//         if (store.getState().AuthState.user?.clientType !== ClientType.ADMIN) {
//             notify.error("Please log in");
//             history.push("/login");
//         }
//         getCompanies();
//     }, []);

//     async function getCompanies() {
//         try {
//             let response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
//             setCompanies(response.data);
//         } catch (error) {
//             notify.error(error);
//         }
//     }

//     return (
//         <div className="GetAllCompanies">

//             <div className="MainHeader">
//                 <h1>Get All Customer Coupons</h1>
//                 <p>Some text about who we are and what we do.</p>
//                 <p>Resize the browser window to see that this page is responsive by the way.</p>
//             </div>

//             <h1 className="BigTitle">ALL COMPANIES!!!</h1>

//             {companies &&
//                 <>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
//                         {companies.map(company => (<CompaniesCard key={company.id} company={company} />))}
//                     </div>
//                     <br />
//                 </>
//             }

//             <TotalCompanies />

//         </div>
//     );
// }

// export default GetAllCompanies;
import { AddBox } from "@material-ui/icons";
import { History } from "history";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import CompanyModel from "../../../../Models/CompanyModel";
import { companiesDownloadedAction } from "../../../../Redux/CompaniesState";
import store from "../../../../Redux/Store";
import globals from "../../../../Services/Globals";
import jwtAxios from "../../../../Services/jwtAxios";
import notify from "../../../../Services/Notification";
import CompaniesCard from "../CompaniesCard/CompaniesCard";
import "./GetAllCompanies.css";

interface GetAllCompaniesState {
    companies: CompanyModel[];
}

interface GetAllCompaniesProps {
    history: History;
}

class GetAllCompanies extends Component<GetAllCompaniesProps, GetAllCompaniesState> {

    // 'isAlive' is to prevent 'setState' if the user is not authorized and is pushed to logout page
    private isAlive = true;
    private unsubscribeCompanyList: Unsubscribe;

    public constructor(props: GetAllCompaniesProps) {
        super(props);
        this.state = { companies: store.getState().CompaniesState.companies };
    }

    public async componentDidMount() {
        this.unsubscribeCompanyList = store.subscribe(() => {
            this.setState({ companies: store.getState().CompaniesState.companies });
        });

        try {
            // Sending JWT Token with interceptor:
            const response = await jwtAxios.get<CompanyModel[]>(globals.urls.getAllCompanies);
            if (!this.isAlive) return;

            store.dispatch(companiesDownloadedAction(response.data));
            this.setState({ companies: response.data });
        } catch (err) {
            notify.error(err);

            // if (err.response?.data?.status === 401) { // UNAUTHORIZED or Token Expired
            //     this.props.history.push("/logout");
            // }
        }
    }

    public render(): JSX.Element {
        const companies = this.state.companies;
        return (
            <div className="GetAllCompanies">
                {/* {companies?.length === 0 && <p>No companies found in the system</p>}
                {companies?.length > 0 && <p>{companies?.length} companies found in the system:</p>} */}

                {/* <NavLink to="/companies/add" >
                    <AddBox />
                </NavLink> */}

                {companies?.length > 0 && <div className="comp-list">{companies?.map(c => <CompaniesCard key={c.id} company={c} />)}</div>}
            </div>
        );
    }

    public componentWillUnmount(): void {
        this.isAlive = false;
        this.unsubscribeCompanyList();
    }
}

export default GetAllCompanies;